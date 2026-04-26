<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Creates the `carts` table. Supports both authenticated users (user_id)
     * and guest sessions (session_id). Only one of the two will be set at a time.
     *
     * Status values:
     *   - active    : cart is in progress
     *   - abandoned : cart was left idle
     *   - converted : cart was checked out / order placed
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();

            // Nullable: populated when the user is authenticated
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete()  // If user is deleted, keep the cart record (for analytics)
                ->index();

            // Nullable: populated for guest/anonymous users
            $table->string('session_id', 100)->nullable()->index();

            $table->enum('status', ['active', 'abandoned', 'converted'])->default('active')->index();

            $table->timestamps();

            // Ensure a user cannot have multiple active carts simultaneously
            $table->unique(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
