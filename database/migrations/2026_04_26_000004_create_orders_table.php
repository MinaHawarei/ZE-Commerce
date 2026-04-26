<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('session_id', 100)->nullable()->index();

            $table->string('reference_number', 50)->unique();

            $table->string('transaction_id', 100)->nullable()->index();

            $table->enum('payment_status', ['pending', 'paid', 'failed'])
                ->default('pending')
                ->index();

            $table->decimal('total_amount', 12, 2)->unsigned();

            // سجل بالخدمات التي تم شراؤها لضمان ثبات البيانات حتى لو تغير سعر الخدمة لاحقاً
            $table->json('items_snapshot');

            $table->string('cardholder_name', 200)->nullable();
            $table->string('card_last_four', 4)->nullable();

            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
