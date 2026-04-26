<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportTicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = SupportTicket::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('support/index', [
            'tickets' => $tickets
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('support/create', [
            'reference' => $request->query('reference', ''),
            'service' => $request->query('service', '')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_number' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $request->user()->supportTickets()->create($validated);

        return redirect()->route('support.index')->with('success', 'Support ticket submitted successfully.');
    }
}
