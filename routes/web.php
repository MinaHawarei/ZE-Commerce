<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// ─── Services (public) ──────────────────────────────────────────────────────
Route::get('services',        [ServiceController::class, 'index'])->name('services.index');
Route::get('services/{slug}', [ServiceController::class, 'show'])->name('services.show');

// ─── Cart (supports both guests and authenticated users) ─────────────────────
Route::get('cart',             [CartController::class, 'index'])->name('cart.index');
Route::post('cart',            [CartController::class, 'store'])->name('cart.store');
Route::delete('cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

// ─── Authenticated ───────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// ─── Admin Routes ────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
