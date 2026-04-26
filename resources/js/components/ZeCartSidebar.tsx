import React, { useEffect, useState } from 'react';
import { ShoppingCart, Trash2, X } from 'lucide-react';

interface CartItem {
    id: number;
    price_at_purchase: string;
    service: {
        id: number;
        title: string;
        category: string;
    };
}

interface CartData {
    cart: {
        id: number;
        status: string;
    };
    items: CartItem[];
    totals: {
        grand_total: number;
        items_count: number;
    };
}

export default function ZeCartSidebar({ isOpen, closeCart, refreshTrigger }: { isOpen: boolean, closeCart: () => void, refreshTrigger: number }) {
    const [cartData, setCartData] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await fetch('/cart', {
                headers: { 'Accept': 'application/json' }
            });
            const data = await res.json();
            if (data.cart) {
                setCartData(data);
            }
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen || refreshTrigger > 0) {
            fetchCart();
        }
    }, [isOpen, refreshTrigger]);

    const removeItem = async (itemId: number) => {
        try {
            const res = await fetch(`/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });
            if (res.ok) {
                fetchCart(); // refresh after remove
            }
        } catch (error) {
            console.error("Failed to remove item", error);
        }
    };

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-[55]" onClick={closeCart}></div>}
            <aside className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-[#1A1A1C]/90 backdrop-blur-[20px] border-l border-white/10 shadow-2xl shadow-blue-900/20 z-[60] flex flex-col py-8 px-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#0066ff] flex items-center justify-center font-bold text-white">
                            <ShoppingCart aria-hidden="true" className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white font-inter">Cart Details</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-400">{cartData?.totals.items_count || 0} Items Reserved</div>
                        </div>
                    </div>
                    <button onClick={closeCart} className="text-slate-400 hover:text-white">
                        <X aria-hidden="true" className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {loading && !cartData ? (
                        <div className="text-slate-400 text-center py-8">Loading cart...</div>
                    ) : cartData?.items.length === 0 ? (
                        <div className="text-slate-500 text-center py-8">Your cart is empty.</div>
                    ) : (
                        cartData?.items.map(item => (
                            <div key={item.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-[#0066ff] uppercase tracking-widest mb-1">{item.service.category}</div>
                                    <div className="text-white font-medium text-sm mb-1">{item.service.title}</div>
                                    <div className="text-slate-300 font-bold">${item.price_at_purchase}</div>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-red-400 transition-colors p-2">
                                    <Trash2 aria-hidden="true" className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-400 uppercase tracking-widest text-xs">Grand Total</span>
                        <span className="text-white font-bold text-xl">${cartData?.totals.grand_total || 0}</span>
                    </div>
                    <button 
                        onClick={() => window.location.href = '/checkout'}
                        className="w-full bg-[#0066ff] text-white py-4 font-space font-bold text-xs uppercase tracking-widest rounded transition-all glow-blue hover:bg-blue-600 active:scale-95 disabled:bg-slate-700 disabled:shadow-none" 
                        disabled={!cartData || cartData.items.length === 0}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </aside>
        </>
    );
}
