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
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden flex">
            <Head title={`${title} - ZE-Commerce`}>
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

            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                <div className="p-8 flex-1 w-full max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
