<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * PaymentService — mock payment gateway and order processing logic.
 *
 * Simulates a payment transaction with dummy success/fail logic.
 * Card numbers containing '4242' are treated as successful payments.
 * All other card numbers result in a declined transaction.
 */
class PaymentService
{
    public function __construct(
        private readonly CartService $cartService,
    ) {}

    // ─── Create Order from Cart ──────────────────────────────────────────────

    /**
     * Convert all items in the active cart into a single order.
     *
     * @return array{order: Order, success: bool, message: string}
     */
    public function processPayment(
        Request $request,
        string  $cardNumber,
        string  $cardholderName,
        string  $expiryDate,
        string  $cvv,
    ): array {
        $cart = $this->cartService->resolveCart($request);
        $cart->load('items.service');

        // Guard: empty cart
        if ($cart->items->isEmpty()) {
            return [
                'order'   => null,
                'success' => false,
                'message' => 'Your cart is empty. Please add services before checking out.',
            ];
        }

        return DB::transaction(function () use ($request, $cart, $cardNumber, $cardholderName) {
            // Build the items snapshot (preserves purchase state)
            $itemsSnapshot = $cart->items->map(fn ($item) => [
                'service_id' => $item->service_id,
                'title'      => $item->service->title,
                'category'   => $item->service->category,
                'price'      => $item->price_at_purchase,
                'addons'     => $item->addons,
            ])->toArray();

            // Calculate total
            $totals = $this->cartService->calculateTotals($cart);

            // Extract last 4 digits of card
            $cleanCard  = preg_replace('/\D/', '', $cardNumber);
            $lastFour   = substr($cleanCard, -4);

            // Create the order in 'pending' state
            $order = Order::create([
                'user_id'          => Auth::id(),
                'session_id'       => $request->session()->getId(),
                'reference_number' => Order::generateReferenceNumber(),
                'total_amount'     => $totals['grand_total'],
                'items_snapshot'   => $itemsSnapshot,
                'cardholder_name'  => $cardholderName,
                'card_last_four'   => $lastFour,
                'payment_status'   => 'pending',
            ]);

            // ── Mock Payment Gateway Logic ───────────────────────────────
            $transactionResult = $this->simulateTransaction($cleanCard);

            if ($transactionResult['success']) {
                // Payment succeeded → mark order as paid
                $order->update([
                    'payment_status' => 'paid',
                    'transaction_id' => $transactionResult['transaction_id'],
                    'paid_at'        => now(),
                ]);

                // Clear the user's cart
                $this->clearCart($cart);

                return [
                    'order'   => $order->fresh(),
                    'success' => true,
                    'message' => 'Payment successful! Your services have been deployed.',
                ];
            }

            // Payment failed → mark order as failed
            $order->update([
                'payment_status' => 'failed',
                'transaction_id' => $transactionResult['transaction_id'],
            ]);

            return [
                'order'   => $order->fresh(),
                'success' => false,
                'message' => $transactionResult['decline_reason'],
            ];
        });
    }

    // ─── Mock Transaction Simulator ──────────────────────────────────────────

    /**
     * Simulate a payment gateway transaction.
     *
     * Rules:
     *   - Card number containing '4242' → SUCCESS
     *   - All other card numbers        → DECLINED
     *
     * @return array{success: bool, transaction_id: string, decline_reason: string|null}
     */
    private function simulateTransaction(string $cleanCardNumber): array
    {
        // Generate a realistic-looking transaction ID
        $transactionId = 'TXN-' . strtoupper(Str::random(8)) . '-' . time();

        // ── The Magic Number: 4242 ──
        if (str_contains($cleanCardNumber, '4242')) {
            return [
                'success'        => true,
                'transaction_id' => $transactionId,
                'decline_reason' => null,
            ];
        }

        return [
            'success'        => false,
            'transaction_id' => $transactionId,
            'decline_reason' => 'Transaction declined. Card number not authorized by the payment processor.',
        ];
    }

    // ─── Cart Cleanup ────────────────────────────────────────────────────────

    /**
     * Clear all items from the cart and mark it as converted.
     */
    private function clearCart(Cart $cart): void
    {
        $cart->items()->delete();
        $cart->update(['status' => 'converted']);
    }
}
