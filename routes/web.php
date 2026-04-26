<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SupportTicketController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ServiceCatalogController;
use App\Http\Controllers\Admin\SupportTicketController as AdminSupportTicketController;
use App\Models\Order;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// ─── Services & Static (public) ──────────────────────────────────────────────────────
Route::get('services', [ServiceController::class, 'index'])->name('services.index');
Route::get('services/{slug}', [ServiceController::class, 'show'])->name('services.show');
Route::inertia('about', 'about')->name('about');
Route::inertia('contact', 'contact')->name('contact');

// ─── Cart (supports both guests and authenticated users) ─────────────────────
Route::get('cart', [CartController::class, 'index'])->name('cart.index');
Route::post('cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

// ─── Checkout ────────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('checkout', [PaymentController::class, 'show'])->name('checkout.index');
    Route::post('checkout/pay', [PaymentController::class, 'process'])->name('checkout.process');
    Route::get('checkout/success', [PaymentController::class, 'success'])->name('checkout.success');
    Route::get('checkout/failure', [PaymentController::class, 'failure'])->name('checkout.failure');
});

// ─── Authenticated Dashboard ─────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function() {
        // Fetch user's paid orders as "My Services"
        $orders = Order::where('user_id', auth()->id())
            ->where('payment_status', 'paid')
            ->orderBy('created_at', 'desc')
            ->get();

        $services = [];
        foreach ($orders as $order) {
            foreach ($order->items_snapshot as $item) {
                $services[] = [
                    'order_id' => $order->id,
                    'reference_number' => $order->reference_number,
                    'service_id' => $item['service_id'] ?? null,
                    'title' => $item['title'] ?? 'Unknown Service',
                    'category' => $item['category'] ?? 'N/A',
                    'purchased_at' => $order->paid_at ?? $order->created_at,
                ];
            }
        }

        return inertia('dashboard', ['my_services' => $services]);
    })->name('dashboard');

    // User Support Tickets
    Route::get('support', [SupportTicketController::class, 'index'])->name('support.index');
    Route::get('support/create', [SupportTicketController::class, 'create'])->name('support.create');
    Route::post('support', [SupportTicketController::class, 'store'])->name('support.store');
});

// ─── Admin Routes ────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Order Management
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update_status');

    // Service Catalog Management
    Route::get('/services', [ServiceCatalogController::class, 'index'])->name('services.index');
    Route::post('/services', [ServiceCatalogController::class, 'store'])->name('services.store');
    Route::patch('/services/{service}', [ServiceCatalogController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [ServiceCatalogController::class, 'destroy'])->name('services.destroy');

    // Admin Support Management
    Route::get('/support', [AdminSupportTicketController::class, 'index'])->name('support.index');
    Route::patch('/support/{ticket}', [AdminSupportTicketController::class, 'update'])->name('support.update');
});

require __DIR__.'/settings.php';
