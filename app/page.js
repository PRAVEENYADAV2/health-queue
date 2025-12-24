"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 sm:pt-24 sm:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-sky-600 sm:text-lg">Digital Triage System</span>
                <span className="mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-outfit text-slate-900">
                  Prioritizing Care, <br />
                  <span className="text-sky-600">Not Just Position.</span>
                </span>
              </h1>
              <p className="mt-6 text-xl text-slate-600">
                Move beyond First-In-First-Out. Our smart queue management system uses clinical triage to ensure urgent cases are treated first in government hospitals.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link href="/book" className="flex items-center justify-center rounded-2xl bg-sky-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-sky-200 transition-all hover:bg-sky-700 hover:-translate-y-1 active:scale-95">
                  Book Appointment
                </Link>
                <Link href="/queue" className="flex items-center justify-center rounded-2xl border-2 border-slate-100 bg-slate-50 px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-white hover:border-sky-100 active:scale-95">
                  View Live Queue
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                      <div className="h-full w-full bg-sky-100" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">
                  <span className="font-bold text-slate-900">500+</span> patients safely triaged today
                </p>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden glass-card p-4 border border-slate-100">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="font-bold text-lg text-slate-800">Queue Insights</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse-slow">Live Status</span>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
                        <div className="h-10 w-10 flex items-center justify-center bg-red-500 text-white rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-red-900">Emergency Case</p>
                          <p className="text-xs text-red-600">Immediate attention assigned</p>
                        </div>
                        <div className="ml-auto text-xs font-bold text-red-700">Priority 1</div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                        <div className="h-10 w-10 flex items-center justify-center bg-amber-500 text-white rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-amber-900">Severe Condition</p>
                          <p className="text-xs text-amber-600">Wait time approx 15m</p>
                        </div>
                        <div className="ml-auto text-xs font-bold text-amber-700">Priority 2</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Clinical Triage</h3>
              <p className="text-slate-600 leading-relaxed">Automatic sorting of patients based on symptoms severity following ABDM standards.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Real-time Tracking</h3>
              <p className="text-slate-600 leading-relaxed">Patients can track their queue position live from their smartphones, reducing physical overcrowding.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Secure & Compliant</h3>
              <p className="text-slate-600 leading-relaxed">Built with HL7 FHIR standards and AES-256 encryption to ensure data privacy and interoperability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
