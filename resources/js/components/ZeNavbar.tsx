import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function ZeNavbar({ toggleCart }: { toggleCart: () => void }) {
    const { auth } = usePage<any>().props;

    return (
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 max-w-[1440px] left-1/2 -translate-x-1/2 bg-[#0A0A0B]/80 backdrop-blur-[20px] border-b border-white/10 shadow-[0_4_24px_rgba(0,0,0,0.5)]">
            <Link href="/" className="text-2xl font-black tracking-tighter text-slate-100 uppercase font-inter">ZE-Commerce</Link>
            <nav className="hidden md:flex items-center gap-8">
                <Link className="text-[#0066FF] border-b-2 border-[#0066FF] pb-1 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="/services">All Solutions</Link>
                <Link className="text-slate-400 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="/services?category=Web">Infrastructure</Link>
                <Link className="text-slate-400 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="/services?category=Apps">Intelligence</Link>
                <Link className="text-slate-400 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="/services?category=ERP">Enterprise</Link>
            </nav>
            <div className="flex items-center gap-6">
                <span onClick={toggleCart} className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#0066FF] transition-colors relative">
                    shopping_cart
                    {/* Cart count could be added here later */}
                </span>
                {auth?.user ? (
                    <Link href={auth.user.role === 'admin' ? '/admin' : '/dashboard'} className="material-symbols-outlined text-[#0066ff] cursor-pointer hover:text-white transition-colors">
                        account_circle
                    </Link>
                ) : (
                    <Link href="/login" className="text-xs font-bold font-inter tracking-widest text-[#0066FF] border border-[#0066FF] px-4 py-2 rounded-full hover:bg-[#0066FF] hover:text-white transition-colors">
                        LOGIN
                    </Link>
                )}
            </div>
        </header>
    );
}
