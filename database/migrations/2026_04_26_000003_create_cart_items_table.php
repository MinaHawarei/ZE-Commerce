<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Creates the `cart_items` table. Each row represents one service line
     * inside a cart. `price_at_purchase` captures the price at the time the
     * item was added — critical for correctness if service prices change later.
     *
     * `addons` is a JSON field to store optional add-ons selected by the user,
     * e.g. [{"label": "Priority Support", "price": 50}, {"label": "SLA Guarantee", "price": 30}]
     */
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cart_id')
                ->constrained()
                ->cascadeOnDelete(); // When a cart is deleted, its items go with it

            $table->foreignId('service_id')
                ->constrained()
                ->restrictOnDelete(); // Prevent accidental service deletion if it's in a cart

            // Explicit composite indexes for query performance
            $table->index('cart_id', 'cart_items_cart_id_index');
            $table->index('service_id', 'cart_items_service_id_index');

            // JSON array of add-on objects selected for this line item
            $table->json('addons')->nullable();

            // Snapshot of the total line price at the time of adding to cart
            $table->decimal('price_at_purchase', 10, 2)->unsigned();

            $table->timestamps();

            // Prevent duplicate service entries within the same cart
            $table->unique(['cart_id', 'service_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
