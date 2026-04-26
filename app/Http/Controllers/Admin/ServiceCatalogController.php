<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCatalogController extends Controller
{
    /**
     * Display a listing of the services.
     */
    public function index(): Response
    {
        $services = Service::orderBy('category')->orderBy('title')->get();

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'required|string',
            'category' => 'required|in:ERP,Web,Apps',
            'price' => 'required|numeric|min:0',
            'features_list' => 'nullable|array',
            'features_list.*' => 'string',
        ]);

        Service::create($validated);

        return back()->with('success', 'Service created successfully.');
    }

    /**
     * Update the specified service in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'required|string',
            'category' => 'required|in:ERP,Web,Apps',
            'price' => 'required|numeric|min:0',
            'features_list' => 'nullable|array',
            'features_list.*' => 'string',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return back()->with('success', 'Service deleted successfully.');
    }
}
