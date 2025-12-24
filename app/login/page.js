"use client";

import { useState } from "react";
import { useQueue } from "../context/QueueContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useQueue();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate delay
    setTimeout(() => {
      if (login(email, password)) {
        router.push("/doctor");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl medical-gradient text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-outfit">Staff Login</h2>
        <p className="mt-2 text-sm text-slate-600">
          Access the Doctor & Admin Dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card px-4 py-8 shadow sm:rounded-3xl sm:px-10 border border-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 shadow-sm transition-all focus:border-sky-500 focus:ring-sky-500 sm:text-sm border"
                  placeholder="doctor@hospital.gov.in"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border-slate-200 bg-white/50 px-4 py-3 text-slate-900 shadow-sm transition-all focus:border-sky-500 focus:ring-sky-500 sm:text-sm border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 uppercase tracking-wide font-bold text-[10px]">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-sky-600 hover:text-sky-500 text-xs text-[10px] uppercase">Forgot password?</a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-2xl medical-gradient px-4 py-4 text-sm font-bold text-white shadow-lg shadow-sky-100 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Login to Workspace"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500 text-xs">New staff member?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/signup"
                className="flex w-full justify-center rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-white hover:border-sky-100"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-slate-500">
          This is a secure system. All actions are logged under HIPPA/ABDM standards.
        </p>
      </div>
    </div>
  );
}
