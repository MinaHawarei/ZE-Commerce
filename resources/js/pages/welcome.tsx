import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import ZeHero from '@/components/ZeHero';
import ZeServiceCards from '@/components/ZeServiceCards';
import ZeCartSidebar from '@/components/ZeCartSidebar';
import ZeFooter from '@/components/ZeFooter';

export default function Welcome() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartRefreshTrigger, setCartRefreshTrigger] = useState(0);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const closeCart = () => setIsCartOpen(false);

    const handleCartUpdated = () => {
        setCartRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="bg-[#0A0A0B] text-[#e0e2e8] min-h-screen selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden">
            <Head title="ZE-Commerce - Technical Commerce Architecture">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <style>{`
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .glow-blue {
                        box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
                    }
                    .radial-gradient-glow {
                        background: radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 60%);
                    }
                    .font-space {
                        font-family: 'Space Grotesk', sans-serif;
                    }
                    .font-inter {
                        font-family: 'Inter', sans-serif;
                    }
                `}</style>
            </Head>

            <ZeNavbar toggleCart={toggleCart} />

            <main>
                <ZeHero />
                <ZeServiceCards setCartUpdated={handleCartUpdated} />
            </main>

            <ZeCartSidebar
                isOpen={isCartOpen}
                closeCart={closeCart}
                refreshTrigger={cartRefreshTrigger}
            />

            <ZeFooter />
        </div>
    );
}
