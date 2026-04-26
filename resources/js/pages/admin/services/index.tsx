import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { toast } from 'sonner';

interface Service {
    id: number;
    title: string;
    description: string;
    category: 'ERP' | 'Web' | 'Apps';
    price: string;
    features_list: string[] | null;
}

export default function ServicesIndex({ services }: { services: Service[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const { data, setData, post, patch, delete: destroy, processing, reset, errors } = useForm({
        title: '',
        description: '',
        category: 'Web',
        price: '',
        features_list: [] as string[],
        newFeature: '' // Temporary field for UI
    });

    const openModal = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setData({
                title: service.title,
                description: service.description,
                category: service.category,
                price: service.price,
                features_list: service.features_list || [],
                newFeature: ''
            });
        } else {
            setEditingService(null);
            reset();
            setData('features_list', []);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const addFeature = () => {
        if (data.newFeature.trim()) {
            setData('features_list', [...data.features_list, data.newFeature.trim()]);
            setData('newFeature', '');
        }
    };

    const removeFeature = (idx: number) => {
        setData('features_list', data.features_list.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Strip out the temporary 'newFeature' before sending
        const payload = {
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            features_list: data.features_list
        };

        if (editingService) {
            router.patch(`/admin/services/${editingService.id}`, payload, {
                onSuccess: () => {
                    toast.success('Service updated successfully');
                    closeModal();
                }
            });
        } else {
            router.post('/admin/services', payload, {
                onSuccess: () => {
                    toast.success('Service created successfully');
                    closeModal();
                }
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            destroy(`/admin/services/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Service deleted successfully.')
            });
        }
    };

    return (
        <AdminLayout title="Service Catalog">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0A0A0B] border border-white/10 rounded-xl w-full max-w-2xl shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white font-inter">{editingService ? 'Edit Service' : 'Create Service'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-medium">Title</label>
                                    <input 
                                        type="text" 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#0066ff] outline-none"
                                        required 
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-medium">Category</label>
                                    <select 
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value as any)}
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#0066ff] outline-none"
                                    >
                                        <option value="Web">Web Development</option>
                                        <option value="ERP">Enterprise Systems</option>
                                        <option value="Apps">Mobile Apps</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium">Description</label>
                                <textarea 
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#0066ff] outline-none h-24 resize-none"
                                    required 
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-medium">Price ($)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#0066ff] outline-none font-space"
                                        required 
                                    />
                                    {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                                </div>
                            </div>

                            <div className="space-y-2 border-t border-white/10 pt-4 mt-2">
                                <label className="text-xs uppercase tracking-widest text-slate-400 font-medium">Features</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={data.newFeature}
                                        onChange={e => setData('newFeature', e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#0066ff] outline-none"
                                        placeholder="Add a feature and press Enter or Click Add"
                                    />
                                    <button type="button" onClick={addFeature} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {data.features_list.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 bg-[#0066ff]/20 text-[#b3c5ff] px-3 py-1 rounded-full text-xs">
                                            {feature}
                                            <span onClick={() => removeFeature(idx)} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-400">close</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-6">
                                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing} className="px-6 py-2 rounded-lg bg-[#0066ff] text-white font-bold text-sm tracking-wide shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50">
                                    {editingService ? 'Save Changes' : 'Create Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white font-inter mb-1">Service Catalog</h1>
                    <p className="text-slate-400 text-sm">Manage tech services available for deployment.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-[#0066ff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[0_0_15px_rgba(0,102,255,0.3)] active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    New Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="glass-panel p-6 rounded-xl group hover:border-[#0066ff]/30 transition-all flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-[#0066ff]/10 rounded-lg text-[#0066ff]">
                                <span className="material-symbols-outlined">
                                    {service.category === 'ERP' ? 'memory' : service.category === 'Web' ? 'language' : 'smartphone'}
                                </span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(service)} className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-slate-300 hover:text-[#0066ff] hover:bg-[#0066ff]/10 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                                <button onClick={() => handleDelete(service.id)} className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <div className="text-xs font-bold uppercase tracking-widest text-[#0066ff] mb-1">{service.category}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-sm text-slate-400 mb-6 line-clamp-2">{service.description}</p>
                            
                            {service.features_list && service.features_list.length > 0 && (
                                <div className="space-y-2 mb-6">
                                    {service.features_list.slice(0, 3).map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                            <span className="material-symbols-outlined text-[14px] text-green-400 mt-0.5">check</span>
                                            <span className="truncate">{feature}</span>
                                        </div>
                                    ))}
                                    {service.features_list.length > 3 && (
                                        <div className="text-xs text-slate-500 italic">+ {service.features_list.length - 3} more features</div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="pt-4 border-t border-white/5 mt-auto">
                            <div className="font-space text-2xl font-bold text-white">${Number(service.price).toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
