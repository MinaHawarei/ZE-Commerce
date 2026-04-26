<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportTicketController extends Controller
{
    public function index()
    {
        $tickets = SupportTicket::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->paginate(15);
            
        return Inertia::render('admin/support/index', [
            'tickets' => $tickets
        ]);
    }

    public function update(Request $request, SupportTicket $ticket)
    {
        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,resolved,closed',
            'admin_reply' => 'nullable|string',
        ]);

        $ticket->update($validated);

        return back()->with('success', 'Ticket updated successfully.');
    }
}
