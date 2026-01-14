import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiCamera, FiArrowRight, FiX, FiLoader, FiTarget, FiActivity, } from 'react-icons/fi';
import ProductDetail from '../ProductDetail/ProductDetail';

const GlobalStorefront = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    const categoryPath = activeCategory === 'All' ? "" : `/category/${activeCategory.toLowerCase()}`;
    fetch(`https://fakestoreapi.com/products${categoryPath}`)
      .then(res => res.json())
      .then(data => {
        setApiProducts(data);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-emerald-500">
      
      {/* 1.HERO: THE NEURAL GRID */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <motion.div animate={{ y: [-20, 20] }} transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
          <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782" className="w-full h-full object-cover opacity-20 scale-105" alt="Hero Background" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 px-6 py-2 border border-emerald-500/30 rounded-full bg-emerald-500/5 backdrop-blur-md flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Quantum Sync Active // 2026</span>
          </motion.div>

          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative">
            <h1 className="text-[14vw] font-black text-white leading-none tracking-tighter uppercase italic select-none">
              Sole<span className="text-emerald-500 inline-block">Mate.</span>
            </h1>
            <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[2px] bg-emerald-500/50 shadow-[0_0_15px_#10b981] z-20 pointer-events-none" />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-slate-400 text-lg font-light tracking-[0.5em] uppercase">
            Footwear Synchronization <span className="text-white font-bold">//</span> Perfect Fit Algorithm
          </motion.p>
        </div>
      </section>

      {/* 2. BIOMETRIC LAB: THE AI HUB */}
      <section className="py-32 px-20 bg-white">
        <div className="bg-[#0f172a] rounded-[4rem] p-1 gap-1 flex flex-col lg:flex-row overflow-hidden border border-slate-800 shadow-2xl">
          <div className="flex-1 p-20 bg-slate-900/50 relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500/10 rounded-xl"><FiActivity className="text-emerald-500 text-3xl animate-pulse" /></div>
                  <h4 className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em]">Module: Neural Sizing v4.2</h4>
                </div>
                <h2 className="text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8">Stop Guessing. <br /> <span className="text-emerald-500 italic">Start Mapping.</span></h2>
                <p className="text-slate-400 text-xl max-w-lg mb-12 leading-relaxed font-light">
                  Our proprietary Biometric AI creates a <span className="text-white font-bold">digital twin</span> of your foot structure.
                </p>
                <button onClick={() => setIsAiModalOpen(true)} className="relative group px-12 py-6 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:pr-16">
                  <span className="relative z-10 flex items-center gap-3">Initialize 3D Biometric Scan <FiArrowRight className="group-hover:translate-x-2 transition-transform" /></span>
                </button>
             </div>
          </div>

          <div className="w-full lg:w-2/5 bg-slate-950 p-12 flex items-center justify-center relative min-h-[500px]">
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[400px] h-[400px] border border-emerald-500/10 rounded-full border-dashed" />
             </div>
             <div className="relative z-10 w-full max-w-[320px]">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center">
                   <FiTarget className="mx-auto text-emerald-500 text-5xl mb-4 animate-pulse" />
                   <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">Visualizing Skeletal Mesh...</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. INVENTORY SECTION */}
      <section className="py-20 px-20 bg-white" id="storefront">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h3 className="text-5xl font-black uppercase italic tracking-tighter">Global <span className="text-slate-300">Showcase.</span></h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['All', "Men's Clothing", 'Jewelery', 'Electronics', "Women's Clothing"].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-black text-white border-black' : 'bg-slate-50 text-slate-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
             <FiLoader className="animate-spin text-emerald-500" size={40} />
             <p className="text-[10px] font-black uppercase tracking-widest">Accessing SoleMate Servers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {apiProducts.map(product => (
              <motion.div layout key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="aspect-square bg-slate-50 rounded-[3.5rem] p-10 relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl border border-slate-100">
                  <img src={product.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                </div>
                <div className="mt-6 flex justify-between items-start px-4">
                  <div className="max-w-[70%]">
                    <h5 className="text-lg font-black uppercase italic tracking-tighter truncate leading-none">{product.title}</h5>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2">{product.category}</p>
                  </div>
                  <p className="text-2xl font-black tracking-tighter">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* AI MODAL */}
      <AnimatePresence>
        {isAiModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-[#020617]/95 backdrop-blur-3xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 w-full max-w-4xl rounded-[4rem] p-1 overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)]">
              <div className="bg-[#020617] rounded-[3.8rem] p-16 relative">
                <button onClick={() => {setIsAiModalOpen(false); setScanStep(0);}} className="absolute top-10 right-10 text-slate-500 hover:text-white border border-slate-800 p-3 rounded-full"><FiX size={24}/></button>
                {scanStep === 0 && (
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                       <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">Biometric <br/> Gateway.</h2>
                       <button onClick={() => {setScanStep(1); setTimeout(()=>setScanStep(2), 3000)}} className="w-full py-6 bg-emerald-500 text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">Start Biometric Sequence</button>
                    </div>
                    <div className="aspect-square bg-slate-800/30 rounded-[3rem] border-4 border-dashed border-slate-800 flex items-center justify-center"><FiCamera size={60} className="text-slate-700" /></div>
                  </div>
                )}
                {scanStep === 1 && <div className="py-20 text-center"><FiCpu size={100} className="text-emerald-500 animate-spin-slow mx-auto" /></div>}
                {scanStep === 2 && <div className="text-center space-y-12 py-10"><h2 className="text-[12rem] font-black text-white tracking-tighter leading-none">10.5</h2><button onClick={() => setIsAiModalOpen(false)} className="w-full max-w-md py-6 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest">Apply To Profile</button></div>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- IMPORTED PRODUCT DETAIL VIEW --- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1500] bg-white overflow-y-auto"
          >
            {/* ProductDetail component */}
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)} 
              isReadOnly={true}
              userRole="customer"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GlobalStorefront;