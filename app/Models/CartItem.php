<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'cart_id',
        'service_id',
        'addons',
        'price_at_purchase',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'addons' => 'array',    // JSON → PHP array automatically
        'price_at_purchase' => 'decimal:2',
    ];

    // ─── Relationships ───────────────────────────────────────────────────────

    /**
     * A CartItem belongs to a Cart.
     *
     * @return BelongsTo<Cart, $this>
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * A CartItem references a specific Service.
     *
     * @return BelongsTo<Service, $this>
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    /**
     * Return total add-on price for this line item.
     */
    public function addonsTotal(): float
    {
        if (empty($this->addons)) {
            return 0.0;
        }

        return (float) collect($this->addons)->sum('price');
    }
}
