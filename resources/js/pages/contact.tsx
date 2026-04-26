import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Mail, MapPin } from 'lucide-react';
import LandingLayout from '@/layouts/LandingLayout';
import { toast } from 'sonner';

export default function Contact() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock post action for the contact form
        toast.success("Message transmitted securely. Our team will respond shortly.");
        reset();
    };

    return (
        <>
            <Head title="Contact - ZE-Commerce" />
            <div className="max-w-[1000px] mx-auto px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div className="text-[#0066FF] text-xs uppercase tracking-[0.2em] font-bold mb-4">Secure Channel</div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Initiate Contact</h1>
                        <p className="text-slate-400 mb-10 leading-relaxed">
                            Have a complex enterprise requirement? Connect with our solution architects to design a system tailored to your exact operational parameters.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail aria-hidden="true" size={18} className="text-[#0066ff]" />
                                </div>
                                <span className="font-space">enterprise@ze-commerce.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin aria-hidden="true" size={18} className="text-[#0066ff]" />
                                </div>
                                <span className="font-space">Sector 7G, Silicon Matrix, Earth</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px]">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Operative Name</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Secure Email</label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Transmission</label>
                                <textarea 
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all h-32 resize-none"
                                    required 
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-[#0066ff] text-white py-4 font-space font-bold text-sm uppercase tracking-widest rounded-xl transition-all glow-blue hover:bg-blue-600 active:scale-95 shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                            >
                                Transmit Protocol
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => (
    <LandingLayout className="pt-24 pb-16">{page}</LandingLayout>
);
