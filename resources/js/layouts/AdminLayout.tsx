import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title = 'Admin Dashboard' }: { children: React.ReactNode, title?: string }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<any>().props;

    const navLinks = [
        { name: 'Overview', href: '/admin', icon: 'dashboard', active: window.location.pathname === '/admin' },
        { name: 'Orders', href: '/admin/orders', icon: 'shopping_cart', active: window.location.pathname.startsWith('/admin/orders') },
        { name: 'Service Catalog', href: '/admin/services', icon: 'category', active: window.location.pathname.startsWith('/admin/services') },
        { name: 'Users', href: '#', icon: 'group', active: false },
        { name: 'Settings', href: '#', icon: 'settings', active: false },
    ];

    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden flex">
            <Head title={`${title} - ZE-Commerce Admin`}>
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

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-[55] lg:hidden" 
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            
            <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0A0A0B]/95 backdrop-blur-xl border-r border-white/10 shadow-[0_0_30px_rgba(0,102,255,0.1)] z-[60] flex flex-col py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="text-xl font-black tracking-tighter text-slate-100 uppercase font-inter flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0066ff]">admin_panel_settings</span>
                        ZE-Admin
                    </div>
                    <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 space-y-2">
                    {navLinks.map(link => (
                        <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium font-inter transition-all ${link.active ? 'bg-[#0066ff]/10 text-[#0066ff] border border-[#0066ff]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}>
                            <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 px-2 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white font-medium font-inter transition-all border border-transparent">
                        <span className="material-symbols-outlined text-[20px]">storefront</span>
                        Back to Store
                    </Link>
                </div>
            </aside>

            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Topbar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0B]/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-xl font-bold font-inter text-white hidden sm:block">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-white">{auth?.user?.name}</div>
                            <div className="text-xs text-[#0066ff] uppercase tracking-widest">{auth?.user?.role}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                    </div>
                </header>

                <div className="p-8 flex-1 w-full max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
