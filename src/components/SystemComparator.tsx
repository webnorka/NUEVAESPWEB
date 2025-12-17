```javascript
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Power, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";

export function SystemComparator() {
    const [systemState, setSystemState] = useState<"FALLO_SISTÉMICO" | "SISTEMA_OPERATIVO">("FALLO_SISTÉMICO");
    const [isRebooting, setIsRebooting] = useState(false);

    const handleReboot = () => {
        setIsRebooting(true);
        setTimeout(() => {
            setSystemState(prev => prev === "FALLO_SISTÉMICO" ? "SISTEMA_OPERATIVO" : "FALLO_SISTÉMICO");
            setIsRebooting(false);
        }, 2000); // 2s reboot sequence for more impact
    };

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden select-none">
             {/* Tech Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
             <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #09090b 100%) pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                
                {/* Header / Diagnostic Log */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <div className={`w - 2 h - 2 rounded - full animate - pulse ${ systemState === "FALLO_SISTÉMICO" ? "bg-red-500" : "bg-emerald-500" } `} />
                             <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Monitor de Salud Democrática v2.4</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Diagnóstico del <span className={systemState === "FALLO_SISTÉMICO" ? "text-red-600" : "text-emerald-500"}>Estado</span>
                        </h2>
                    </div>
                    
                    <div className="text-right hidden md:block">
                        <p className="font-mono text-xs text-zinc-500 mb-1">ESTADO_ACTUAL</p>
                        <p className={`font - mono text - xl font - bold ${ systemState === "FALLO_SISTÉMICO" ? "text-red-500" : "text-emerald-500" } `}>
                             {systemState === "FALLO_SISTÉMICO" ? "RÉGIMEN_PARTIDISTA" : "DEMOCRACIA_FORMAL"}
                        </p>
                    </div>
                </div>

                {/* Main Interface */}
                <div className="relative bg-zinc-900/50 border border-white/10 rounded-sm p-2">
                    
                    {/* Screen Glitch Overlay during Reboot */}
                    <AnimatePresence>
                        {isRebooting && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-black flex items-center justify-center flex-col"
                            >
                                <RefreshCw className="w-12 h-12 text-white animate-spin mb-4" />
                                <p className="font-mono text-white text-sm animate-pulse">REINICIANDO EL ESTADO...</p>
                                <div className="w-64 h-1 bg-zinc-800 mt-4 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-white" 
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid lg:grid-cols-3 gap-1 lg:gap-1 bg-black/50 p-6 lg:p-12 relative overflow-hidden min-h-[500px]">
                        
                        {/* Schematic View */}
                        <div className="lg:col-span-2 relative flex flex-col justify-center items-center">
                            
                            {/* REGIME SCHEMATIC (The Bug) */}
                            {systemState === "FALLO_SISTÉMICO" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative w-full max-w-lg"
                                >
                                    <div className="absolute -top-12 left-0 font-mono text-red-500 text-xs bg-red-950/30 px-2 py-1 border border-red-500/30">
                                        ERROR CRÍTICO: CONSTITUCIÓN_78
                                    </div>
                                    
                                    {/* Visual Representation of Fusion */}
                                    <div className="relative aspect-square border-2 border-dashed border-red-900/50 rounded-full flex items-center justify-center p-12">
                                        <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-20 bg-[conic-gradient(from_0deg,transparent_0_340deg,#dc2626_360deg)] rounded-full" />
                                        
                                        <div className="relative z-10 text-center">
                                            <div className="flex justify-center -space-x-4 mb-4">
                                                <div className="w-24 h-24 bg-red-900/20 border border-red-500 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                    <span className="font-bold text-red-500 text-xs">EJECUTIVO</span>
                                                </div>
                                                <div className="w-24 h-24 bg-red-900/20 border border-red-500 rounded-full flex items-center justify-center backdrop-blur-sm -mt-12">
                                                    <span className="font-bold text-red-500 text-xs text-center leading-tight">PODER<br/>JUDICIAL</span>
                                                </div>
                                                <div className="w-24 h-24 bg-red-900/20 border border-red-500 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                    <span className="font-bold text-red-500 text-xs">LEGISLATIVO</span>
                                                </div>
                                            </div>
                                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-2 animate-bounce" />
                                            <h3 className="text-2xl font-black text-white uppercase">FUSIÓN DE PODERES</h3>
                                            <p className="text-red-400 text-sm mt-2 font-mono">COLAPSO INSTITUCIONAL</p>
                                        </div>

                                        {/* Connection Lines interacting dangerously */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                                            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                                        </svg>
                                    </div>
                                </motion.div>
                            ) : (
                                /* DEMOCRACY SCHEMATIC (The Clean System) */
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative w-full max-w-lg"
                                >
                                    <div className="absolute -top-12 left-0 font-mono text-emerald-500 text-xs bg-emerald-950/30 px-2 py-1 border border-emerald-500/30">
                                        SISTEMA: REPÚBLICA_CONSTITUCIONAL
                                    </div>

                                    {/* Visual Representation of Separation */}
                                    <div className="grid grid-cols-3 gap-4 h-64 items-end pb-8 border-b border-emerald-500/30 relative">
                                        {/* Pillar 1 */}
                                        <div className="h-48 bg-emerald-900/10 border border-emerald-500/50 rounded-t-sm flex flex-col justify-end p-4 relative group">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                            <span className="font-mono text-[10px] text-emerald-500 mb-1">PODER_01</span>
                                            <span className="font-bold text-white text-xs md:text-sm">LEGISLATIVO</span>
                                        </div>
                                        {/* Pillar 2 */}
                                        <div className="h-64 bg-emerald-900/10 border border-emerald-500/50 rounded-t-sm flex flex-col justify-end p-4 relative group">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                            <span className="font-mono text-[10px] text-emerald-500 mb-1">PODER_02</span>
                                            <span className="font-bold text-white text-xs md:text-sm">EJECUTIVO</span>
                                        </div>
                                        {/* Pillar 3 */}
                                        <div className="h-48 bg-emerald-900/10 border border-emerald-500/50 rounded-t-sm flex flex-col justify-end p-4 relative group">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                            <span className="font-mono text-[10px] text-emerald-500 mb-1">PODER_03</span>
                                            <span className="font-bold text-white text-xs md:text-sm">JUDICIAL</span>
                                        </div>
                                        
                                        {/* Independence arrows */}
                                        <div className="absolute top-1/2 left-0 w-full flex justify-between px-12 pointer-events-none opacity-30">
                                            <ArrowRight className="text-emerald-500" />
                                            <ArrowRight className="text-emerald-500 rotate-180" />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 text-center">
                                         <h3 className="text-2xl font-black text-white uppercase tracking-widest flex items-center justify-center gap-2">
                                            <CheckCircle2 className="text-emerald-500" />
                                            Separación Total
                                         </h3>
                                         <p className="text-emerald-400 text-sm mt-2 font-mono">GARANTÍA DE LIBERTAD: 100%</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Control Panel (Right Side) */}
                        <div className="lg:col-span-1 border-l border-white/10 pl-0 lg:pl-12 flex flex-col justify-center">
                            <div className="mb-8">
                                <h4 className="text-xs font-mono text-zinc-500 uppercase mb-4">Informe de Situación</h4>
                                <div className="space-y-4 font-mono text-sm">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-zinc-400">Origen de Poder:</span>
                                        <span className={systemState === "FALLO_SISTÉMICO" ? "text-red-400" : "text-emerald-400"}>
                                            {systemState === "FALLO_SISTÉMICO" ? "CÚPULAS DE PARTIDO" : "DISTRITO UNINOMINAL"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-zinc-400">Control mutuo:</span>
                                        <span className={systemState === "FALLO_SISTÉMICO" ? "text-red-400" : "text-emerald-400"}>
                                            {systemState === "FALLO_SISTÉMICO" ? "INEXISTENTE (Impunidad)" : "ACTIVO (Pesos y Contrapesos)"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-zinc-400">Riesgo Corrupción:</span>
                                        <span className={systemState === "FALLO_SISTÉMICO" ? "text-red-500 font-bold" : "text-emerald-500"}>
                                            {systemState === "FALLO_SISTÉMICO" ? "SISTÉMICA (Alto)" : "BAJO (Controlado)"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button
                                    onClick={handleReboot}
                                    disabled={isRebooting}
                                    className={`w - full group relative overflow - hidden px - 8 py - 6 transition - all duration - 300 ${
    systemState === "FALLO_SISTÉMICO"
        ? "bg-red-600 hover:bg-red-500 text-white"
        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
} `}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        <Power className="w-6 h-6" />
                                        <span className="font-black text-sm md:text-lg tracking-widest uppercase">
                                            {systemState === "FALLO_SISTÉMICO" ? "INICIAR PROCESO CONSTITUYENTE" : "RESTAURAR COPIA DE SEGURIDAD"}
                                        </span>
                                    </div>
                                    
                                    {/* Stripes Background */}
                                    <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
                                </button>
                                
                                <p className="text-center mt-4 text-[10px] text-zinc-600 font-mono uppercase">
                                    {systemState === "FALLO_SISTÉMICO" 
                                        ? "ADVERTENCIA: EL SISTEMA ACTUAL NO GARANTIZA LA LIBERTAD." 
                                        : "SISTEMA ESTABLE. LIBERTAD POLÍTICA GARANTIZADA."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Data Footer */}
                    <div className="bg-black/80 border-t border-white/10 p-2 flex justify-between items-center text-[10px] font-mono text-zinc-600 overflow-hidden">
                        <span>CORRUPCIÓN: {systemState === "FALLO_SISTÉMICO" ? "GENERALIZADA" : "AISLADA"}</span>
                        <span>REPRESENTACIÓN: {systemState === "FALLO_SISTÉMICO" ? "FALSA" : "DIRECTA"}</span>
                        <span className="hidden md:inline">VIGENCIA: {systemState === "FALLO_SISTÉMICO" ? "CADUCADO" : "INDIFINIDA"}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SystemComparator;
