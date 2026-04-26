import React from 'react';
import { Head } from '@inertiajs/react';
import { Rocket, ShieldCheck } from 'lucide-react';
import LandingLayout from '@/layouts/LandingLayout';

export default function About() {
    return (
        <>
            <Head title="About Us - ZE-Commerce" />
            <div className="max-w-[1000px] mx-auto px-8 py-12 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Architects of the Digital Future</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        ZE-Commerce was founded on a singular vision: to democratize enterprise-grade infrastructure. We build scalable, high-performance systems for businesses that refuse to compromise on speed or security.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px]">
                        <div className="w-12 h-12 bg-[#0066ff]/20 text-[#0066ff] rounded-lg flex items-center justify-center mb-6">
                            <Rocket aria-hidden="true" size={20} className="text-current" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-slate-400 leading-relaxed">
                            To empower organizations with elite digital tools. Whether it's a dynamic web presence, a robust mobile application, or a sprawling ERP system, we engineer solutions that accelerate growth and streamline operations.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px]">
                        <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-6">
                            <ShieldCheck aria-hidden="true" size={20} className="text-current" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Uncompromising Security</h3>
                        <p className="text-slate-400 leading-relaxed">
                            In an era of unprecedented cyber threats, we bake zero-trust architecture into every platform we deploy. Your data integrity and system availability are our highest priorities.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">Trusted by Global Enterprises</h2>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                        {/* Placeholder logos */}
                        <div className="font-space text-2xl font-bold tracking-widest">NEXUS</div>
                        <div className="font-space text-2xl font-bold tracking-widest">AERIS</div>
                        <div className="font-space text-2xl font-bold tracking-widest">QUANTUM</div>
                        <div className="font-space text-2xl font-bold tracking-widest">VANGUARD</div>
                    </div>
                </div>
            </div>
            <style>{`
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </>
    );
}

About.layout = (page: React.ReactNode) => (
    <LandingLayout className="pt-24 pb-16">{page}</LandingLayout>
);
