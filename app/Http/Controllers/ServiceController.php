<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ServiceController extends Controller
{
    /**
     * Display all available services, optionally filtered by category.
     *
     * GET /services
     * GET /services?category=ERP
     */
    public function index(Request $request): InertiaResponse|JsonResponse
    {
        $query = Service::query()->latest();

        // Optional category filter
        if ($category = $request->query('category')) {
            $query->ofCategory($category);
        }

        $services = $query->get();
        $categories = ['ERP', 'Web', 'Apps'];

        if ($request->wantsJson()) {
            return response()->json([
                'services' => $services,
                'categories' => $categories,
                'activeCategory' => $category,
            ]);
        }

        return Inertia::render('services/index', [
            'services' => $services,
            'categories' => $categories,
            'activeCategory' => $category,
        ]);
    }

    /**
     * Display a single service by its slug.
     *
     * GET /services/{slug}
     */
    public function show(string $slug): InertiaResponse
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return Inertia::render('services/show', [
            'service' => $service,
        ]);
    }
}
