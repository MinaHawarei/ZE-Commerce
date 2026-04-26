import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import { BadgeCheck, CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccess({ order }: any) {
    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden pt-24 pb-16 flex flex-col items-center justify-center">
            <Head title="Payment Successful - ZE-Commerce" />
            <ZeNavbar toggleCart={() => {}} />

            <div className="max-w-[600px] w-full px-8 relative z-10 text-center">
                <div className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 aria-hidden="true" className="w-12 h-12" />
                </div>
                
                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Payment Successful</h1>
                <p className="text-slate-400 mb-8">
                    Your transaction has been securely processed. The enterprise resources have been allocated to your account.
                </p>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px] text-left mb-8">
                    <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
                        <div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Reference ID</div>
                            <div className="font-space text-[#0066ff] font-bold">{order.reference_number}</div>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Total Paid</div>
                            <div className="font-space text-white font-bold">${order.total_amount}</div>
                        </div>
                    </div>
                    
                    <div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">Provisioned Services</div>
                        <ul className="space-y-3">
                            {order.items_snapshot.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <BadgeCheck aria-hidden="true" className="w-[18px] h-[18px] text-green-500" />
                                    <span className="text-slate-200 text-sm">{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard" className="bg-[#0066ff] text-white px-8 py-4 font-space font-bold text-xs uppercase tracking-widest rounded-xl transition-all glow-blue hover:bg-blue-600 active:scale-95 shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                        Go to My Services
                    </Link>
                </div>
            </div>
            <style>{`
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </div>
    );
}
