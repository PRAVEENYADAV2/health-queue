"use client";

import { useQueue } from "../context/QueueContext";

export default function QueuePage() {
  const { getSortedQueue, patients } = useQueue();
  const sortedQueue = getSortedQueue();
  
  const currentPatient = sortedQueue[0];
  const upcomingPatients = sortedQueue.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-900 font-outfit">Live Patient Queue</h1>
        <p className="mt-2 text-slate-600">Real-time status of the Digital Triage System.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Now Serving */}
        <div className="lg:col-span-5">
           <div className="sticky top-24">
              <div className="medical-gradient rounded-[3rem] p-12 text-white shadow-2xl shadow-sky-200">
                 <div className="flex items-center gap-2 mb-8 uppercase tracking-[0.2em] text-[10px] font-black opacity-80">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    Now Serving
                 </div>
                 
                 {currentPatient ? (
                   <>
                    <h2 className="text-8xl font-black font-outfit tracking-tighter mb-4">{currentPatient.id}</h2>
                    <div className="h-px w-full bg-white/20 mb-8" />
                    <div className="space-y-4">
                       <div>
                          <p className="text-xs uppercase font-bold opacity-60">Patient Name</p>
                          <p className="text-2xl font-bold truncate">{currentPatient.name}</p>
                       </div>
                       <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs uppercase font-bold opacity-60">Status</p>
                            <p className="text-lg font-medium opacity-90">In Consultation</p>
                          </div>
                          <div className="bg-white/20 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-sm">
                             PRIORITY: {currentPatient.severity.label}
                          </div>
                       </div>
                    </div>
                   </>
                 ) : (
                   <div className="py-20 text-center">
                      <p className="text-2xl font-bold opacity-70 italic">All caught up!</p>
                      <p className="text-sm opacity-50 mt-2">New tokens will appear here.</p>
                   </div>
                 )}
              </div>
              
              <div className="mt-8 glass-card rounded-3xl p-8 border border-slate-100">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                    Wait Times
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2 py-1 rounded-full uppercase">Updated 1m ago</span>
                 </h3>
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Very Serious</span>
                       <span className="font-bold text-red-500">&lt; 5 mins</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Medium Severity</span>
                       <span className="font-bold text-amber-500">15 - 20 mins</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Daily Check</span>
                       <span className="font-bold text-green-500">45 - 60 mins</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Upcoming */}
        <div className="lg:col-span-7">
           <h3 className="text-2xl font-bold text-slate-800 mb-8 font-outfit">Upcoming Queue</h3>
           <div className="space-y-4">
              {upcomingPatients.length > 0 ? upcomingPatients.map((patient, index) => (
                <div key={patient.id} className="glass-card rounded-3xl p-6 border border-slate-100 flex items-center justify-between hover:shadow-lg transition-all group">
                   <div className="flex items-center gap-6">
                      <div className="text-3xl font-black text-slate-300 group-hover:text-sky-200 transition-colors">#{index + 1}</div>
                      <div>
                         <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-slate-900 font-outfit tracking-tight">{patient.id}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            <span className="text-sm font-medium text-slate-500">{patient.age}Y • {patient.name}</span>
                         </div>
                         <p className="text-xs text-slate-400 mt-1">{patient.condition}</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                       <div 
                         className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                         style={{ backgroundColor: `${patient.severity.color}15`, color: patient.severity.color }}
                       >
                         {patient.severity.label}
                       </div>
                       <div className="text-[10px] font-bold text-slate-400">
                          Est. wait: {patient.severity.waitTime}
                       </div>
                   </div>
                </div>
              )) : (
                <div className="glass-card rounded-[2.5rem] p-12 text-center border-dashed border-2 border-slate-200 bg-transparent">
                   <p className="text-slate-400 font-medium">No other patients waiting.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
