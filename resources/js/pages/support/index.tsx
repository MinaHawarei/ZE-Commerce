import React from 'react';
import { Head, Link } from '@inertiajs/react';


export default function SupportIndex({ tickets }: any) {
    return (
        <>
            <Head title="Technical Support" />
            <div className="p-3">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white font-inter mb-2">View and manage your active support tickets.</h3>
                    </div>
                    <Link href="/support/create" className="bg-[#0066ff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        New Ticket
                    </Link>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden">
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-white/5 text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/10">
                                    <th className="p-4 pl-6">Reference ID</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Date Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.length > 0 ? tickets.map((ticket: any) => (
                                    <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4 pl-6">
                                            <span className="font-space text-[#0066ff] font-medium">{ticket.reference_number}</span>
                                        </td>
                                        <td className="p-4 text-white font-medium">
                                            {ticket.subject}
                                            {ticket.admin_reply && <div className="text-xs text-green-400 mt-1">Has Admin Reply</div>}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                ticket.status === 'resolved' || ticket.status === 'closed' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                                                ticket.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                            }`}>
                                                {ticket.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-slate-400">
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-slate-500 font-medium">No support tickets found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
SupportIndex.layout = {
    breadcrumbs: [
        {
            title: 'Technical Support',
            href: '#',
        },
    ],
};
