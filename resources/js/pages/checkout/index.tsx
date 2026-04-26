import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import { CreditCard } from 'lucide-react';

export default function Checkout({ cart, items, totals }: any) {
    const { data, setData, post, processing, errors } = useForm({
        cardholder_name: '',
        card_number: '',
        expiry_date: '',
        cvv: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout/pay');
    };

    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden pt-24 pb-16">
            <Head title="Checkout - ZE-Commerce" />
            <ZeNavbar toggleCart={() => {}} />

            <div className="max-w-[1200px] mx-auto px-8 relative z-10 py-12">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Payment Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px]">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard aria-hidden="true" className="w-5 h-5 text-[#0066ff]" />
                                Payment Details
                            </h2>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Cardholder Name</label>
                                    <input 
                                        type="text" 
                                        value={data.cardholder_name}
                                        onChange={e => setData('cardholder_name', e.target.value)}
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all"
                                        placeholder="JANE DOE"
                                        required 
                                    />
                                    {errors.cardholder_name && <div className="text-red-500 text-xs mt-1">{errors.cardholder_name}</div>}
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Card Number</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={data.card_number}
                                            onChange={e => setData('card_number', e.target.value)}
                                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#0066ff] outline-none font-space tracking-widest transition-all"
                                            placeholder="4242 4242 4242 4242"
                                            required 
                                        />
                                        <CreditCard aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                    </div>
                                    {errors.card_number && <div className="text-red-500 text-xs mt-1">{errors.card_number}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Expiry Date</label>
                                        <input 
                                            type="text" 
                                            value={data.expiry_date}
                                            onChange={e => setData('expiry_date', e.target.value)}
                                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none font-space tracking-widest transition-all"
                                            placeholder="MM/YY"
                                            required 
                                        />
                                        {errors.expiry_date && <div className="text-red-500 text-xs mt-1">{errors.expiry_date}</div>}
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">CVV</label>
                                        <input 
                                            type="text" 
                                            value={data.cvv}
                                            onChange={e => setData('cvv', e.target.value)}
                                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none font-space tracking-widest transition-all"
                                            placeholder="123"
                                            required 
                                        />
                                        {errors.cvv && <div className="text-red-500 text-xs mt-1">{errors.cvv}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-[#0066ff] text-white py-4 font-space font-bold text-sm uppercase tracking-widest rounded-xl transition-all glow-blue hover:bg-blue-600 active:scale-95 disabled:bg-slate-700 mt-8 shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                                >
                                    {processing ? 'Processing...' : `Pay $${totals.grand_total}`}
                                </button>
                                <p className="text-xs text-slate-500 text-center mt-4">
                                    Use mock card ending in 4242 for a successful transaction.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px] sticky top-32">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                {items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                        <div>
                                            <div className="text-white font-medium">{item.service.title}</div>
                                            <div className="text-xs text-[#0066ff]">{item.service.category}</div>
                                        </div>
                                        <div className="font-space text-slate-300 font-bold">${item.price_at_purchase}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center mb-2 text-slate-400">
                                    <span>Subtotal</span>
                                    <span>${totals.grand_total}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 text-slate-400">
                                    <span>Tax (0%)</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-bold text-lg">Total</span>
                                    <span className="font-space text-3xl font-black text-[#0066ff]">${totals.grand_total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </div>
    );
}
