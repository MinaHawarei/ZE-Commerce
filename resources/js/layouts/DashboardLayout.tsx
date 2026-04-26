import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function DashboardLayout({ children, title = 'Dashboard' }: { children: React.ReactNode, title?: string }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<any>().props;

    const isAdmin = auth?.user?.role === 'admin';

    const adminLinks = [
        { name: 'Overview', href: '/admin', icon: 'dashboard', active: window.location.pathname === '/admin' },
        { name: 'Order Management', href: '/admin/orders', icon: 'shopping_cart', active: window.location.pathname.startsWith('/admin/orders') },
        { name: 'Service Catalog', href: '/admin/services', icon: 'category', active: window.location.pathname.startsWith('/admin/services') },
        { name: 'User Management', href: '#', icon: 'group', active: window.location.pathname.startsWith('/admin/users') },
        { name: 'Tech Support', href: '/admin/support', icon: 'support_agent', active: window.location.pathname.startsWith('/admin/support') },
    ];

    const userLinks = [
        { name: 'My Services', href: '/dashboard', icon: 'apps', active: window.location.pathname === '/dashboard' },
        { name: 'Order History', href: '/orders', icon: 'history', active: window.location.pathname.startsWith('/orders') },
        { name: 'Support Tickets', href: '/support', icon: 'contact_support', active: window.location.pathname.startsWith('/support') },
    ];

    const navLinks = isAdmin ? adminLinks : userLinks;

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground dark font-inter overflow-x-hidden flex">
            <Head title={`${title} - ZE-Commerce`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[55] lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar/95 backdrop-blur-xl border-r border-border shadow-[0_0_30px_rgba(0,102,255,0.1)] z-[60] flex flex-col py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="text-xl font-black tracking-tighter text-slate-100 uppercase font-inter flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">apps</span>
                        Dashboard
                    </div>
                    <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 space-y-2">
                    {navLinks.map(link => (
                        <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium font-inter transition-all ${link.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'}`}>
                            <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-border px-2 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground font-medium font-inter transition-all border border-transparent">
                        <span className="material-symbols-outlined text-[20px]">storefront</span>
                        Back to Store
                    </Link>
                </div>
            </aside>

            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setSidebarOpen(true)}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-xl font-bold font-inter text-foreground hidden sm:block">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-foreground">{auth?.user?.name}</div>
                            <div className="text-xs text-primary uppercase tracking-widest">{auth?.user?.role}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                            <span className="material-symbols-outlined text-muted-foreground">person</span>
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
