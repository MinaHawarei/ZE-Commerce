import React from 'react';

export default function ZeNavbar({ toggleCart }: { toggleCart: () => void }) {
    return (
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 max-w-[1440px] left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-[20px] border-b border-white/10 shadow-[0_4_24px_rgba(0,0,0,0.5)]">
            <div className="text-2xl font-black tracking-tighter text-slate-100 uppercase font-inter">ZE-Commerce</div>
            <nav className="hidden md:flex items-center gap-8">
                <a className="text-[#0066FF] border-b-2 border-[#0066FF] pb-1 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="#">Solutions</a>
                <a className="text-slate-400 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="#">Infrastructure</a>
                <a className="text-slate-400 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="#">Intelligence</a>
                <a className="text-slate-400 font-inter tracking-tight font-medium hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95" href="#">Enterprise</a>
            </nav>
            <div className="flex items-center gap-6">
                <span onClick={toggleCart} className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#0066FF] transition-colors">shopping_cart</span>
                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#0066FF] transition-colors">account_circle</span>
            </div>
        </header>
    );
}
