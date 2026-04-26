import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import { Info, XCircle } from 'lucide-react';

export default function CheckoutFailure({ order }: any) {
    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden pt-24 pb-16 flex flex-col items-center justify-center">
            <Head title="Payment Failed - ZE-Commerce" />
            <ZeNavbar toggleCart={() => {}} />

            <div className="max-w-[600px] w-full px-8 relative z-10 text-center">
                <div className="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    <XCircle aria-hidden="true" className="w-12 h-12" />
                </div>
                
                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Payment Failed</h1>
                <p className="text-slate-400 mb-8">
                    We could not process your transaction. Please verify your payment details and try again.
                </p>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px] text-left mb-8">
                    <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
                        <div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Reference ID</div>
                            <div className="font-space text-[#0066ff] font-bold">{order.reference_number}</div>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Total Amount</div>
                            <div className="font-space text-white font-bold">${order.total_amount}</div>
                        </div>
                    </div>
                    
                    <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3">
                        <Info aria-hidden="true" className="w-5 h-5 mt-0.5" />
                        <div>
                            <span className="font-bold block mb-1">Transaction Declined</span>
                            No charges were made to your account. You can safely attempt the payment again.
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/checkout" className="bg-[#0066ff] text-white px-8 py-4 font-space font-bold text-xs uppercase tracking-widest rounded-xl transition-all glow-blue hover:bg-blue-600 active:scale-95 shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                        Try Again
                    </Link>
                    <Link href="/services" className="bg-white/5 border border-white/10 text-slate-300 hover:text-white px-8 py-4 font-space font-bold text-xs uppercase tracking-widest rounded-xl transition-all hover:bg-white/10 active:scale-95">
                        Return to Catalog
                    </Link>
                </div>
            </div>
            <style>{`
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </div>
    );
}
