<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates the mock payment form submission.
 *
 * This is intentionally lightweight since we're simulating a gateway.
 * In production, card details would never touch your server (use Stripe Elements, etc.).
 */
class ProcessPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cart supports both guests and authenticated users
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'cardholder_name' => ['required', 'string', 'min:2', 'max:200'],
            'card_number' => ['required', 'string', 'min:13', 'max:25'],
            'expiry_date' => ['required', 'string', 'regex:/^\d{2}\s*\/\s*\d{2}$/'],
            'cvv' => ['required', 'string', 'min:3', 'max:4'],
        ];
    }

    /**
     * Custom error messages for a better UX.
     */
    public function messages(): array
    {
        return [
            'cardholder_name.required' => 'Please enter the cardholder name.',
            'card_number.required' => 'Please enter your card number.',
            'card_number.min' => 'Card number must be at least 13 digits.',
            'expiry_date.required' => 'Please enter the expiration date.',
            'expiry_date.regex' => 'Expiration date must be in MM/YY format.',
            'cvv.required' => 'Please enter the security code.',
            'cvv.min' => 'Security code must be at least 3 digits.',
        ];
    }
}
