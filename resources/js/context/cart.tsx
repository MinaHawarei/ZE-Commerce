import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type CartItem = {
    id: number;
    price_at_purchase: string;
    service: {
        id: number;
        title: string;
        category: string;
    };
};

type CartData = {
    cart: { id: number; status: string };
    items: CartItem[];
    totals: { grand_total: number; items_count: number };
};

type AddItemOptions = {
    fromEl?: HTMLElement | null;
    openCart?: boolean;
};

type CartContextValue = {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;

    cartData: CartData | null;
    loading: boolean;
    itemsCount: number;
    refresh: () => Promise<void>;

    addItem: (serviceId: number, options?: AddItemOptions) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;

    cartIconRef: React.RefObject<HTMLElement | null>;
    pulseKey: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

function animateFlyToCart(fromEl: HTMLElement, toEl: HTMLElement) {
    const from = fromEl.getBoundingClientRect();
    const to = toEl.getBoundingClientRect();

    const dot = document.createElement('div');
    dot.setAttribute('aria-hidden', 'true');

    // Starting position — center of the source element
    const startX = from.left + from.width / 2;
    const startY = from.top + from.height / 2;

    dot.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: 22px;
        height: 22px;
        border-radius: 9999px;
        background: radial-gradient(circle at 35% 35%, #60aaff, #0055dd 60%, #003399);
        box-shadow: 0 0 12px 4px rgba(0, 102, 255, 0.5), 0 0 28px 8px rgba(0, 100, 255, 0.25);
        transform: translate(-50%, -50%) scale(0);
        z-index: 9999;
        pointer-events: none;
        will-change: transform, opacity;
    `;

    document.body.appendChild(dot);

    const toX = to.left + to.width / 2;
    const toY = to.top + to.height / 2;

    // Arc peak — slightly above the start point
    const peakX = startX + (toX - startX) * 0.15;
    const peakY = startY - 60;

    // Three-phase animation using a single composite keyframe path
    const dx1 = peakX - startX;
    const dy1 = peakY - startY;
    const dx2 = toX - startX;
    const dy2 = toY - startY;

    dot.animate(
        [
            // Phase 1: appear + float up
            {
                transform: `translate(-50%, -50%) translate(0px, 0px) scale(0)`,
                opacity: 0,
                boxShadow: '0 0 8px 2px rgba(0,102,255,0.3)',
            },
            {
                transform: `translate(-50%, -50%) translate(${dx1}px, ${dy1}px) scale(1)`,
                opacity: 1,
                offset: 0.22,
                boxShadow: '0 0 18px 6px rgba(0,102,255,0.6), 0 0 40px 12px rgba(0,100,255,0.25)',
            },
            // Phase 2: shoot toward cart, shrink slightly
            {
                transform: `translate(-50%, -50%) translate(${dx2}px, ${dy2}px) scale(0.5)`,
                opacity: 0.85,
                offset: 0.88,
                boxShadow: '0 0 10px 3px rgba(0,102,255,0.5)',
            },
            // Phase 3: absorbed into cart icon
            {
                transform: `translate(-50%, -50%) translate(${dx2}px, ${dy2}px) scale(0)`,
                opacity: 0,
                boxShadow: '0 0 0px 0px rgba(0,102,255,0)',
            },
        ],
        {
            duration: 2680,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
        },
    ).onfinish = () => dot.remove();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartData, setCartData] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(false);
    const [pulseKey, setPulseKey] = useState(0);

    const cartIconRef = useRef<HTMLElement | null>(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/cart', { headers: { Accept: 'application/json' } });
            const data = await res.json();
            if (data?.cart) setCartData(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const openCart = useCallback(() => {
        setIsOpen(true);
        void refresh();
    }, [refresh]);

    const closeCart = useCallback(() => setIsOpen(false), []);

    const toggleCart = useCallback(() => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) void refresh();
            return next;
        });
    }, [refresh]);

    const addItem = useCallback(
        async (serviceId: number, options?: AddItemOptions) => {
            const fromEl = options?.fromEl ?? null;
            const shouldOpen = options?.openCart ?? true;

            await fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({ service_id: serviceId }),
            });

            if (fromEl && cartIconRef.current) {
                animateFlyToCart(fromEl, cartIconRef.current);
            }

            setPulseKey((k) => k + 1);
            await refresh();

            if (shouldOpen) {
                setIsOpen(true);
            }
        },
        [refresh],
    );

    const removeItem = useCallback(
        async (itemId: number) => {
            await fetch(`/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
            });
            await refresh();
        },
        [refresh],
    );

    const value = useMemo<CartContextValue>(
        () => ({
            isOpen,
            openCart,
            closeCart,
            toggleCart,
            cartData,
            loading,
            itemsCount: cartData?.totals.items_count ?? 0,
            refresh,
            addItem,
            removeItem,
            cartIconRef,
            pulseKey,
        }),
        [addItem, cartData, closeCart, isOpen, loading, openCart, pulseKey, refresh, removeItem, toggleCart],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

