import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface PageProps {
    stats: {
        total_revenue: number;
        pending_orders: number;
        paid_orders: number;
        total_users: number;
        total_services: number;
    };
    recent_orders: any[];
    sales_data: any[];
    top_services: any[];
}

export default function Dashboard({ stats, recent_orders, sales_data, top_services }: PageProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<any>().props;

    // A customized tooltip for the chart
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0A0A0B]/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
                    <p className="text-slate-400 text-xs mb-1 font-label-caps">{label}</p>
                    <p className="text-[#0066ff] font-bold font-data-mono">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden flex">
            <Head title="Admin Dashboard - ZE-Commerce">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <style>{`
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .font-space { font-family: 'Space Grotesk', sans-serif; }
                    .font-inter { font-family: 'Inter', sans-serif; }
                `}</style>
            </Head>

            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Topbar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0B]/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-xl font-bold font-inter text-white hidden sm:block">Command Center</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-white">{auth.user.name}</div>
                            <div className="text-xs text-[#0066ff] uppercase tracking-widest">{auth.user.role}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                    </div>
                </header>

                <div className="p-8 flex-1 w-full max-w-7xl mx-auto space-y-8">
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0066ff]/10 rounded-full blur-2xl group-hover:bg-[#0066ff]/20 transition-all"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Revenue</div>
                                <span className="material-symbols-outlined text-[#0066ff]">payments</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-space">${Number(stats.total_revenue).toLocaleString()}</div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Paid Orders</div>
                                <span className="material-symbols-outlined text-green-500">check_circle</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-space">{stats.paid_orders}</div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Pending Orders</div>
                                <span className="material-symbols-outlined text-orange-500">pending</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-space">{stats.pending_orders}</div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Users</div>
                                <span className="material-symbols-outlined text-purple-500">group</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-space">{stats.total_users}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Area */}
                        <div className="lg:col-span-2 glass-panel p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-white font-inter">Revenue Analytics</h2>
                                <select className="bg-[#0A0A0B] border border-white/10 rounded text-sm text-slate-300 px-3 py-1 outline-none focus:border-[#0066ff]">
                                    <option>Last 6 Months</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={sales_data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0066ff" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#0066ff" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                                        <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value/1000}k`} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                        <Area type="monotone" dataKey="revenue" stroke="#0066ff" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Services */}
                        <div className="glass-panel p-6 rounded-xl flex flex-col">
                            <h2 className="text-lg font-bold text-white font-inter mb-6">Top Performing Services</h2>
                            <div className="space-y-4 flex-1">
                                {top_services.length > 0 ? top_services.map((service, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center font-bold text-xs">
                                                {idx + 1}
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">{service.title}</span>
                                        </div>
                                        <span className="text-xs font-bold text-[#0066ff] bg-[#0066ff]/10 px-2 py-1 rounded">
                                            {service.count} Sales
                                        </span>
                                    </div>
                                )) : (
                                    <div className="text-slate-500 text-sm h-full flex items-center justify-center">No sales data yet.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="glass-panel rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white font-inter">Recent Transactions</h2>
                            <button className="text-sm text-[#0066ff] hover:text-white transition-colors">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-white/5 text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/10">
                                        <th className="p-4 pl-6">Reference</th>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_orders.length > 0 ? recent_orders.map((order) => (
                                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-4 pl-6">
                                                <span className="font-space text-[#0066ff] font-medium">{order.reference_number}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm text-white">{order.user?.name || order.cardholder_name || 'Guest'}</div>
                                                <div className="text-xs text-slate-500">{order.user?.email || 'N/A'}</div>
                                            </td>
                                            <td className="p-4 text-white font-space font-medium">${order.total_amount}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                    order.payment_status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                                    order.payment_status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                    {order.payment_status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-slate-400">
                                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500">No transactions found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
