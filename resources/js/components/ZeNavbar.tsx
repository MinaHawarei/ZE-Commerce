import React, { useState, useCallback } from 'react';
import { Link, usePage } from '@inertiajs/react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthUser {
    id: number;
    name: string;
    role: 'admin' | 'user';
}

interface PageProps {
    auth: {
        user: AuthUser | null;
    };
    [key: string]: unknown;
}

interface NavLink {
    label: string;
    href: string;
}

interface ZeNavbarProps {
    toggleCart: () => void;
    cartCount?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
    { label: 'All Solutions', href: '/services' },
    { label: 'Infrastructure', href: '/services?category=Web' },
    { label: 'Intelligence', href: '/services?category=Apps' },
    { label: 'Enterprise', href: '/services?category=ERP' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavLinkItem({ href, label, currentUrl }: NavLink & { currentUrl: string }) {
    // Exact match for base path, ignoring query params for category links
    const isActive =
        href === currentUrl ||
        (href.includes('?') && currentUrl.startsWith(href.split('?')[0]) && currentUrl.includes(href.split('?')[1])) ||
        (!href.includes('?') && currentUrl === href);

    return (
        <Link
            href={href}
            className={[
                'font-medium tracking-tight transition-all duration-200 active:scale-95 px-1 py-1',
                'font-[family-name:var(--font-nav)]',
                isActive
                    ? 'text-[#0066FF] border-b-2 border-[#0066FF]'
                    : 'text-slate-400 hover:text-white border-b-2 border-transparent hover:border-white/20',
            ].join(' ')}
        >
            {label}
        </Link>
    );
}

function MobileMenu({
    isOpen,
    currentUrl,
    auth,
    onClose,
}: {
    isOpen: boolean;
    currentUrl: string;
    auth: PageProps['auth'];
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 md:hidden" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Drawer */}
            <nav
                className="absolute top-[72px] left-0 right-0 bg-[#0A0A0B]/95 border-b border-white/10 px-6 py-4 flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
            >
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className={[
                            'py-3 px-2 font-medium tracking-tight border-b border-white/5 last:border-0 transition-colors',
                            currentUrl === link.href
                                ? 'text-[#0066FF]'
                                : 'text-slate-400 hover:text-white',
                        ].join(' ')}
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="pt-3 mt-2 border-t border-white/10">
                    {auth.user ? (
                        <Link
                            href={auth.user.role === 'admin' ? '/admin' : '/dashboard'}
                            onClick={onClose}
                            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-[#0066FF]">account_circle</span>
                            <span className="text-sm font-medium">{auth.user.name}</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            onClick={onClose}
                            className="inline-flex text-xs font-bold tracking-widest text-[#0066FF] border border-[#0066FF] px-4 py-2 rounded-full hover:bg-[#0066FF] hover:text-white transition-colors"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ZeNavbar({ toggleCart, cartCount = 0 }: ZeNavbarProps) {
    const { auth, ziggy } = usePage<PageProps & { ziggy?: { location: string } }>().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    // Derive current path from Inertia's ziggy location or fallback to window
    const currentUrl =
        ziggy?.location
            ? new URL(ziggy.location).pathname + new URL(ziggy.location).search
            : typeof window !== 'undefined'
            ? window.location.pathname + window.location.search
            : '/';

    const handleMobileToggle = useCallback(() => {
        setMobileOpen((prev) => !prev);
    }, []);

    const dashboardHref = auth.user?.role === 'admin' ? '/admin' : '/dashboard';

    return (
        <>
            <header className="fixed top-0 w-full z-50 max-w-[1440px] left-1/2 -translate-x-1/2">
                <div className="flex justify-between items-center px-6 md:px-8 py-4 bg-[#0A0A0B]/80 backdrop-blur-[20px] border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tighter text-slate-100 uppercase shrink-0"
                    >
                        ZE-Commerce
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {NAV_LINKS.map((link) => (
                            <NavLinkItem key={link.href} {...link} currentUrl={currentUrl} />
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Cart Button */}
                        <button
                            type="button"
                            onClick={toggleCart}
                            aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
                            className="relative text-slate-400 hover:text-[#0066FF] transition-colors cursor-pointer"
                        >
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-0.5 bg-[#0066FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </button>

                        {/* Auth */}
                        {auth.user ? (
                            <Link
                                href={dashboardHref}
                                aria-label="Go to dashboard"
                                className="material-symbols-outlined text-[#0066FF] hover:text-white transition-colors"
                            >
                                account_circle
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:inline-flex text-xs font-bold tracking-widest text-[#0066FF] border border-[#0066FF] px-4 py-2 rounded-full hover:bg-[#0066FF] hover:text-white transition-colors"
                            >
                                LOGIN
                            </Link>
                        )}

                        {/* Mobile Hamburger */}
                        <button
                            type="button"
                            onClick={handleMobileToggle}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            className="md:hidden flex flex-col gap-1.5 text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <span
                                className={`block w-5 h-0.5 bg-current transition-all duration-300 origin-center ${
                                    mobileOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                                    mobileOpen ? 'opacity-0 scale-x-0' : ''
                                }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-current transition-all duration-300 origin-center ${
                                    mobileOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu — rendered outside header to avoid clipping */}
            <MobileMenu
                isOpen={mobileOpen}
                currentUrl={currentUrl}
                auth={auth}
                onClose={() => setMobileOpen(false)}
            />
        </>
    );
}
