<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Service;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * CartService — single source of truth for all cart business logic.
 *
 * Controllers delegate to this class so they stay thin and testable.
 * All write operations use DB transactions for data integrity.
 */
class CartService
{
    // ─── Resolve / Create Active Cart ────────────────────────────────────────

    /**
     * Return the current active cart for the authenticated user or guest session.
     * Creates one on the fly if none exists.
     */
    public function resolveCart(Request $request): Cart
    {
        $userId = Auth::id();
        $sessionId = $request->session()->getId();

        // Authenticated user — match by user_id
        if ($userId) {
            return Cart::firstOrCreate(
                ['user_id' => $userId, 'status' => 'active'],
                ['session_id' => null],
            );
        }

        // Guest — match by session_id
        return Cart::firstOrCreate(
            ['session_id' => $sessionId, 'status' => 'active'],
            ['user_id' => null],
        );
    }

    // ─── Cart Contents ───────────────────────────────────────────────────────

    /**
     * Return the active cart with items eager-loaded, plus computed totals.
     *
     * @return array{cart: Cart, items: Collection, totals: array}
     */
    public function getCartDetails(Request $request): array
    {
        $cart = $this->resolveCart($request);
        $cart->load('items.service');

        return [
            'cart' => $cart,
            'items' => $cart->items,
            'totals' => $this->calculateTotals($cart),
        ];
    }

    // ─── Add Item ────────────────────────────────────────────────────────────

    /**
     * Add a service to the current active cart.
     *
     * Rules:
     *  - The service must exist and not be soft-deleted.
     *  - Duplicate services within the same cart are rejected gracefully.
     *  - `price_at_purchase` is snapshotted from the service + selected add-ons.
     *
     * @param  array<int, array{label: string, price: float}>|null  $addons
     *
     * @throws ModelNotFoundException
     */
    public function addItem(Request $request, int $serviceId, ?array $addons = null): CartItem
    {
        $service = Service::findOrFail($serviceId);
        $cart = $this->resolveCart($request);

        return DB::transaction(function () use ($cart, $service, $addons): CartItem {
            // Calculate the snapshot price (service base + add-on prices)
            $addonsTotal = $this->sumAddons($addons);
            $priceAtPurchase = (float) $service->price + $addonsTotal;

            return CartItem::firstOrCreate(
                [
                    'cart_id' => $cart->id,
                    'service_id' => $service->id,
                ],
                [
                    'addons' => $addons,
                    'price_at_purchase' => $priceAtPurchase,
                ],
            );
        });
    }

    // ─── Remove Item ─────────────────────────────────────────────────────────

    /**
     * Remove a specific cart item, ensuring it belongs to the caller's active cart.
     *
     * Returns `true` if deleted, `false` if the item was not found in the cart.
     */
    public function removeItem(Request $request, int $cartItemId): bool
    {
        $cart = $this->resolveCart($request);

        $deleted = CartItem::where('id', $cartItemId)
            ->where('cart_id', $cart->id)
            ->delete();

        return $deleted > 0;
    }

    // ─── Price Calculations ──────────────────────────────────────────────────

    /**
     * Return subtotal, add-ons total, and grand total for every item in the cart.
     *
     * @return array{items_count: int, subtotal: float, addons_total: float, grand_total: float}
     */
    public function calculateTotals(Cart $cart): array
    {
        $items = $cart->relationLoaded('items')
            ? $cart->items
            : $cart->items()->with('service')->get();

        $subtotal = 0.0;
        $addonsTotal = 0.0;

        foreach ($items as $item) {
            $servicePrice = (float) $item->service->price;
            $itemAddons = $this->sumAddons($item->addons);

            $subtotal += $servicePrice;
            $addonsTotal += $itemAddons;
        }

        return [
            'items_count' => $items->count(),
            'subtotal' => round($subtotal, 2),
            'addons_total' => round($addonsTotal, 2),
            'grand_total' => round($subtotal + $addonsTotal, 2),
        ];
    }

    // ─── Merge Guest Cart into User ──────────────────────────────────────────

    /**
     * After login, merge items from the guest session cart (if any)
     * into the authenticated user's cart. Avoids duplicates.
     */
    public function mergeGuestCart(Request $request): void
    {
        $userId = Auth::id();
        $sessionId = $request->session()->getId();

        if (! $userId) {
            return;
        }

        $guestCart = Cart::where('session_id', $sessionId)
            ->where('status', 'active')
            ->first();

        if (! $guestCart) {
            return;
        }

        DB::transaction(function () use ($userId, $guestCart): void {
            $userCart = Cart::firstOrCreate(
                ['user_id' => $userId, 'status' => 'active'],
                ['session_id' => null],
            );

            foreach ($guestCart->items as $guestItem) {
                CartItem::firstOrCreate(
                    [
                        'cart_id' => $userCart->id,
                        'service_id' => $guestItem->service_id,
                    ],
                    [
                        'addons' => $guestItem->addons,
                        'price_at_purchase' => $guestItem->price_at_purchase,
                    ],
                );
            }

            // Clean up the guest cart
            $guestCart->items()->delete();
            $guestCart->update(['status' => 'abandoned']);
        });
    }

    // ─── Internal Helpers ────────────────────────────────────────────────────

    /**
     * Sum the `price` field from an add-ons array.
     *
     * @param  array<int, array{label: string, price: float}>|null  $addons
     */
    private function sumAddons(?array $addons): float
    {
        if (empty($addons)) {
            return 0.0;
        }

        return (float) collect($addons)->sum('price');
    }
}
