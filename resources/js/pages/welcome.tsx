import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ZeHero from '@/components/ZeHero';
import ZeServiceCards from '@/components/ZeServiceCards';
import ZeCartSidebar from '@/components/ZeCartSidebar';
import LandingLayout from '@/layouts/LandingLayout';

export default function Welcome() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartRefreshTrigger, setCartRefreshTrigger] = useState(0);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const closeCart = () => setIsCartOpen(false);

    const handleCartUpdated = () => {
        setCartRefreshTrigger(prev => prev + 1);
    };

    return (
        <LandingLayout toggleCart={toggleCart} showFooter>
            <Head title="ZE-Commerce - Technical Commerce Architecture" />

            <ZeHero />
            <ZeServiceCards setCartUpdated={handleCartUpdated} />

            <ZeCartSidebar
                isOpen={isCartOpen}
                closeCart={closeCart}
                refreshTrigger={cartRefreshTrigger}
            />
        </LandingLayout>
    );
}
