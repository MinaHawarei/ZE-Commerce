<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToCartRequest;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CartController extends Controller
{
    public function __construct(
        private readonly CartService $cartService,
    ) {}

    /**
     * Display the current cart with all items and totals.
     *
     * GET /cart
     *
     * Returns an Inertia page for normal requests or JSON for XHR/API calls.
     */
    public function index(Request $request): InertiaResponse|JsonResponse
    {
        $details = $this->cartService->getCartDetails($request);

        // If the request expects JSON (e.g. AJAX fetch from React), return raw data
        if ($request->wantsJson()) {
            return response()->json($details);
        }

        return Inertia::render('cart/index', $details);
    }

    /**
     * Add a service to the cart.
     *
     * POST /cart
     *
     * Payload: { service_id: int, addons?: [{label: string, price: number}] }
     */
    public function store(AddToCartRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = $this->cartService->addItem(
            request:   $request,
            serviceId: $validated['service_id'],
            addons:    $validated['addons'] ?? null,
        );

        // Load relationships for the response
        $item->load('service');

        // Recalculate totals
        $totals = $this->cartService->calculateTotals($item->cart);

        return response()->json([
            'message' => "'{$item->service->title}' added to cart.",
            'item'    => $item,
            'totals'  => $totals,
        ], 201);
    }

    /**
     * Remove an item from the cart.
     *
     * DELETE /cart/{cartItem}
     */
    public function destroy(Request $request, int $cartItemId): JsonResponse
    {
        $removed = $this->cartService->removeItem($request, $cartItemId);

        if (! $removed) {
            return response()->json([
                'message' => 'Item not found in your cart.',
            ], 404);
        }

        // Return updated totals
        $details = $this->cartService->getCartDetails($request);

        return response()->json([
            'message' => 'Item removed from cart.',
            'totals'  => $details['totals'],
        ]);
    }
}
