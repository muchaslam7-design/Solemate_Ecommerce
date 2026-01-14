import React, { useEffect } from 'react';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa'; 
import {  MdWarning, MdClose } from 'react-icons/md';
import { BiShieldQuarter } from 'react-icons/bi';



 {/* 1. SUCCESS/ALERT MODAL*/}

export const SuccessModal = ({ title, message, onClose, type = 'success' }) => {
    const isSuccess = type === 'success';

    // Auto-dismiss logic: Closes the modal automatically after 3.5 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 3500); 
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 overflow-hidden">
            {/* High-fidelity Backdrop with Blur Effect */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />
            
            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-hidden transform animate-luxury-pop">
                
                {/* Close Button (Icon Only) */}
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
                    <MdClose size={24} />
                </button>

                <div className="p-10 text-center">
                    {/* Animated Icon Container with Ping Effect */}
                    <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative`}>
                        <div className={`absolute inset-0 rounded-full opacity-20 animate-ping ${isSuccess ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl ${isSuccess ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
                            {isSuccess ? <FaCheckCircle size={40} /> : <MdWarning size={40} />}
                        </div>
                    </div>

                    {/* Content Section */}
                    <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter uppercase italic">
                        {title || (isSuccess ? 'Success!' : 'Notice')}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        {message}
                    </p>
                    
                    {/* Manual Dismiss Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm tracking-widest uppercase hover:bg-black transition-all active:scale-95"
                    >
                        Dismiss
                    </button>
                </div>

                {/* Animated Progress Indicator (Visual countdown for auto-close) */}
                <div className={`h-1.5 w-full ${isSuccess ? 'bg-emerald-500' : 'bg-orange-500'} animate-progress-linear`} />
            </div>
        </div>
    );
};


 {/* 2. CONFIRMATION (SECURITY) MODAL*/}

export const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText, type = 'delete' }) => {
    const isDelete = type === 'delete';

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            {/* Darkened Backdrop for focus */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" onClick={onCancel} />
            
            <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-luxury overflow-hidden animate-luxury-pop">
                
                <div className="flex flex-col md:flex-row">
                    {/* Visual Sidebar - Displays Contextual Security Icon */}
                    <div className={`md:w-1/3 p-8 flex flex-col items-center justify-center text-white ${isDelete ? 'bg-red-500' : 'bg-slate-900'}`}>
                        <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md mb-4">
                            {isDelete ? <FaTrashAlt size={32} /> : <BiShieldQuarter size={32} />}
                        </div>
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60 text-center">Security Check</p>
                    </div>

                    {/* Interactive Content Area */}
                    <div className="md:w-2/3 p-10">
                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                            {title || 'Are you sure?'}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                            {message}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={onConfirm}
                                className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all active:scale-95 shadow-lg ${
                                    isDelete 
                                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-200' 
                                    : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'
                                }`}
                            >
                                {confirmText || 'Confirm Action'}
                            </button>
                            <button
                                onClick={onCancel}
                                className="w-full py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] tracking-widest uppercase hover:bg-slate-100 transition-all"
                            >
                                Cancel & Return
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

