import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { FiArrowUp, FiArrowDown, FiStar, FiEdit3, FiArrowLeft } from 'react-icons/fi';

const API_URL = 'https://fakestoreapi.com/products';

const ShopAllFootwear = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('default');
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const res = await axios.get(API_URL);
                setProducts(res.data);
            } catch (error) {
                console.error("Seller Portal Error:", error);
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchSellerData();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const processedProducts = useMemo(() => {
        let result = [...products];
        if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
        
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);
        else if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        else if (sortOrder === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate); // Rating Sort Restored
        
        return result;
    }, [products, selectedCategory, sortOrder]);

    if (loading) return <div className="p-20 text-center font-black text-emerald-600 italic">LOADING INVENTORY HUB...</div>;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* === HEADER === */}
            <header className="bg-white border-b border-slate-200 py-8 px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {/* Back Button specifically for this page flow */}
                        <button 
                            onClick={() => navigate(-1)} 
                            className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                        >
                            <FiArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter uppercase text-slate-800">Inventory Hub</h1>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Solemate Seller Dashboard</p>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Stock</p>
                            <p className="text-xl font-black text-slate-800">{processedProducts.length} Items</p>
                        </div>
                        <div className="text-right border-l pl-10">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Market Worth</p>
                            <p className="text-xl font-black text-slate-800">${(processedProducts.reduce((acc, p) => acc + p.price, 0)).toFixed(0)}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* === FILTER & RATING SORT BAR === */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-4">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${selectedCategory === cat ? 'bg-black text-white shadow-lg shadow-black/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button onClick={() => setSortOrder('low')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${sortOrder === 'low' ? 'bg-white shadow text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
                            <FiArrowDown /> Price: Low
                        </button>
                        <button onClick={() => setSortOrder('high')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${sortOrder === 'high' ? 'bg-white shadow text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
                            <FiArrowUp /> Price: High
                        </button>
                        {/* Rating Button Restored */}
                        <button onClick={() => setSortOrder('rating')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${sortOrder === 'rating' ? 'bg-white shadow text-orange-500' : 'text-slate-400 hover:text-slate-600'}`}>
                            <FiStar /> Top Rated
                        </button>
                    </div>
                </div>
            </div>

            {/* === PRODUCT GRID === */}
            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {processedProducts.map((product) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={product.id} 
                                onClick={() => navigate(`/SellerProfile/${product.id}`)}
                                className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                            >
                                <div className="aspect-square mb-4 bg-slate-50 rounded-[1.5rem] p-8 relative overflow-hidden">
                                    <img src={product.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt="" />
                                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[9px] font-black italic">REF: {product.id}</div>
                                </div>
                                <h3 className="font-bold text-sm line-clamp-2 h-10 mb-4 text-slate-700 leading-snug">{product.title}</h3>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                    <span className="font-black text-slate-900 text-lg">${product.price}</span>
                                    <div className="flex items-center gap-1 text-orange-500 font-bold text-xs bg-orange-50 px-2 py-1 rounded-md">
                                        <FiStar fill="currentColor" size={10}/> {product.rating.rate}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/SellerProfile/${product.id}`);
                                    }}
                                    className="w-full mt-4 py-3.5 rounded-xl bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <FiEdit3 size={12}/> Modify Listing
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default ShopAllFootwear;