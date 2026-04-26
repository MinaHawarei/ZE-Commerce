<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status');

        $query = Order::with('user:id,name,email')->orderBy('created_at', 'desc');

        if ($status && in_array($status, ['pending', 'paid', 'failed'])) {
            $query->where('payment_status', $status);
        }

        $orders = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => [
                'status' => $status,
            ],
        ]);
    }

    /**
     * Update the payment status of an order.
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,paid,failed'],
        ]);

        $order->update([
            'payment_status' => $validated['status'],
        ]);

        return back()->with('success', 'Order status updated successfully.');
    }
}
