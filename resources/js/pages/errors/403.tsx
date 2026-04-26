import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Home, ShieldX } from 'lucide-react';

export default function Forbidden() {
    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] flex items-center justify-center font-inter p-6">
            <Head title="403 Forbidden - ZE-Commerce" />
            
            <div className="glass-panel p-10 md:p-16 rounded-2xl max-w-2xl w-full text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                        <ShieldX aria-hidden="true" className="w-10 h-10" />
                    </div>
                    
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tight">403</h1>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-6 uppercase tracking-widest">Access Restricted</h2>
                    
                    <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                        You do not have the required enterprise clearance to access this sector. This incident has been logged.
                    </p>
                    
                    <Link href="/" className="inline-flex items-center gap-2 bg-[#0066ff] text-white px-8 py-4 rounded-lg font-space font-bold text-xs uppercase tracking-widest transition-all hover:bg-blue-600 shadow-[0_0_20px_rgba(0,102,255,0.3)] active:scale-95">
                        <Home aria-hidden="true" className="w-4 h-4" />
                        Return to Public Matrix
                    </Link>
                </div>
            </div>
            
            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </div>
    );
}
