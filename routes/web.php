<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// ─── Services (public) ──────────────────────────────────────────────────────
Route::get('services', [ServiceController::class, 'index'])->name('services.index');
Route::get('services/{slug}', [ServiceController::class, 'show'])->name('services.show');

// ─── Cart (supports both guests and authenticated users) ─────────────────────
Route::get('cart', [CartController::class, 'index'])->name('cart.index');
Route::post('cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

// ─── Authenticated ───────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// ─── Admin Routes ────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Order Management
    Route::get('/orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{order}/status', [\App\Http\Controllers\Admin\OrderController::class, 'updateStatus'])->name('orders.update_status');
    
    // Service Catalog Management
    Route::get('/services', [\App\Http\Controllers\Admin\ServiceCatalogController::class, 'index'])->name('services.index');
    Route::post('/services', [\App\Http\Controllers\Admin\ServiceCatalogController::class, 'store'])->name('services.store');
    Route::patch('/services/{service}', [\App\Http\Controllers\Admin\ServiceCatalogController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [\App\Http\Controllers\Admin\ServiceCatalogController::class, 'destroy'])->name('services.destroy');
});

require __DIR__.'/settings.php';
