import React, { useState } from 'react';
import { router , Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { ListOrdered, X } from 'lucide-react';


interface Order {
    id: number;
    reference_number: string;
    total_amount: string;
    payment_status: 'pending' | 'paid' | 'failed';
    created_at: string;
    cardholder_name: string;
    items_snapshot: any[];
    user?: { name: string; email: string };
}

interface PageProps {
    orders: {
        data: Order[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        status?: string;
    };
}

export default function OrdersIndex({ orders, filters }: PageProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get('/admin/orders', { status: e.target.value }, { preserveState: true });
    };

    const updateStatus = (orderId: number, status: string) => {
        router.patch(`/admin/orders/${orderId}/status`, { status }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Order status updated successfully.'),
            onError: () => toast.error('Failed to update order status.')
        });
    };

    return (
            <>
            <Head title="Orders" />
            <div className="p-3">
            {/* Modal for Order Details */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0A0A0B] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0A0A0B]">
                            <h3 className="text-xl font-bold text-white font-inter">Order {selectedOrder.reference_number}</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                                <X aria-hidden="true" className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-slate-500 uppercase tracking-widest text-xs mb-1">Customer Info</div>
                                    <div className="text-white font-medium">{selectedOrder.user?.name || selectedOrder.cardholder_name || 'Guest'}</div>
                                    <div className="text-slate-400">{selectedOrder.user?.email}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 uppercase tracking-widest text-xs mb-1">Payment Status</div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                        selectedOrder.payment_status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        selectedOrder.payment_status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                        {selectedOrder.payment_status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="text-slate-500 uppercase tracking-widest text-xs mb-3">Service Snapshot</div>
                                <div className="space-y-3">
                                    {selectedOrder.items_snapshot.map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                                            <div>
                                                <div className="text-xs text-[#0066ff] mb-1">{item.category}</div>
                                                <div className="text-white font-medium">{item.title}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-space text-lg font-bold text-white">${item.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="text-slate-400 uppercase tracking-widest text-sm font-medium">Grand Total</span>
                                <span className="font-space text-2xl font-bold text-[#0066ff]">${selectedOrder.total_amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0A0A0B]/50">
                    <div className="flex items-center gap-2">
                        <ListOrdered aria-hidden="true" className="w-5 h-5 text-[#0066ff]" />
                        <h2 className="text-lg font-bold text-white font-inter">All Transactions</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400 font-medium">Filter by Status:</span>
                        <select
                            value={filters.status || ''}
                            onChange={handleStatusFilter}
                            className="bg-[#0A0A0B] border border-white/10 rounded-lg text-sm text-slate-200 px-4 py-2 outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                        >
                            <option value="">All Orders</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-white/5 text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/10">
                                <th className="p-4 pl-6">Reference ID</th>
                                <th className="p-4">Customer Details</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Current Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.length > 0 ? orders.data.map((order) => (
                                <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-4 pl-6">
                                        <span className="font-space text-[#0066ff] font-medium">{order.reference_number}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-white">{order.user?.name || order.cardholder_name || 'Guest'}</div>
                                        <div className="text-xs text-slate-500">{order.user?.email || 'N/A'}</div>
                                    </td>
                                    <td className="p-4 text-white font-space font-medium">${order.total_amount}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.payment_status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className={`text-xs font-medium rounded-lg border px-3 py-1 outline-none transition-all ${
                                                order.payment_status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20 focus:border-green-500' :
                                                order.payment_status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 focus:border-orange-500' :
                                                'bg-red-500/10 text-red-400 border-red-500/20 focus:border-red-500'
                                            }`}
                                        >
                                            <option value="pending" className="bg-[#0A0A0B] text-orange-400">PENDING</option>
                                            <option value="paid" className="bg-[#0A0A0B] text-green-400">PAID</option>
                                            <option value="failed" className="bg-[#0A0A0B] text-red-400">FAILED</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-sm text-slate-400">
                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-xs font-bold uppercase tracking-widest text-[#0066ff] hover:text-white transition-colors bg-[#0066ff]/10 hover:bg-[#0066ff] px-4 py-2 rounded-lg"
                                        >
                                            View Snapshot
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-slate-500 font-medium">No orders found matching your criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {orders.last_page > 1 && (
                    <div className="p-4 border-t border-white/10 flex justify-center gap-2 bg-[#0A0A0B]/50">
                        {orders.links.map((link, idx) => (
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
OrdersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: '#',
        },
    ],
};
