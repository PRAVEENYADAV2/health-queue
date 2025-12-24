"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", hospitalId: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/login");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">Staff Registration</h2>
        <p className="mt-2 text-sm text-slate-600">Apply for access to the Digital Triage System</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card px-4 py-8 shadow sm:rounded-3xl sm:px-10 border border-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Full Name</label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 shadow-sm transition-all focus:border-sky-500 focus:ring-sky-500 sm:text-sm border"
                placeholder="Dr. Aryan Sharma"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700">Hospital ID / License No.</label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 shadow-sm transition-all focus:border-sky-500 focus:ring-sky-500 sm:text-sm border"
                placeholder="HOSP-4029-X"
                value={formData.hospitalId}
                onChange={e => setFormData({...formData, hospitalId: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Official Email</label>
              <input
                required
                type="email"
                className="mt-1 block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 shadow-sm transition-all focus:border-sky-500 focus:ring-sky-500 sm:text-sm border"
                placeholder="name@hospital.gov.in"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-2xl medical-gradient px-4 py-4 text-sm font-bold text-white shadow-lg shadow-sky-100 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Processing Application..." : "Request Credentials"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm font-semibold text-sky-600 hover:text-sky-500">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
