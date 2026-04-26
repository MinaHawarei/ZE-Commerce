import React, { useState, useEffect } from 'react';

interface Service {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number | string;
}

export default function ZeServiceCards({ setCartUpdated }: { setCartUpdated: () => void }) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/services', {
                    headers: { 'Accept': 'application/json' }
                });
                const data = await response.json();
                if (data.services) {
                    setServices(data.services);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const addToCart = async (serviceId: number) => {
        try {
            const response = await fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ service_id: serviceId })
            });
            const data = await response.json();
            
            if (response.ok) {
                setNotification({ message: 'Service added to cart successfully!', type: 'success' });
                setCartUpdated();
            } else {
                setNotification({ message: data.message || 'Failed to add service', type: 'error' });
            }
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            setNotification({ message: 'An error occurred', type: 'error' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <section className="py-24 px-6 max-w-[1440px] mx-auto relative">
            {notification && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-white font-inter text-sm shadow-xl ${notification.type === 'success' ? 'bg-green-600/90 border border-green-500' : 'bg-red-600/90 border border-red-500'}`}>
                    {notification.message}
                </div>
            )}
            
            <div className="mb-16 text-center max-w-2xl mx-auto">
                <h2 className="font-inter font-semibold text-3xl text-white mb-4">Engineered for Performance</h2>
                <p className="font-inter text-slate-300">Our stack is designed to handle the most demanding enterprise workloads with zero compromise on stability.</p>
            </div>
            
            {loading ? (
                <div className="text-center text-white py-12">Loading premium services...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                         <div key={service.id} className={`${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} glass-panel p-8 rounded-xl flex flex-col justify-between group cursor-pointer hover:border-[#0066ff]/40 transition-all`}>
                            <div>
                                <div className="p-3 bg-[#0066ff]/10 w-fit rounded mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[#0066ff] text-3xl">
                                        {service.category === 'ERP' ? 'memory' : service.category === 'Web' ? 'language' : 'smartphone'}
                                    </span>
                                </div>
                                <h3 className={`${idx === 0 ? 'text-3xl' : 'text-2xl'} font-inter font-semibold mb-4 text-white`}>{service.title}</h3>
                                <p className="font-inter text-slate-300 mb-6">{service.description}</p>
                                <div className="text-xl font-bold text-[#b3c5ff] mb-4">${service.price}</div>
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                                <button onClick={() => addToCart(service.id)} className="bg-[#0066ff] text-white font-space font-bold text-xs tracking-widest px-6 py-3 rounded transition-all hover:bg-blue-600">
                                    ADD TO CART
                                </button>
                                <span className="material-symbols-outlined text-[#0066ff]">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
