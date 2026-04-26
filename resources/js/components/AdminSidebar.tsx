import React from 'react';
import { Link } from '@inertiajs/react';

export default function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-[55] lg:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0A0A0B]/95 backdrop-blur-xl border-r border-white/10 shadow-[0_0_30px_rgba(0,102,255,0.1)] z-[60] flex flex-col py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="text-xl font-black tracking-tighter text-slate-100 uppercase font-inter flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0066ff]">admin_panel_settings</span>
                        ZE-Admin
                    </div>
                    <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0066ff]/10 text-[#0066ff] border border-[#0066ff]/20 font-medium font-inter transition-all">
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        Overview
                    </Link>
                    
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white font-medium font-inter transition-all">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        Manage Orders
                    </Link>

                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white font-medium font-inter transition-all">
                        <span className="material-symbols-outlined text-[20px]">category</span>
                        Service Catalog
                    </Link>

                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white font-medium font-inter transition-all">
                        <span className="material-symbols-outlined text-[20px]">group</span>
                        User Management
                    </Link>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 px-2 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white font-medium font-inter transition-all">
                        <span className="material-symbols-outlined text-[20px]">storefront</span>
                        Back to Store
                    </Link>
                </div>
            </aside>
        </>
    );
}
