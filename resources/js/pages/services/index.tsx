import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import ZeCartSidebar from '@/components/ZeCartSidebar';

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    price: string;
}

export default function ServicesIndex({ services, categories, activeCategory, search }: any) {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartRefresh, setCartRefresh] = useState(0);
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/services', { category: activeCategory, search: searchTerm }, { preserveState: true });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        router.get('/services');
    };

    const handleAddToCart = async (serviceId: number) => {
        try {
            await fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ service_id: serviceId })
            });
            setCartRefresh(prev => prev + 1);
            setCartOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-[#0A0A0B] min-h-screen text-[#e0e2e8] selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden pt-24 pb-16">
            <Head title="Tech Services - ZE-Commerce">
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>

            <ZeNavbar toggleCart={() => setCartOpen(true)} />
            <ZeCartSidebar isOpen={cartOpen} closeCart={() => setCartOpen(false)} refreshTrigger={cartRefresh} />

            <div className="max-w-[1440px] mx-auto px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Our Solutions</h1>
                        <p className="text-slate-400">Discover cutting-edge infrastructure and intelligence platforms.</p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                        <form onSubmit={handleSearch} className="relative flex-1 sm:w-64">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search services..." 
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:border-[#0066ff] outline-none"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        </form>
                        
                        <div className="flex gap-2">
                            {categories.map((cat: string) => (
                                <Link 
                                    key={cat} 
                                    href={`/services?category=${cat}${searchTerm ? `&search=${searchTerm}` : ''}`}
                                    className={`px-4 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                        activeCategory === cat ? 'bg-[#0066ff] text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                                >
                                    {cat === 'Web' ? 'Infrastructure' : cat === 'Apps' ? 'Intelligence' : 'Enterprise'}
                                </Link>
                            ))}
                        </div>
                        
                        {(activeCategory || search) && (
                            <button onClick={handleClearFilters} className="px-4 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.length > 0 ? services.map((service: Service) => (
                        <div key={service.id} className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[24px] group hover:bg-white/10 transition-all duration-300 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="flex-1 mb-8">
                                <div className="text-[#0066FF] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{service.category}</div>
                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-2xl font-black text-white font-space">${Number(service.price).toLocaleString()}</div>
                                <div className="flex gap-3">
                                    <Link href={`/services/${service.slug}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/5 transition-all">
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </Link>
                                    <button onClick={() => handleAddToCart(service.id)} className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center text-white hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(0,102,255,0.4)] active:scale-95">
                                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-slate-500">search_off</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No services found</h3>
                            <p className="text-slate-400">Try adjusting your filters or search term.</p>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .font-space { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </div>
    );
}
