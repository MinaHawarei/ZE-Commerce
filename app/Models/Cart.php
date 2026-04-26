<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'session_id',
        'status',
    ];

    // ─── Relationships ───────────────────────────────────────────────────────

    /**
     * A Cart belongs to a registered User (nullable for guest carts).
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * A Cart has many CartItems.
     *
     * @return HasMany<CartItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    /**
     * Calculate the total price of all items currently in this cart.
     */
    public function total(): float
    {
        return (float) $this->items()->sum('price_at_purchase');
    }

    // ─── Scopes ──────────────────────────────────────────────────────────────

    /**
     * Scope: only active carts.
     *
     * @param  Builder<self>  $query
     */
    public function scopeActive($query): void
    {
        $query->where('status', 'active');
    }
}
