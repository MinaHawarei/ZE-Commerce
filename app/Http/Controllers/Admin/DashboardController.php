<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with aggregated statistics.
     */
    public function index(Request $request): Response
    {
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total_amount');
        
        $pendingOrdersCount = Order::where('payment_status', 'pending')->count();
        $paidOrdersCount = Order::where('payment_status', 'paid')->count();
        $failedOrdersCount = Order::where('payment_status', 'failed')->count();
        
        $usersCount = User::count();
        $newUsersThisMonth = User::where('created_at', '>=', Carbon::now()->startOfMonth())->count();
        $servicesCount = Service::count();

        // Fetch recent orders
        $recentOrders = Order::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Let's create some dummy sales data for the chart representing the last 6 months
        $months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
        $salesData = collect($months)->map(function ($month) {
            return [
                'name' => $month,
                'revenue' => rand(5000, 20000), // In a real scenario, this would group by month
            ];
        });

        // Top services based on items snapshot
        $paidOrders = Order::where('payment_status', 'paid')->get();
        $serviceCounts = [];
        foreach ($paidOrders as $order) {
            foreach ($order->items_snapshot as $item) {
                $title = $item['title'];
                if (!isset($serviceCounts[$title])) {
                    $serviceCounts[$title] = 0;
                }
                $serviceCounts[$title]++;
            }
        }
        
        arsort($serviceCounts);
        $topServices = collect($serviceCounts)->take(4)->map(function ($count, $title) {
            return [
                'title' => $title,
                'count' => $count
            ];
        })->values();

        return Inertia::render('admin/dashboard/index', [
            'stats' => [
                'total_revenue' => $totalRevenue,
                'pending_orders' => $pendingOrdersCount,
                'paid_orders' => $paidOrdersCount,
                'failed_orders' => $failedOrdersCount,
                'total_users' => $usersCount,
                'new_users_month' => $newUsersThisMonth,
                'total_services' => $servicesCount,
            ],
            'recent_orders' => $recentOrders,
            'sales_data' => $salesData,
            'top_services' => $topServices
        ]);
    }
}
