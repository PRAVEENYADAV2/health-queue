"use client";

import { useQueue } from "../context/QueueContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const { currentUser, logout, getSortedQueue, callNextPatient, history } = useQueue();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser) return null;

  const sortedQueue = getSortedQueue();
  const currentPatient = sortedQueue[0];
  const waitingList = sortedQueue.slice(1);

  const handleNext = () => {
    callNextPatient();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mini Top Bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl medical-gradient text-white font-bold text-lg">H</div>
            <div className="h-8 w-px bg-slate-200" />
            <h2 className="font-bold text-slate-800">Doctor's Workspace</h2>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
               <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Department Head</p>
            </div>
            <button 
              onClick={() => { logout(); router.push("/"); }}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            </button>
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-8 grid grid-cols-12 gap-8">
        {/* Left Column: Active Patient */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="glass-card rounded-[2.5rem] overflow-hidden border-white shadow-2xl">
              <div className="p-8 pb-4">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">Active Token</span>
                    <span className="text-xs font-bold text-slate-400">{new Date().toLocaleTimeString()}</span>
                 </div>
                 {currentPatient ? (
                   <>
                    <h1 className="text-7xl font-black text-slate-900 font-outfit tracking-tighter mb-2">{currentPatient.id}</h1>
                    <p className="text-2xl font-bold text-slate-800">{currentPatient.name}</p>
                    <p className="text-slate-500 font-medium">{currentPatient.age} Years • Male</p>
                    
                    <div className="mt-8 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                       <p className="text-xs font-bold text-slate-400 uppercase mb-2">Primary Diagnosis / Complaint</p>
                       <p className="text-slate-800 leading-relaxed font-medium">"{currentPatient.condition}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                       <div className="p-4 rounded-3xl border border-slate-100 bg-white">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Priority Status</p>
                          <p className="font-bold pt-1" style={{ color: currentPatient.severity.color }}>{currentPatient.severity.label}</p>
                       </div>
                       <div className="p-4 rounded-3xl border border-slate-100 bg-white">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Wait Accuracy</p>
                          <p className="font-bold text-green-600 pt-1">98.2%</p>
                       </div>
                    </div>

                    <button 
                      onClick={handleNext}
                      className="w-full mt-8 rounded-3xl medical-gradient p-5 text-xl font-bold text-white shadow-2xl shadow-sky-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Complete & Call Next
                    </button>
                   </>
                 ) : (
                   <div className="py-20 text-center">
                      <div className="mx-auto h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                      </div>
                      <p className="text-xl font-bold text-slate-400">Queue is Empty</p>
                      <p className="text-sm text-slate-400 mt-2">No patients waiting for consultation.</p>
                   </div>
                 )}
              </div>
           </div>

           <div className="glass-card rounded-[2.5rem] p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 font-outfit">Consultation History</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                 {history.map((patient) => (
                   <div key={patient.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div>
                         <p className="font-bold text-slate-800 text-sm">{patient.id} - {patient.name}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{patient.severity.label}</p>
                      </div>
                      <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">DONE</span>
                   </div>
                 ))}
                 {history.length === 0 && <p className="text-center text-sm text-slate-400 italic">No history yet</p>}
              </div>
           </div>
        </div>

        {/* Right Column: Queue Management */}
        <div className="col-span-12 lg:col-span-8">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm min-h-full">
              <div className="flex items-center justify-between mb-8">
                 <div>
                   <h3 className="text-2xl font-bold text-slate-900 font-outfit">Priority Waiting List</h3>
                   <p className="text-slate-500 text-sm">Sorted by medical severity vs arrival time</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></button>
                    <button className="px-4 py-2 font-bold text-sm bg-slate-900 text-white rounded-xl hover:bg-slate-800">Export ABDM Log</button>
                 </div>
              </div>

              <div className="space-y-4">
                 {waitingList.map((patient, index) => (
                   <div key={patient.id} className="flex items-center gap-6 p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group">
                      <div className="text-4xl font-black text-slate-200 group-hover:text-sky-100 transition-colors w-12 tracking-tighter">#{index + 1}</div>
                      
                      <div className="flex-1">
                         <div className="flex items-center gap-3">
                            <h4 className="font-bold text-slate-900">{patient.id} • {patient.name}</h4>
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: patient.severity.color }}>{patient.severity.label}</span>
                         </div>
                         <div className="flex items-center gap-4 mt-1">
                            <p className="text-xs text-slate-400 font-medium">Age: {patient.age}Y • Time: {new Date(patient.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <p className="text-xs text-slate-500 italic max-w-sm truncate">"{patient.condition}"</p>
                         </div>
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button>
                         <button className="h-12 w-24 bg-white border border-slate-200 rounded-2xl font-bold text-xs text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100">Escalate</button>
                      </div>
                   </div>
                 ))}
                 {waitingList.length === 0 && (
                   <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
                      <p className="text-slate-300 font-medium">No other patients in queue.</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
