import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiLock, FiMail, FiUser, FiArrowRight, FiCheckCircle, 
    FiAlertCircle, FiShield, FiEye, FiEyeOff, FiChevronDown, 
    FiAperture, FiMaximize, FiActivity, FiX, FiCpu
} from 'react-icons/fi';

const Signup = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [status, setStatus] = useState('idle');
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // --- NEW STATES FOR BIOMETRIC MODALS ---
    const [biometricModal, setBiometricModal] = useState({ show: false, type: "" });

    // --- REGEX & LOGIC ---
    const authSchema = z.object({
        username: !isLogin 
            ? z.string().min(3, "Full name must be at least 3 alphabets").regex(/^[a-zA-Z\s]+$/, "Numbers/Symbols are not allowed in names")
            : z.string().optional(),
        email: z.string().min(1, "Email is required").email("Invalid email format").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"),
        password: z.string().min(8, "Security key must be 8+ characters").regex(/[A-Z]/, "Include at least 1 uppercase letter").regex(/[0-9]/, "Include at least 1 number"),
        role: z.enum(["employee", "seller", "customer"])
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(authSchema),
        mode: "all" 
    });

    const onAuthSubmit = (data) => {
        setStatus('loading');
        setTimeout(() => {
            if (!isLogin) {
                localStorage.setItem("registeredUser", JSON.stringify(data));
                setShowSuccess(true);
                setTimeout(() => { 
                    setShowSuccess(false);
                    setIsLogin(true); 
                    setStatus('idle'); 
                    reset(); 
                }, 2500);
            } else {
                const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
                if (savedUser?.email === data.email && savedUser?.password === data.password) {
                    localStorage.setItem("curr_session", "active");
                    setShowSuccess(true);
                    setTimeout(() => { 
                        window.location.href = `/${data.role}`; 
                    }, 2500);
                } else {
                    setStatus('error');
                    setTimeout(() => setStatus('idle'), 3000);
                }
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f3f7f6] overflow-x-hidden">
            
            {/* 1. IDENTITY VERIFIED OVERLAY */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#004d3a] flex flex-col items-center justify-center text-white">
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
                            <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-[#95ff00] shadow-[0_0_20px_#95ff00] z-20" />
                            <FiShield className="text-9xl text-[#95ff00] opacity-20" />
                            <FiCheckCircle className="absolute inset-0 m-auto text-7xl text-[#95ff00]" />
                        </motion.div>
                        <motion.h2 className="text-3xl font-black mt-8 tracking-tighter uppercase">Identity Verified</motion.h2>
                        <p className="text-[#95ff00]/60 text-[10px] font-black uppercase tracking-[0.5em] mt-2 italic">Establishing Secure Uplink...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. BIOMETRIC MODAL (FINGERPRINT/RETINA) */}
            <AnimatePresence>
                {biometricModal.show && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBiometricModal({ show: false, type: "" })} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-[#0a0e14] border border-white/5 rounded-[40px] p-10 text-center shadow-[0_0_100px_rgba(0,128,96,0.2)]">
                            <button onClick={() => setBiometricModal({ show: false, type: "" })} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><FiX size={20}/></button>
                            
                            <div className="relative inline-block mb-8">
                                <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse"></div>
                                <div className="relative h-28 w-28 rounded-full border border-green-500/20 flex items-center justify-center bg-black">
                                    {biometricModal.type === "finger" ? <FiAperture className="text-5xl text-green-500 animate-spin-slow" /> : <FiMaximize className="text-5xl text-green-500 animate-pulse" />}
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
                                {biometricModal.type === "finger" ? "Biometric Hash" : "Retina Mapping"}
                            </h3>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-loose mb-8">
                                System awaiting physical authentication protocol. Place your sensor input to proceed.
                            </p>

                            <div className="flex flex-col gap-3">
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1/2 h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                </div>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em]">Hardware Syncing...</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-center p-6 py-16">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl w-full grid md:grid-cols-10 bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,128,96,0.1)] overflow-hidden border border-slate-100">
                    
                    {/* LEFT SECTION */}
                    <div className="md:col-span-4 bg-[#004d3a] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#008060] rounded-full -mr-32 -mt-32 blur-[80px] opacity-40"></div>
                        <div className="relative z-10">
                            <FiActivity className="text-3xl text-[#95ff00] mb-6 animate-pulse" />
                            <h2 className="text-6xl font-black leading-[0.8] tracking-tighter mb-4">CORE<br/><span className="text-[#95ff00]">VAULT</span></h2>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Biometric Identity Node</p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {/* --- FINGERPRINT BLOCK --- */}
                            <div 
                                onClick={() => setBiometricModal({ show: true, type: "finger" })}
                                className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all hover:scale-[1.02]"
                            >
                                <div className="h-12 w-12 bg-[#95ff00] rounded-2xl flex items-center justify-center">
                                    <FiAperture className="text-[#004d3a] text-2xl animate-spin-slow" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-[#95ff00]">Fingerprint Hash</p>
                                    <p className="text-[10px] opacity-40 italic">Ready to scan...</p>
                                </div>
                            </div>

                            {/* --- RETINA BLOCK --- */}
                            <div 
                                onClick={() => setBiometricModal({ show: true, type: "retina" })}
                                className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all hover:scale-[1.02]"
                            >
                                <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <FiMaximize className="text-white text-2xl" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-white/80 tracking-widest">Retina Scan</p>
                                    <p className="text-[10px] opacity-40 italic">Offline...</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex items-center gap-2 opacity-20">
                            <FiCpu /> <span className="text-[8px] font-black tracking-widest uppercase">Kernel 5.1-SoleMate</span>
                        </div>
                    </div>

                    {/* RIGHT SECTION (FORM) */}
                    <div className="md:col-span-6 p-12 md:p-20 bg-white">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-4xl font-black text-[#004d3a] tracking-tight italic">{isLogin ? 'Access.' : 'Identity.'}</h3>
                            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                                <button onClick={() => {setIsLogin(false); reset();}} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${!isLogin ? 'bg-[#008060] text-white shadow-lg' : 'text-slate-400'}`}>Sign Up</button>
                                <button onClick={() => {setIsLogin(true); reset();}} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${isLogin ? 'bg-[#008060] text-white shadow-lg' : 'text-slate-400'}`}>Login</button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onAuthSubmit)} className="space-y-7">
                            {!isLogin && (
                                <div className="group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">User Tag</label>
                                    <div className={`flex items-center border-b-2 py-2 transition-all ${errors.username ? 'border-red-500' : 'border-slate-100 focus-within:border-[#008060]'}`}>
                                        <FiUser className="text-xl text-slate-300" />
                                        <input {...register("username")} className="bg-transparent w-full px-4 outline-none font-bold text-[#004d3a] placeholder:text-slate-200" placeholder="Agent Name" />
                                    </div>
                                    {errors.username && <p className="text-[10px] text-red-500 font-bold mt-2 italic">{errors.username.message}</p>}
                                </div>
                            )}

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Neural Mail</label>
                                <div className={`flex items-center border-b-2 py-2 transition-all ${errors.email ? 'border-red-500' : 'border-slate-100 focus-within:border-[#008060]'}`}>
                                    <FiMail className="text-xl text-slate-300" />
                                    <input {...register("email")} className="bg-transparent w-full px-4 outline-none font-bold text-[#004d3a] placeholder:text-slate-200" placeholder="protocol@solemate.sh" />
                                </div>
                                {errors.email && <p className="text-[10px] text-red-500 font-bold mt-2 italic">{errors.email.message}</p>}
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Security Hash</label>
                                <div className={`flex items-center border-b-2 py-2 transition-all ${errors.password ? 'border-red-500' : 'border-slate-100 focus-within:border-[#008060]'}`}>
                                    <FiLock className="text-xl text-slate-300" />
                                    <input {...register("password")} type={showPassword ? "text" : "password"} className="bg-transparent w-full px-4 outline-none font-bold text-[#004d3a] placeholder:text-slate-200" placeholder="••••••••" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-300 hover:text-[#008060]">{showPassword ? <FiEyeOff /> : <FiEye />}</button>
                                </div>
                                {errors.password && <p className="text-[10px] text-red-500 font-bold mt-2 italic">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Clearance Level</label>
                                <div className="relative">
                                    <select {...register("role")} className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-xs font-black text-[#004d3a] appearance-none cursor-pointer outline-none uppercase tracking-widest">
                                        <option value="customer">Customer Access</option>
                                        <option value="seller">Verified Merchant</option>
                                        <option value="employee">System Staff</option>
                                    </select>
                                    <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#008060]" />
                                </div>
                            </div>

                            <button type="submit" disabled={status === 'loading'} className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${status === 'error' ? 'bg-red-600' : 'bg-[#008060] hover:bg-[#005c46] shadow-xl shadow-[#008060]/20'} text-white`}>
                                {status === 'idle' && <>{isLogin ? 'Grant Access' : 'Create Identity'} <FiArrowRight /></>}
                                {status === 'loading' && <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />}
                                {status === 'success' && <><FiCheckCircle /> Handshake Clear</>}
                                {status === 'error' && <><FiAlertCircle /> Breach Detected</>}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;