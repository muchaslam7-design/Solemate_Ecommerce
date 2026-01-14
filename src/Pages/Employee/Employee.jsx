import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiMessageSquare, FiTrendingUp, FiPackage, FiBarChart2, FiActivity, FiShield, FiSend, FiRefreshCw, FiZap, FiDownload, FiClock, FiCheckCircle, FiX } from 'react-icons/fi';
import { BiTargetLock, BiChip, BiSupport } from 'react-icons/bi';

const EmployeeConsole = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isRetraining, setIsRetraining] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        // Check that session token is here?
        const token = localStorage.getItem("userToken");
        if (!token) {
            // If not return back
            window.location.href = "/signup"; 
        }
    }, []);

    // Live Clock
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleRetrain = () => {
        setIsRetraining(true);
        setTimeout(() => setIsRetraining(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-4 md:p-10 font-sans relative">
            
            {/* --- TOP HEADER --- */}
            <div className="max-w-[1750px] mx-auto flex flex-wrap justify-between items-end mb-10 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-teal-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 italic">
                        <BiTargetLock className="animate-pulse" size={18} /> System v5.5 Premium
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                        Command <span className="text-teal-500 text-6xl">.</span> Center
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 justify-end">
                            <FiClock /> Server Time
                        </p>
                        <p className="text-xl font-black italic text-slate-800">{time}</p>
                    </div>
                    <button 
                        onClick={() => setIsExporting(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase shadow-sm hover:shadow-md transition-all italic"
                    >
                        <FiDownload className="text-teal-500" /> Export PDF
                    </button>
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <FiShield size={20} />
                    </div>
                </div>
            </div>

            {/* --- MAIN GRID --- */}
            <div className="max-w-[1750px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN --- */}
                <div className="md:col-span-3 space-y-8">
                    
                    {/* 1. Prominent AI Retraining Module (Enhanced Visibility) */}
                    <div className={`bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-500 relative overflow-hidden shadow-2xl ${isRetraining ? 'border-teal-500 shadow-teal-500/20' : 'border-dashed border-slate-300 shadow-slate-200/50'}`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FiZap size={60} className={isRetraining ? "text-teal-500 animate-bounce" : "text-slate-400"} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 italic flex items-center gap-2">
                            <BiChip size={18} className="text-teal-500" /> Neural Trainer
                        </h4>
                        <p className="text-[11px] font-bold italic mb-6 text-slate-500 leading-relaxed">Prominent: Sync live market flux to recalibrate accuracy drift.</p>
                        <button 
                            onClick={handleRetrain}
                            disabled={isRetraining}
                            className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-3 relative z-10 ${isRetraining ? 'bg-teal-500 text-white cursor-wait' : 'bg-black text-white hover:bg-teal-600'}`}
                        >
                            <FiRefreshCw className={isRetraining ? "animate-spin" : ""} />
                            {isRetraining ? "OPTIMIZING..." : "Initiate Retrain"}
                        </button>
                    </div>

                    {/* 2. Sentiment Matrix */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/30">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center gap-2 italic">
                            <FiMessageSquare className="text-teal-500" /> Customer Pulse
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100 italic">
                                <p className="text-[11px] font-black">"Premium texture, love it!"</p>
                                <p className="text-[8px] font-bold text-green-700 uppercase mt-2 tracking-widest">92% Positive Tone</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 italic opacity-80">
                                <p className="text-[11px] font-black italic">"Delivery was bit slow"</p>
                                <p className="text-[8px] font-bold text-red-700 uppercase mt-2 italic tracking-widest">Operations Review</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. Inventory Stats */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-6 flex items-center gap-2 italic">
                            <FiBarChart2 /> Inventory Matrix
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center italic">
                                <p className="text-2xl font-black">1.2k</p>
                                <p className="text-[8px] uppercase opacity-50 font-bold italic">Transit</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center italic">
                                <p className="text-2xl font-black text-teal-400">420</p>
                                <p className="text-[8px] uppercase opacity-50 font-bold italic underline">Stock</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CENTER COLUMN --- */}
                <div className="md:col-span-6 space-y-8">
                    {/* Main Prediction Card */}
                    <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl border border-white relative overflow-hidden group">
                        <FiCpu className="text-slate-50 absolute -top-6 -right-6 opacity-60" size={160} />
                        <div className="relative z-10">
                            <h3 className="text-xs font-black uppercase text-teal-600 mb-10  tracking-widest i">Neural Intelligence</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-8xl font-black italic tracking-tighter mb-2 leading-none">98.4%</h4>
                                    <p className="text-sm font-bold text-slate-400 uppercase mb-8 tracking-widest italic">Accuracy</p>
                                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-2xl italic border border-white/10">
                                        <p className="text-teal-400 text-[10px] font-black uppercase mb-2">AI Alert</p>
                                        <p className="text-sm font-bold  leading-relaxed italic">"Stock for 'Aero-Max' sneakers is depleting 3x faster than predicted."</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-[2.5rem] p-8 flex items-end gap-3 min-h-[280px] border border-slate-100 shadow-inner italic">
                                    {[30, 60, 45, 90, 65, 80, 100].map((h, i) => (
                                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-teal-500 rounded-full opacity-90" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Hub Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex items-center justify-between shadow-sm italic">
                             <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1 italic">Live Requests</p>
                                 <p className="text-2xl font-black  tracking-tighter italic">14.2k / hr</p>
                             </div>
                             <FiActivity className="text-teal-500 animate-pulse" size={32} />
                         </div>
                         <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex items-center justify-between shadow-sm italic">
                             <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1 italic">Hub Status</p>
                                 <p className="text-2xl font-black  text-teal-600 italic tracking-tighter">94% Capacity</p>
                             </div>
                             <FiZap className="text-yellow-500" size={32} />
                         </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="md:col-span-3 space-y-8">
                    {/* Performance Pulse */}
                    <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-teal-500/30">
                        <FiTrendingUp size={36} className="mb-6" />
                        <h4 className="text-3xl font-black tracking-tighter leading-none mb-4 italic text-white ">Efficiency <br/> +12.4%</h4>
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="bg-white h-full shadow-[0_0_10px_white]" />
                        </div>
                    </div>

                    {/* Dispatch Queue */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50 italic font-black">
                        <h3 className="text-xs font-black uppercase text-slate-400 mb-8 flex items-center gap-2 italic">
                             <FiPackage className="text-teal-500" /> Dispatch List
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-teal-500 hover:text-white transition-all cursor-pointer group italic">
                                    <p className="text-[10px] font-black italic">#88{5+i} PREMIUM JACKET</p>
                                    <div className="w-2 h-2 rounded-full bg-teal-500 group-hover:bg-white animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- EXPORT PDF MODAL --- */}
            <AnimatePresence>
                {isExporting && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-3xl text-center relative overflow-hidden"
                        >
                            <button onClick={() => setIsExporting(false)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors"><FiX size={20}/></button>
                            <div className="w-20 h-20 bg-teal-50 text-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-100">
                                <FiDownload size={32} className="animate-bounce" />
                            </div>
                            <h3 className="text-2xl font-black italic tracking-tight mb-2 uppercase">Generating Assets</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8  italic">Sole-AI Report Engine v5.5</p>
                            
                            <div className="space-y-3 mb-10">
                                <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest text-slate-400"><span>Progress</span><span>85%</span></div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-teal-500 rounded-full shadow-[0_0_10px_teal]" />
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setIsExporting(false)}
                                className="w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-teal-600 transition-all  italic"
                            >
                                Finalizing Download
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- FLOATING CHAT --- */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-20 right-0 w-80 bg-white rounded-[2rem] shadow-3xl border border-slate-100 overflow-hidden"
                        >
                            <div className="bg-slate-900 p-6 text-white italic">
                                <p className="text-[10px] font-black uppercase opacity-40 mb-1 italic">Neural Assistant</p>
                                <h5 className="font-black italic uppercase text-lg ">Sole AI Chat</h5>
                            </div>
                            <div className="p-6 h-64 bg-slate-50 overflow-y-auto italic font-black text-[11px] space-y-4">
                                <div className="bg-teal-100 p-4 rounded-2xl rounded-bl-none italic text-teal-900 shadow-sm underline underline-offset-4 decoration-teal-300">
                                    Neural model is active. Global accuracy at 98.4%. How can I help?
                                </div>
                            </div>
                            <div className="p-4 bg-white flex items-center gap-2 border-t border-slate-50 italic">
                                <input type="text" placeholder="Type a command..." className="flex-1 text-[11px] font-bold  bg-slate-100 border-none rounded-xl p-3 outline-none italic" />
                                <button className="p-3 bg-teal-500 text-white rounded-xl shadow-lg shadow-teal-500/20  italic"><FiSend size={18}/></button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button 
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="w-16 h-16 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all group"
                >
                    <BiSupport size={30} className="group-hover:rotate-12 transition-transform italic" />
                </button>
            </div>
        </div>
    );
};

export default EmployeeConsole;