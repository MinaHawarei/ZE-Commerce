import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import ZeHero from '@/components/ZeHero';
import ZeServiceCards from '@/components/ZeServiceCards';
import LandingLayout from '@/layouts/LandingLayout';

export default function Welcome() {
    return (
        <LandingLayout showFooter>
            <Head title="ZE-Commerce - Technical Commerce Architecture" />

            <ZeHero />
            <ZeServiceCards />
        </LandingLayout>
    );
}
