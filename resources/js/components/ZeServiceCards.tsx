import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '@/context/cart';

interface Service {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number | string;
    features?: string[];
}

const categoryIcons: Record<string, React.ReactNode> = {
    ERP: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4M7 8h10M7 11h6" />
        </svg>
    ),
    Web: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
    ),
    Mobile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <path d="M12 18h.01" />
        </svg>
    ),
};

function ServiceCard({
    service,
    index,
    featured,
}: {
    service: Service;
    index: number;
    featured: boolean;
}) {
    const cart = useCart();
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
        const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
        cardRef.current?.style.setProperty('--mx', `${x}%`);
        cardRef.current?.style.setProperty('--my', `${y}%`);
    };

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        cart.addItem(service.id, { fromEl: e.currentTarget, openCart: true });
    };

    const icon = categoryIcons[service.category] ?? categoryIcons['Web'];

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
            className={[
                'service-card relative overflow-hidden rounded-[20px] flex flex-col justify-between cursor-pointer',
                'border border-white/[0.07] bg-white/[0.03] backdrop-blur-md',
                'transition-all duration-300',
                'opacity-0 translate-y-6 animate-reveal',
                featured
                    ? 'md:col-span-2 md:row-span-2 border-blue-500/20 bg-blue-950/[0.18] p-12'
                    : 'p-9',
            ].join(' ')}
        >
            {/* Radial spotlight on hover */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                    background:
                        'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,102,255,0.1) 0%, transparent 65%)',
                }}
            />

            {/* Card number */}
            <span className="absolute top-5 right-6 font-mono text-[11px] tracking-widest text-white/10 select-none">
                {String(index + 1).padStart(2, '0')}
            </span>

            <div className="relative z-10 flex flex-col flex-1">
                {/* Icon */}
                <div
                    className={[
                        'flex items-center justify-center rounded-[14px]',
                        'bg-blue-500/10 border border-blue-500/20 text-blue-400',
                        'transition-all duration-300 hover:bg-blue-500/20 hover:scale-110',
                        'mb-6',
                        featured ? 'w-14 h-14 rounded-2xl' : 'w-12 h-12',
                    ].join(' ')}
                >
                    {icon}
                </div>

                {/* Tag */}
                <span className="inline-block mb-3 text-[10px] font-medium tracking-[0.14em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 w-fit">
                    {service.category}
                </span>

                {/* Title */}
                <h3
                    className={[
                        'font-semibold text-white tracking-tight leading-tight mb-3',
                        featured ? 'text-[28px]' : 'text-[18px]',
                    ].join(' ')}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p
                    className={[
                        'text-white/40 font-light leading-relaxed mb-5',
                        featured ? 'text-[15px] max-w-sm' : 'text-[13.5px]',
                    ].join(' ')}
                >
                    {service.description}
                </p>

                {/* Features (featured card only) */}
                {featured && service.features && (
                    <ul className="flex flex-col gap-2 mb-6">
                        {service.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 text-[13px] text-white/50 font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60aaff] flex-shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] pt-5 mt-5">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-white/30">Starting from</span>
                    <span
                        className={['font-bold text-white leading-none', featured ? 'text-[30px]' : 'text-[22px]'].join(' ')}
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        <sup className="text-[13px] text-white/60 font-sans align-super">$</sup>
                        {Number(service.price).toLocaleString()}
                    </span>
                </div>

                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 text-[12px] font-medium tracking-wide text-white bg-blue-600/90 hover:bg-blue-600 rounded-[10px] px-5 py-2.5 transition-all duration-200 hover:scale-105 active:scale-95 border-0"
                >
                    Add to cart
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function ZeServiceCards() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/services', { headers: { Accept: 'application/json' } })
            .then((r) => r.json())
            .then((data) => { if (data.services) setServices(data.services); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
                @keyframes reveal { to { opacity: 1; transform: translateY(0); } }
                .animate-reveal { animation: reveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
                .service-card:hover { border-color: rgba(0,102,255,0.35) !important; background: rgba(0,40,120,0.12) !important; transform: translateY(-3px); }
                .service-card::before {
                    content: ''; position: absolute; inset: 0; pointer-events: none;
                    background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,102,255,0.1) 0%, transparent 65%);
                    opacity: 0; transition: opacity 0.4s;
                }
                .service-card:hover::before { opacity: 1; }
            `}</style>

            <section className="py-24 px-6 max-w-[1440px] mx-auto relative">
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-14">
                    <h2
                        className="text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-4"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Built for{' '}
                        <span className="bg-gradient-to-br from-blue-400 to-blue-300 bg-clip-text text-transparent">
                            serious
                        </span>{' '}
                        scale
                    </h2>
                    <p className="text-white/45 font-light leading-relaxed">
                        Enterprise-grade software engineered for performance, reliability, and long-term growth.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-white/40 py-16 text-sm tracking-widest uppercase">
                        Loading services...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {services.map((service, idx) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={idx}
                                featured={idx === 0}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
