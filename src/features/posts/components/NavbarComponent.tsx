"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSearchQueryActionCreator } from "../states/action";
import { asyncUnsetAuthUser } from "@/features/auth/states/action";
import { showConfirm } from "@/helpers/toolsHelper";
import { IconSearch, IconMenu2, IconLogout } from "@tabler/icons-react";

export interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export default function NavbarComponent({ onToggleMobileSidebar }: NavbarProps) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.authUser);
  const searchQuery = useAppSelector((state) => state.posts.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryActionCreator(e.target.value));
  };

  const handleLogout = async () => {
    const confirmed = await showConfirm(
      "Apakah Anda yakin ingin keluar dari akun ini?",
      "Konfirmasi Logout"
    );
    if (confirmed) {
      dispatch(asyncUnsetAuthUser());
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-700 shadow-lg shadow-indigo-500/10 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-none text-slate-300 hover:bg-slate-700 focus:outline-none"
          aria-label="Buka menu navigasi"
        >
          <IconMenu2 className="w-6 h-6" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-none flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/10">
            P
          </div>
          <span className="font-bold text-slate-50 text-lg hidden sm:inline">Delcom Posts</span>
        </Link>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari postingan atau penulis..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-800 border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="flex items-center gap-2 p-1.5 rounded-none hover:bg-slate-700 transition"
        >
          {authUser?.photo ? (
            <img
              src={authUser.photo}
              alt=""
              aria-hidden="true"
              className="w-8 h-8 rounded-sm object-cover border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400"
            />
          ) : (
            /* v8 ignore start */
            <div className="w-8 h-8 rounded-sm bg-indigo-900 text-indigo-400 flex items-center justify-center font-bold text-sm">
              {authUser?.name ? authUser.name.charAt(0).toUpperCase() : "U"}
            </div>
            /* v8 ignore stop */
          )}
          {/* v8 ignore next 3 */}
          <span className="text-sm font-medium text-slate-200 hidden md:inline truncate max-w-[120px]">
            {authUser?.name || "Pengguna"}
          </span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Keluar"
          className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-900/30 rounded-none transition"
          title="Keluar"
        >
          <IconLogout className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
