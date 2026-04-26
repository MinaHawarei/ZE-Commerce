import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Boxes, LayoutDashboard, Menu, Settings, ShoppingCart, Shield, Store, User, Users, X } from 'lucide-react';

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

    const iconFor = (icon: string) => {
        switch (icon) {
            case 'dashboard':
                return <LayoutDashboard aria-hidden="true" className="w-5 h-5" />;
            case 'shopping_cart':
                return <ShoppingCart aria-hidden="true" className="w-5 h-5" />;
            case 'category':
                return <Boxes aria-hidden="true" className="w-5 h-5" />;
            case 'group':
                return <Users aria-hidden="true" className="w-5 h-5" />;
            case 'settings':
                return <Settings aria-hidden="true" className="w-5 h-5" />;
            case 'storefront':
                return <Store aria-hidden="true" className="w-5 h-5" />;
            default:
                return <Boxes aria-hidden="true" className="w-5 h-5" />;
        }
    };

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground dark font-inter overflow-x-hidden flex">
            <Head title={`${title} - ZE-Commerce Admin`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
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
                        <Shield aria-hidden="true" className="w-5 h-5 text-primary" />
                        ZE-Admin
                    </div>
                    <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X aria-hidden="true" className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 space-y-2">
                    {navLinks.map(link => (
                        <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium font-inter transition-all ${link.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'}`}>
                            {iconFor(link.icon)}
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-border px-2 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground font-medium font-inter transition-all border border-transparent">
                        {iconFor('storefront')}
                        Back to Store
                    </Link>
                </div>
            </aside>

            <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {/* Topbar */}
                <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setSidebarOpen(true)}>
                            <Menu aria-hidden="true" className="w-5 h-5" />
                        </button>
                        <h1 className="text-xl font-bold font-inter text-foreground hidden sm:block">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-foreground">{auth?.user?.name}</div>
                            <div className="text-xs text-primary uppercase tracking-widest">{auth?.user?.role}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                            <User aria-hidden="true" className="w-5 h-5 text-muted-foreground" />
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
