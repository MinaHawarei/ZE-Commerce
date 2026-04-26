import { Head, Link  } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Cpu, Globe, Package, Smartphone } from 'lucide-react';

interface ServiceItem {
    order_id: number;
    reference_number: string;
    service_id: number;
    title: string;
    category: string;
    purchased_at: string;
}

export default function Dashboard({ my_services }: { my_services: ServiceItem[] }) {
    return (
        <>
            <Head title="Dashboard" />
            {my_services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {my_services.map((service, idx) => (
                        <div key={idx} className="glass-panel p-6 rounded-xl group hover:border-[#0066ff]/30 transition-all flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066ff]/5 rounded-bl-full -z-10 group-hover:bg-[#0066ff]/10 transition-all"></div>

                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-[#0066ff]/10 rounded-lg text-[#0066ff]">
                                    {service.category === 'ERP' ? (
                                        <Cpu aria-hidden="true" className="w-5 h-5" />
                                    ) : service.category === 'Web' ? (
                                        <Globe aria-hidden="true" className="w-5 h-5" />
                                    ) : (
                                        <Smartphone aria-hidden="true" className="w-5 h-5" />
                                    )}
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-500/10 text-green-400 border-green-500/20">
                                    ACTIVE
                                </span>
                            </div>

                            <div className="flex-1 mb-6">
                                <div className="text-xs font-bold uppercase tracking-widest text-[#0066ff] mb-1">{service.category}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-xs text-slate-500 font-space mb-1">REF: {service.reference_number}</p>
                                <p className="text-xs text-slate-500">Deployed: {new Date(service.purchased_at).toLocaleDateString()}</p>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto">
                                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                    Manage
                                </button>
                                <Link
                                    href={`/support/create?reference=${service.reference_number}&service=${service.title}`}
                                    className="flex-1 bg-[#0066ff]/10 hover:bg-[#0066ff] text-[#0066ff] hover:text-white py-2 rounded-lg text-sm font-medium transition-colors text-center"
                                >
                                    Support
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-panel p-12 rounded-xl text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                        <Package aria-hidden="true" className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Active Deployments</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">You have not purchased any enterprise services yet. Explore our catalog to find the right solution.</p>
                    <Link href="/services" className="inline-block bg-[#0066ff] text-white px-6 py-3 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-blue-600 transition-colors">
                        Browse Catalog
                    </Link>
                </div>
            )}
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
