import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiEditAlt, BiChevronLeft, BiCrown, BiTrashAlt } from 'react-icons/bi';
import { MdVerified, MdOutlineShoppingBag } from 'react-icons/md';
import { FaOpencart, FaStar, FaHeart, FaRegHeart, FaFacebookMessenger } from 'react-icons/fa';


import { FiActivity, FiMaximize2, FiShield, FiTarget, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ConfirmationModal, SuccessModal } from '../../Components/Modals';
import ProductForm from '../ProductForm/ProductForm';
const ProductDetail = ({ product: propProduct, onBack, setProducts, products, userRole = 'seller' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [localProduct, setLocalProduct] = useState(propProduct || null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBuySuccess, setShowBuySuccess] = useState(false); 
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!propProduct) {
            const allProducts = products || JSON.parse(localStorage.getItem('cachedProductsData') || '[]');
            const found = allProducts.find(p => String(p.Product_ID) === String(id) || String(p.id) === String(id));
            setLocalProduct(found);
        }
    }, [id, propProduct, products]);

    // Role-based Back Navigation
    const handleBackAction = () => {
        if (onBack) {
            onBack();
        } else {
            // if seller move to profile, if customer move to home
            if (userRole === 'seller') {
                navigate('/SellerProfile');
            } else {
                navigate('/'); 
            }
        }
    };

    if (!localProduct) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;

    const retailPrice = Number(localProduct.Retail_Price || localProduct.Price_PKR || 0);
    const discountPrice = Number(localProduct.Discount_Price_PKR) || Math.round(retailPrice * 0.85);

    return (
        <div className="min-h-screen bg-white text-slate-900 relative">

            {/* --- LIVE SALES POPUP --- */}
<motion.div 
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 20, opacity: 1 }}
    transition={{ delay: 2, duration: 0.5 }}
    className="fixed bottom-28 left-4 z-[40] bg-white/90 backdrop-blur-xl border border-slate-100 p-4 rounded-3xl shadow-2xl flex items-center gap-4 max-w-[280px]"
>
    <div className="relative">
        <img src={localProduct.Image_URL || localProduct.image} className="w-12 h-12 rounded-xl object-cover" alt="mini" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
    </div>
    <div>
        <p className="text-[10px] font-bold text-slate-500 leading-none mb-1">Recent Activity</p>
        <p className="text-xs font-black text-slate-900 leading-tight">Someone from Karachi just ordered this!</p>
    </div>
</motion.div>
            
            {/* --- SELLER ONLY: FULL SCREEN EDITOR --- */}
            {userRole === 'seller' && isFormOpen && (
                <div className="fixed inset-0 z-[1000] bg-white animate-in fade-in zoom-in duration-300 overflow-y-auto">
                    <div className="max-w-4xl mx-auto p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black italic uppercase text-slate-900">Inventory Master</h2>
                            <button onClick={() => setIsFormOpen(false)} className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors">CLOSE EDITOR</button>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                             <ProductForm productToEdit={localProduct} onClose={() => setIsFormOpen(false)} setProducts={setProducts} products={products} />
                        </div>
                    </div>
                </div>
            )}

            {/* --- MAIN PAGE CONTENT --- */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                
                {/* LEFT: Image Section */}
<div className="lg:w-[55%] bg-[#F3F3F3] flex items-center justify-center p-10 lg:sticky lg:top-0 lg:h-screen overflow-hidden">
    {/* FIXED BACK BUTTON */}
    <button onClick={handleBackAction} className="absolute top-8 left-8 p-3 bg-white rounded-full shadow-xl z-20 hover:scale-110 transition-transform">
        <BiChevronLeft size={30} />
    </button>
    
    {/* Image BLOCK */}
    <div className="relative group overflow-hidden rounded-[3rem]">
        <motion.img 
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={localProduct.Image_URL || localProduct.image} 
            alt="Product" 
            className="max-h-[80vh] w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]"
        />
        
        {/* Floating Badge on Image */}
        <div className="absolute bottom-10 right-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Design</p>
            <p className="text-sm font-bold text-slate-900 italic">SoleMate Exclusive</p>
        </div>
    </div>
</div>

                {/* RIGHT: Detail Section */}
                <div className="lg:w-[45%] p-8 lg:p-20 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                            <MdVerified size={18} /> Verified Premium Listing
                        </div>

                        <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
                            {localProduct.title || localProduct.Brand}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-yellow-400"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Global Top Seller</span>
                        </div>

                        <div className="mb-12">
                            <span className="text-gray-400 line-through text-2xl font-medium block">PKR {retailPrice}</span>
                            <span className="text-7xl font-black tracking-tighter text-slate-900">PKR {discountPrice}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-12 border-y border-slate-100 py-8">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Fabric & Feel</p>
                                <p className="font-bold">{localProduct.Material || 'Premium Blend'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Availability</p>
                                <p className={`font-bold ${localProduct.In_Stock === 'Yes' ? 'text-green-600' : 'text-red-500'}`}>
                                    {localProduct.In_Stock === 'Yes' ? 'Fast Shipping' : 'Out of Stock'}
                                </p>
                            </div>
                        </div>

                        {/* ---  SHIPPING & TRUST SECTION --- */}
<div className="space-y-6 mb-10 bg-slate-50 p-6 rounded-3xl border border-slate-100">
    {/* Delivery Estimator */}
    <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-teal-600">
            <FiZap size={24} />
        </div>
        <div>
            <p className="text-[10px] font-black uppercase text-slate-400">Express Delivery</p>
            <p className="text-sm font-bold">Estimated Arrival: <span className="text-teal-600">3-5 Business Days</span></p>
        </div>
    </div>

    {/* Dynamic Stock Bar (Urgency) */}
    <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase">
            <span className="text-red-500 animate-pulse">Low Stock Warning</span>
            <span>Only 4 units left</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '25%' }}
                className="h-full bg-red-500"
            />
        </div>
    </div>

    {/* Safety Trust Badges */}
    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 transition-all">
            <FiShield size={20} />
            <span className="text-[8px] font-bold uppercase">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 transition-all">
            <FiTarget size={20} />
            <span className="text-[8px] font-bold uppercase">Tracked</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 transition-all">
            <FiActivity size={20} />
            <span className="text-[8px] font-bold uppercase">Quality</span>
        </div>
    </div>
