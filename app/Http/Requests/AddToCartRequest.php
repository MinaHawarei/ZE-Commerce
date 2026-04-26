<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates the payload for adding an item to the cart.
 *
 * Expected JSON:
 * {
 *   "service_id": 3,
 *   "addons": [
 *      { "label": "Priority Support", "price": 50.00 },
 *      { "label": "Extended SLA",     "price": 30.00 }
 *   ]
 * }
 */
class AddToCartRequest extends FormRequest
{
    /**
     * All users (including guests) are authorised to add items.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'service_id'     => ['required', 'integer', 'exists:services,id'],
            'addons'         => ['nullable', 'array'],
            'addons.*.label' => ['required_with:addons', 'string', 'max:200'],
            'addons.*.price' => ['required_with:addons', 'numeric', 'min:0'],
        ];
    }

    /**
     * Friendly attribute names for error messages.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'service_id'     => 'service',
            'addons.*.label' => 'add-on name',
            'addons.*.price' => 'add-on price',
        ];
    }
}
