<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'session_id',
        'reference_number',
        'transaction_id',
        'payment_status',
        'total_amount',
        'items_snapshot',
        'cardholder_name',
        'card_last_four',
        'paid_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'items_snapshot' => 'array',
        'total_amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    // ─── Relationships ───────────────────────────────────────────────────────

    /**
     * An Order belongs to a registered User (nullable for guest orders).
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // ─── Scopes ──────────────────────────────────────────────────────────────

    /**
     * Scope: only paid orders.
     *
     * @param  Builder<self>  $query
     */
    public function scopePaid($query): void
    {
        $query->where('payment_status', 'paid');
    }

    /**
     * Scope: only failed orders.
     *
     * @param  Builder<self>  $query
     */
    public function scopeFailed($query): void
    {
        $query->where('payment_status', 'failed');
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    /**
     * Generate a unique reference number for a tech service purchase.
     *
     * Format: ZE-YYYYMMDD-XXXXXX (e.g. ZE-20260426-A3F7K2)
     */
    public static function generateReferenceNumber(): string
    {
        $date = now()->format('Ymd');
        $random = strtoupper(Str::random(6));

        $reference = "ZE-{$date}-{$random}";

        // Ensure uniqueness (extremely unlikely collision, but safety first)
        while (self::where('reference_number', $reference)->exists()) {
            $random = strtoupper(Str::random(6));
            $reference = "ZE-{$date}-{$random}";
        }

        return $reference;
    }
}