</div>

{/* --- PRODUCT SPECIFICATIONS (Accordions) --- */}
<div className="mb-10 border-t border-slate-100">
    <details className="group py-4 border-b border-slate-100 cursor-pointer">
        <summary className="flex justify-between items-center list-none font-black uppercase text-xs tracking-widest">
            Product Specifications <FiMaximize2 className="group-open:rotate-45 transition-transform" />
        </summary>
        <div className="mt-4 text-sm text-slate-500 leading-relaxed grid grid-cols-2 gap-4">
            <p>• Weight: 0.5kg</p>
            <p>• Origin: Imported</p>
            <p>• Material: {localProduct.Material || 'Synthetic'}</p>
            <p>• Warranty: 1 Year</p>
        </div>
    </details>

    <details className="group py-4 border-b border-slate-100 cursor-pointer">
        <summary className="flex justify-between items-center list-none font-black uppercase text-xs tracking-widest">
            Delivery & Returns <FiMaximize2 className="group-open:rotate-45 transition-transform" />
        </summary>
        <div className="mt-4 text-sm text-slate-500 leading-relaxed">
            Standard 30-day return policy applies. Free shipping on orders over PKR 5000.
        </div>
    </details>
</div>
<div className="grid grid-cols-3 gap-4 mb-10">
    <div className="text-center p-4 bg-slate-50 rounded-3xl border border-slate-100">
        <FiShield className="mx-auto mb-2 text-teal-600" />
        <p className="text-[8px] font-black uppercase tracking-tighter">Lifetime Warranty</p>
    </div>
    <div className="text-center p-4 bg-slate-50 rounded-3xl border border-slate-100">
        <FiZap className="mx-auto mb-2 text-orange-500" />
        <p className="text-[8px] font-black uppercase tracking-tighter">Eco-Friendly</p>
    </div>
    <div className="text-center p-4 bg-slate-50 rounded-3xl border border-slate-100">
        <FiTarget className="mx-auto mb-2 text-blue-600" />
        <p className="text-[8px] font-black uppercase tracking-tighter">Precision Fit</p>
    </div>
</div>
{/* ---ATTRACTIVE FEATURE GRID --- */}
<div className="grid grid-cols-2 gap-4 mb-10">
    <motion.div 
        whileHover={{ y: -5 }}
        className="p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 blur-3xl group-hover:bg-teal-500/40 transition-all" />
        <BiCrown className="text-teal-400 mb-3" size={30} />
        <h4 className="text-sm font-black uppercase">Elite Edition</h4>
        <p className="text-[10px] text-slate-400">Handcrafted premium quality.</p>
    </motion.div>

    <motion.div 
        whileHover={{ y: -5 }}
        className="p-6 rounded-[2rem] bg-teal-50 border border-teal-100 relative overflow-hidden group"
    >
        <div className="absolute -bottom-4 -right-4 text-teal-200/50 rotate-12">
            <MdVerified size={80} />
        </div>
        <h4 className="text-sm font-black uppercase text-teal-900">Authentic</h4>
        <p className="text-[10px] text-teal-700">100% Original Guarantee.</p>
    </motion.div>
</div>

                        {/* CUSTOMER ACTIONS (common shopping buttons) */}
                        <div className="flex gap-4 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-teal-500/40">
                            <button 
                                onClick={() => setShowBuySuccess(true)}
                                className="flex-[4] bg-black text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                            >
                                <FaOpencart size={28} /> ADD TO BAG
                            </button>
                            <button 
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`flex-1 flex items-center justify-center rounded-2xl border-2 transition-all ${isFavorite ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'text-slate-300 border-slate-200'}`}
                            >
                                {isFavorite ? <FaHeart size={28} /> : <FaRegHeart size={28} />}
                            </button>
                        </div>

                        <button className="w-full py-4 border-2 border-slate-900 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all">
                            <FaFacebookMessenger /> Chat with Seller
                        </button>
                    </div>
                </div>
            </div>

            {/* --- SELLER DOCK (just Seller see) --- */}
            {userRole === 'seller' && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] animate-in slide-in-from-bottom-10 duration-500">
                    <div className="bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] px-8 py-4 rounded-full flex items-center gap-8 group">
                        <div className="flex items-center gap-3 border-r border-slate-200 pr-8">
                            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                <BiCrown size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Management</p>
                                <p className="text-sm font-black text-slate-900">Seller Mode</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setIsFormOpen(true)}
                                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-teal-600 transition-all shadow-md active:scale-95"
                            >
                                <BiEditAlt size={20} /> Modify
                            </button>
                            <button 
                                onClick={() => setShowDeleteModal(true)}
                                className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                            >
                                <BiTrashAlt size={20} /> Remove Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            {showBuySuccess && <SuccessModal onClose={() => setShowBuySuccess(false)} />}
            {showDeleteModal && (
                <ConfirmationModal 
                    title="Purge Product?" 
                    message="Are you sure you want to permanently remove this item from your inventory?"
                    onConfirm={() => { setShowDeleteModal(false); navigate('/SellerProfile'); }}
                    onCancel={() => setShowDeleteModal(false)}
                    type="delete"
                />
            )}
        </div>
    );
};

export default ProductDetail;