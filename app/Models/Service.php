<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Service extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'price',
        'features_list',
        'image_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'features_list' => 'array',   // Automatically decode/encode the JSON column
        'price'         => 'decimal:2',
    ];

    // ─── Auto-generate slug from title ──────────────────────────────────────

    /**
     * Boot the model and register event listeners.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $service): void {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });
    }

    // ─── Relationships ───────────────────────────────────────────────────────

    /**
     * A Service can appear in many CartItem lines.
     *
     * @return HasMany<CartItem, $this>
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    // ─── Scopes ─────────────────────────────────────────────────────────────

    /**
     * Scope: filter by category.
     *
     * Usage: Service::ofCategory('ERP')->get()
     *
     * @param  \Illuminate\Database\Eloquent\Builder<self>  $query
     */
    public function scopeOfCategory($query, string $category): void
    {
        $query->where('category', $category);
    }
}
