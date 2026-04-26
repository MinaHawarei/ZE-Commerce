import React from 'react';

export default function ZeHero() {
    return (
        <section className="relative min-h-[921px] flex items-center px-6 max-w-[1440px] mx-auto overflow-hidden">
            <div className="absolute inset-0 z-0 radial-gradient-glow pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
                <div className="space-y-12">
                    <div className="inline-block px-4 py-1 rounded-full border border-blue-400/20 bg-blue-500/5">
                        <span className="font-space font-medium text-blue-400 text-xs tracking-widest">NEXT-GENERATION INFRASTRUCTURE</span>
                    </div>
                    <h1 className="font-inter font-bold text-5xl md:text-6xl text-white leading-tight">
                        Powering the Future of <span className="text-[#0066ff]">Technical Commerce.</span>
                    </h1>
                    <p className="font-inter text-lg text-slate-300 max-w-xl">
                        Deploy high-performance neural nodes and cloud infrastructure with surgical precision. ZE-Commerce provides the backbone for enterprise intelligence.
                    </p>
                    <div className="flex flex-wrap gap-6 pt-4">
                        <button className="bg-[#0066ff] text-white font-space font-bold text-xs tracking-widest px-8 py-4 rounded transition-all glow-blue hover:bg-blue-600 active:scale-95">
                            DECODE SOLUTIONS
                        </button>
                        <button className="glass-panel text-white font-space font-bold text-xs tracking-widest px-8 py-4 rounded hover:bg-white/10 transition-all active:scale-95">
                            VIEW ARCHITECTURE
                        </button>
                    </div>
                </div>
                <div className="relative hidden lg:block h-[600px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full glass-panel rounded-xl overflow-hidden shadow-2xl">
                            <img alt="3D abstract technology visualization" className="w-full h-full object-cover opacity-60 mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkqDVWisNgt55vxiGKyu8HVkqWv0msOSJaKXS6-6Dbgb8PdaMGdMf3qBJeFh4l8sI5DDmQpyWAQvisJK6zz7EI3j_V4vU8Sb6w_iBWCIluNAmX-xNN6Wl1bBifDR58OaFJEoTpOyPQGhs20p2VAbXiVOg5cA4pVfRwIsECI-6fTUyXLQ-83zfOPQPvh4Lw2KBfnGS2NHvfp7-Hqdwk3KaVLsOjyK0i2NHEmWiHRPIg9f8v_GFacUwWtQ3X0J_4T2IGG1aRv2lKW40"/>
                        </div>
                    </div>
                    {/* Decorative floating panels */}
                    <div className="absolute top-10 -right-4 glass-panel p-6 rounded-xl border-blue-400/30 w-48 shadow-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-blue-400 text-sm">bolt</span>
                            <span className="font-space font-medium text-xs text-blue-400">LATENCY</span>
                        </div>
                        <div className="font-inter font-bold text-2xl text-white">0.42ms</div>
                    </div>
                    <div className="absolute bottom-10 -left-4 glass-panel p-6 rounded-xl border-white/10 w-56 shadow-xl">
                        <div className="font-space font-medium text-xs text-slate-500 mb-2">NETWORK THROUGHPUT</div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mb-2 overflow-hidden">
                            <div className="bg-[#0066ff] h-full w-[88%]"></div>
                        </div>
                        <div className="flex justify-between font-space font-medium text-[10px] text-slate-400">
                            <span>400Gbps</span>
                            <span>PEAK</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
