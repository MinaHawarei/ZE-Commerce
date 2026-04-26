<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an Admin user
        $admin = User::factory()->create([
            'name'  => 'Admin User',
            'email' => 'admin@ze-commerce.com',
            'password' => bcrypt('password'),
            'role'  => UserRole::ADMIN,
        ]);

        // Create a regular Test User
        $user = User::factory()->create([
            'name'  => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role'  => UserRole::USER,
        ]);

        // Seed the services catalogue
        $this->call(ServiceSeeder::class);

        // Pre-fill some orders for the test user to populate the dashboard
        $services = \App\Models\Service::take(3)->get();
        if ($services->count() > 0) {
            Order::create([
                'user_id' => $user->id,
                'session_id' => null,
                'reference_number' => Order::generateReferenceNumber(),
                'transaction_id' => 'TXN-ABC-123',
                'payment_status' => 'paid',
                'total_amount' => $services[0]->price * 2,
                'items_snapshot' => [
                    [
                        'service_id' => $services[0]->id,
                        'title' => $services[0]->title,
                        'category' => $services[0]->category,
                        'price' => $services[0]->price,
                        'addons' => []
                    ]
                ],
                'cardholder_name' => 'Test User',
                'card_last_four' => '4242',
                'paid_at' => now()->subDays(2),
            ]);
            
            Order::create([
                'user_id' => $user->id,
                'session_id' => null,
                'reference_number' => Order::generateReferenceNumber(),
                'transaction_id' => 'TXN-XYZ-987',
                'payment_status' => 'pending',
                'total_amount' => $services[1]->price,
                'items_snapshot' => [
                    [
                        'service_id' => $services[1]->id,
                        'title' => $services[1]->title,
                        'category' => $services[1]->category,
                        'price' => $services[1]->price,
                        'addons' => []
                    ]
                ],
                'cardholder_name' => 'Test User',
                'card_last_four' => '1234',
                'paid_at' => null,
            ]);
        }
    }
}
