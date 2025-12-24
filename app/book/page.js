"use client";

import { useState } from "react";
import { useQueue, SEVERITY_LEVELS } from "../context/QueueContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookAppointment() {
  const { addPatient } = useQueue();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
    severityId: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const severity = Object.values(SEVERITY_LEVELS).find(s => s.id === parseInt(formData.severityId));
    
    // Simulate API call
    setTimeout(() => {
      const patient = addPatient({
        name: formData.name,
        age: parseInt(formData.age),
        condition: formData.condition,
        severity: severity
      });
      setToken(patient.id);
      setIsSubmitting(false);
    }, 800);
  };

  if (token) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[2.5rem] p-12 text-center border-2 border-green-100 bg-white/90">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-outfit">Booking Confirmed!</h2>
          <p className="mt-4 text-slate-600 text-lg">Your appointment has been successfully triaged.</p>
          
          <div className="mt-10 mb-10 p-8 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Token Number</p>
             <p className="mt-2 text-6xl font-black text-sky-600 font-outfit tracking-tighter">{token}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-left mb-10">
             <div className="p-4 rounded-2xl bg-white border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Priority Level</p>
                <p className="font-bold text-slate-800">{Object.values(SEVERITY_LEVELS).find(s => s.id === parseInt(formData.severityId))?.label}</p>
             </div>
             <div className="p-4 rounded-2xl bg-white border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Wait Time</p>
                <p className="font-bold text-slate-800">{Object.values(SEVERITY_LEVELS).find(s => s.id === parseInt(formData.severityId))?.waitTime}</p>
             </div>
          </div>
          
          <div className="space-y-4">
            <Link href="/queue" className="block w-full rounded-2xl bg-sky-600 py-4 text-lg font-bold text-white shadow-xl shadow-sky-100 transition-all hover:bg-sky-700">
              Track Live Queue
            </Link>
            <button onClick={() => setToken(null)} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
              Book another appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 font-outfit">Digital Triage Form</h1>
        <p className="mt-4 text-lg text-slate-600">Please provide accurate details for clinical prioritization.</p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border-white bg-white/50">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Full Name</label>
              <input
                required
                type="text"
                className="w-full rounded-2xl border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 border transition-all"
                placeholder="Ex. John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Age</label>
              <input
                required
                type="number"
                className="w-full rounded-2xl border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 border transition-all"
                placeholder="25"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Nature of Complaint</label>
            <textarea
              required
              rows={3}
              className="w-full rounded-2xl border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 border transition-all"
              placeholder="Describe your symptoms (e.g., chest pain, high fever, checkup)..."
              value={formData.condition}
              onChange={e => setFormData({...formData, condition: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Severity Selection (Internal Triage Simulation)</label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Object.values(SEVERITY_LEVELS).map(level => (
                <label key={level.id} className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition-all ${formData.severityId == level.id ? 'border-sky-500 bg-sky-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                  <input
                    required
                    type="radio"
                    name="severity"
                    value={level.id}
                    className="sr-only"
                    onChange={e => setFormData({...formData, severityId: e.target.value})}
                  />
                  <div className="flex items-center gap-2 mb-2">
                     <div className="h-3 w-3 rounded-full" style={{ backgroundColor: level.color }} />
                     <span className="text-sm font-bold text-slate-900">{level.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">Patient needs attention within {level.waitTime}.</p>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
             <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl medical-gradient py-5 text-xl font-bold text-white shadow-2xl shadow-sky-100 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? "Generating Token..." : "Submit for Triage"}
            </button>
            <p className="mt-4 text-center text-xs text-slate-400">
              *Your priority will be reviewed by clinical staff upon arrival.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
