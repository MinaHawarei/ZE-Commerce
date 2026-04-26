import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function AdminSupportIndex({ tickets }: any) {
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    const { data, setData, patch, processing, reset } = useForm({
        status: '',
        admin_reply: ''
    });

    const openModal = (ticket: any) => {
        setSelectedTicket(ticket);
        setData({
            status: ticket.status,
            admin_reply: ticket.admin_reply || ''
        });
    };

const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTicket) return;

    patch(`/admin/support/${selectedTicket.id}`, {
        onSuccess: () => {
            toast.success('Ticket updated successfully');
            setSelectedTicket(null);
            reset();
        }
    });
};

    return (
        <>
            <Head title="Techincal Support" />
            <div className="p-3">
                {selectedTicket && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div className="bg-[#0A0A0B] border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0A0A0B]">
                                <h3 className="text-xl font-bold text-white font-inter">Manage Ticket #{selectedTicket.id}</h3>
                                <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-white">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Customer</div>
                                        <div className="text-white font-medium">{selectedTicket.user?.name}</div>
                                        <div className="text-slate-400 text-sm">{selectedTicket.user?.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Reference ID</div>
                                        <div className="font-space text-[#0066ff] font-bold">{selectedTicket.reference_number || 'N/A'}</div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Issue Description</div>
                                    <div className="bg-white/5 border border-white/5 p-4 rounded-lg text-slate-200">
                                        <div className="font-bold mb-2">{selectedTicket.subject}</div>
                                        <p className="whitespace-pre-wrap">{selectedTicket.message}</p>
                                    </div>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Status</label>
                                            <select
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-2 text-white outline-none"
                                            >
                                                <option value="open">Open</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Admin Reply (Sent to user)</label>
                                        <textarea
                                            value={data.admin_reply}
                                            onChange={e => setData('admin_reply', e.target.value)}
                                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all h-32 resize-none"
                                            placeholder="Type response here..."
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                        <button type="submit" disabled={processing} className="px-6 py-2 rounded-lg bg-[#0066ff] text-white font-bold text-sm tracking-wide shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50">
                                            Update Ticket
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white font-inter mb-2">Manage user support tickets and enterprise inquiries.</h3>
                    </div>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-white/5 text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/10">
                                    <th className="p-4 pl-6">ID / Ref</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.data.length > 0 ? tickets.data.map((ticket: any) => (
                                    <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="font-space text-white font-bold">#{ticket.id}</div>
                                            <div className="text-xs text-[#0066ff] font-space">{ticket.reference_number || 'N/A'}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-white">{ticket.user?.name}</div>
                                            <div className="text-xs text-slate-500">{ticket.user?.email}</div>
                                        </td>
                                        <td className="p-4 text-white font-medium">
                                            {ticket.subject}
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
                                        <td className="p-4 pr-6 text-right">
                                            <button
                                                onClick={() => openModal(ticket)}
                                                className="text-xs font-bold uppercase tracking-widest text-[#0066ff] hover:text-white transition-colors bg-[#0066ff]/10 hover:bg-[#0066ff] px-4 py-2 rounded-lg"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-slate-500 font-medium">No tickets require attention.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {tickets.last_page > 1 && (
                        <div className="p-4 border-t border-white/10 flex justify-center gap-2 bg-[#0A0A0B]/50">
                            {tickets.links.map((link: any, idx: number) => (
                                <button
                                    key={idx}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                                        link.active ? 'bg-[#0066ff] text-white font-bold shadow-lg' :
                                        !link.url ? 'text-slate-600 cursor-not-allowed' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
AdminSupportIndex.layout = {
    breadcrumbs: [
        {
            title: 'Techincal Support',
            href: '#',
        },
    ],
};
