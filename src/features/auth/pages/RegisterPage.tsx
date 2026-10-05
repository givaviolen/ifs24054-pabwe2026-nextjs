"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInput } from "@/hooks/useInput";
import { useAppDispatch } from "@/hooks/redux";
import { asyncRegister } from "../states/action";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setIsLoading(true);
    const success = await dispatch(asyncRegister({ name, email, password }));
    setIsLoading(false);

    if (success) {
      router.push("/auth/login");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-100 mb-6 text-center">Buat Akun Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1" htmlFor="register-name-input">
            Nama Lengkap
          </label>
          <input
            id="register-name-input"
            type="text"
            required
            value={name}
            onChange={onNameChange}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-none border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1" htmlFor="register-email-input">
            Alamat Email
          </label>
          <input
            id="register-email-input"
            type="email"
            required
            value={email}
            onChange={onEmailChange}
            placeholder="nama@delcom.org"
            className="w-full px-4 py-2.5 rounded-none border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1" htmlFor="register-password-input">
            Kata Sandi
          </label>
          <input
            id="register-password-input"
            type="password"
            required
            value={password}
            onChange={onPasswordChange}
            placeholder="Minimal 6 karakter"
            className="w-full px-4 py-2.5 rounded-none border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
          />
        </div>

        <button
          id="register-submit-button"
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-none shadow-md transition duration-150 ease-in-out text-sm cursor-pointer"
        >
          {isLoading ? "Sedang Mendaftar..." : "Daftar"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-300">
        Sudah memiliki akun?{" "}
        <Link href="/auth/login" className="font-semibold text-indigo-400 hover:text-blue-500">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}
