import React from 'react';

export default function ZeFooter() {
    return (
        <footer className="mt-24 border-t border-white/5 bg-[#0A0A0B]">
            <div className="w-full max-w-[1440px] mx-auto px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <div className="text-sm font-bold text-slate-300">ZE-Commerce</div>
                    <p className="font-inter text-xs text-slate-500 uppercase tracking-widest">© 2026 ZE-Commerce. Engineered for Technical Excellence.</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-8">
                    <a className="font-inter text-xs text-slate-600 uppercase tracking-widest hover:text-white transition-colors cursor-pointer" href="#">Service Level Agreement</a>
                    <a className="font-inter text-xs text-slate-600 uppercase tracking-widest hover:text-white transition-colors cursor-pointer" href="#">Network Status</a>
                    <a className="font-inter text-xs text-slate-600 uppercase tracking-widest hover:text-white transition-colors cursor-pointer" href="#">Enterprise Security</a>
                    <a className="font-inter text-xs text-slate-600 uppercase tracking-widest hover:text-white transition-colors cursor-pointer" href="#">Terms of Deployment</a>
                </div>
            </div>
        </footer>
    );
}
