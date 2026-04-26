<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Creates the `services` table which holds all tech service listings
     * offered on ZE-Commerce (ERP, Web, Apps). The `features_list` column
     * stores a JSON array of bullet-point features, and `slug` is indexed
     * for fast SEO-friendly lookups.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            $table->string('title', 200);

            // Unique slug for SEO-friendly URLs (e.g. /services/custom-erp)
            $table->string('slug', 220)->unique();

            $table->text('description');

            // Allowed: ERP | Web | Apps
            $table->enum('category', ['ERP', 'Web', 'Apps'])->index();

            // Price stored as DECIMAL for monetary accuracy (no floating-point drift)
            $table->decimal('price', 10, 2)->unsigned();

            // JSON array of feature strings, e.g. ["Multi-currency", "Role management"]
            $table->json('features_list')->nullable();

            $table->string('image_path', 500)->nullable();

            $table->timestamps();
            $table->softDeletes(); // Logical delete — preserves data integrity with cart history
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
