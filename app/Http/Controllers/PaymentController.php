<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcessPaymentRequest;
use App\Services\CartService;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PaymentController extends Controller
{
    public function __construct(
        private readonly PaymentService $paymentService,
        private readonly CartService    $cartService,
    ) {}

    /**
     * Display the checkout page with cart summary.
     *
     * GET /checkout
     */
    public function show(Request $request): InertiaResponse
    {
        $details = $this->cartService->getCartDetails($request);

        return Inertia::render('checkout/index', [
            'cart'   => $details['cart'],
            'items'  => $details['items'],
            'totals' => $details['totals'],
        ]);
    }

    /**
     * Process the mock payment transaction.
     *
     * POST /checkout/pay
     */
    public function process(ProcessPaymentRequest $request)
    {
        $validated = $request->validated();

        $result = $this->paymentService->processPayment(
            request:        $request,
            cardNumber:     $validated['card_number'],
            cardholderName: $validated['cardholder_name'],
            expiryDate:     $validated['expiry_date'],
            cvv:            $validated['cvv'],
        );

        if ($result['success']) {
            return redirect()->route('checkout.success', [
                'reference' => $result['order']->reference_number,
            ]);
        }

        return redirect()->route('checkout.failure', [
            'reference' => $result['order']->reference_number,
        ]);
    }

    /**
     * Display the payment success page.
     *
     * GET /checkout/success
     */
    public function success(Request $request): InertiaResponse
    {
        $reference = $request->query('reference');
        $order     = \App\Models\Order::where('reference_number', $reference)->firstOrFail();

        return Inertia::render('checkout/success', [
            'order' => [
                'reference_number' => $order->reference_number,
                'transaction_id'   => $order->transaction_id,
                'payment_status'   => $order->payment_status,
                'total_amount'     => $order->total_amount,
                'items_snapshot'   => $order->items_snapshot,
                'cardholder_name'  => $order->cardholder_name,
                'card_last_four'   => $order->card_last_four,
                'paid_at'          => $order->paid_at?->toISOString(),
            ],
        ]);
    }

    /**
     * Display the payment failure page.
     *
     * GET /checkout/failure
     */
    public function failure(Request $request): InertiaResponse
    {
        $reference = $request->query('reference');
        $order     = \App\Models\Order::where('reference_number', $reference)->firstOrFail();

        return Inertia::render('checkout/failure', [
            'order' => [
                'reference_number' => $order->reference_number,
                'transaction_id'   => $order->transaction_id,
                'payment_status'   => $order->payment_status,
                'total_amount'     => $order->total_amount,
                'items_snapshot'   => $order->items_snapshot,
            ],
        ]);
    }
}
