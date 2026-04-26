import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import { ArrowLeft, Check, Puzzle, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart';

export default function ServiceShow({ service }: any) {
    const cart = useCart();

    const handleAddToCart = async () => {
        try {
            await cart.addItem(service.id, { openCart: true });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden pt-24 pb-16">
            <Head title={`${service.title} - ZE-Commerce`}>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
            </Head>

            <ZeNavbar />

            <div className="max-w-[1200px] mx-auto px-8 relative z-10 py-12">
                <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 text-sm font-medium">
                    <ArrowLeft aria-hidden="true" className="w-[18px] h-[18px]" />
                    Back to Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div className="text-[#0066FF] text-xs uppercase tracking-[0.2em] font-bold mb-4">{service.category === 'Web' ? 'Infrastructure' : service.category === 'Apps' ? 'Intelligence' : 'Enterprise'}</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">{service.title}</h1>
                        <p className="text-slate-300 text-lg leading-relaxed mb-10">
                            {service.description}
                        </p>

                        {service.features_list && service.features_list.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                                    <Puzzle aria-hidden="true" className="w-5 h-5 text-[#0066ff]" />
                                    Technical Specs
                                </h3>
                                <ul className="space-y-4">
                                    {service.features_list.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded bg-[#0066ff]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check aria-hidden="true" className="w-[14px] h-[14px] text-[#0066ff]" />
                                            </div>
                                            <span className="text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 lg:p-12 rounded-[32px] sticky top-32">
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">License Investment</div>
                            <div className="text-5xl font-black text-white font-space mb-8">${Number(service.price).toLocaleString()}</div>
                            
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-[#0066ff] hover:bg-blue-600 text-white py-5 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(0,102,255,0.3)] active:scale-95 mb-6"
                            >
                                <ShoppingCart aria-hidden="true" className="w-5 h-5" />
                                Deploy Instance
                            </button>
                            
                            <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/5 p-4 rounded-lg border border-white/5">
                                <ShieldCheck aria-hidden="true" className="w-5 h-5 text-green-400" />
                                Includes 24/7 Enterprise Support & SLA
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
