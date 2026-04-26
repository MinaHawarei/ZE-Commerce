import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function SupportCreate({ reference, service }: { reference: string, service: string }) {
    const { data, setData, post, processing, errors } = useForm({
        reference_number: reference || '',
        subject: service ? `Support Request for ${service}` : '',
        message: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/support');
    };

    return (
        <>
            <Head title="Open Support Ticket" />
            <div className="p-3">
                <div className="mb-8">
                    <Link href="/support" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm font-medium">
                        <ArrowLeft aria-hidden="true" className="w-[18px] h-[18px]" />
                        Back to Tickets
                    </Link>
                    <h1 className="text-2xl font-bold text-white font-inter mb-2">Open New Request</h1>
                    <p className="text-slate-400 text-sm">Provide details about your issue and our engineers will assist you.</p>
                </div>

                <div className="glass-panel p-8 rounded-xl max-w-3xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Reference ID (Optional)</label>
                                <input
                                    type="text"
                                    value={data.reference_number}
                                    onChange={e => setData('reference_number', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all font-space"
                                    placeholder="ZE-..."
                                />
                                {errors.reference_number && <div className="text-red-500 text-xs mt-1">{errors.reference_number}</div>}
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Subject</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all"
                                    required
                                />
                                {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2 block">Issue Description</label>
                            <textarea
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066ff] outline-none transition-all h-40 resize-none"
                                placeholder="Please describe your technical issue..."
                                required
                            ></textarea>
                            {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#0066ff] text-white px-8 py-3 font-space font-bold text-sm uppercase tracking-widest rounded-xl transition-all glow-blue hover:bg-blue-600 active:scale-95 disabled:bg-slate-700 shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                            >
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
SupportCreate.layout = {
    breadcrumbs: [
        {
            title: 'Open Support Ticket',
            href: '#',
        },
    ],
};
