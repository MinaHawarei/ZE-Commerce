import React from 'react';
import { Head } from '@inertiajs/react';
import ZeNavbar from '@/components/ZeNavbar';
import ZeFooter from '@/components/ZeFooter';

type LandingLayoutProps = {
    children: React.ReactNode;
    toggleCart?: () => void;
    showFooter?: boolean;
    className?: string;
};

export default function LandingLayout({
    children,
    toggleCart = () => {},
    showFooter = true,
    className = '',
}: LandingLayoutProps) {
    return (
        <div
            className={[
                'bg-[#0A0A0B] text-[#e0e2e8] min-h-screen selection:bg-[#0066ff] selection:text-white dark font-inter overflow-x-hidden',
                className,
            ].join(' ')}
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap"
                    rel="stylesheet"
                />
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

            <main>{children}</main>

            {showFooter ? <ZeFooter /> : null}
        </div>
    );
}
