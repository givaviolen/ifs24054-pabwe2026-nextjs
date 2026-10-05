"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authUser, isPreload } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isPreload && authUser) {
      router.replace("/");
    }
  }, [authUser, isPreload, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col justify-center items-center p-4">
      <main className="w-full max-w-md bg-slate-900 rounded-none shadow-xl p-8 border border-slate-800">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-none flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/30 mb-3">
            P
          </div>
          <h1 className="text-2xl font-bold text-slate-50 tracking-tight">Delcom Posts</h1>
          <p className="text-sm text-slate-300 mt-1">Platform Linimasa Mahasiswa PABWE 2026</p>
        </div>
        {children}
      </main>
      <footer className="mt-6 text-xs text-slate-300">
        © 2026 Delcom Open API • ifs24024
      </footer>
    </div>
  );
}
