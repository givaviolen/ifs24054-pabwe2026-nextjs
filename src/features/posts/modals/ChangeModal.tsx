"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { asyncUpdatePost } from "../states/action";
import { IconX } from "@tabler/icons-react";

export interface ChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number | string;
  initialDescription: string;
}

export default function ChangeModal({
  isOpen,
  onClose,
  postId,
  initialDescription,
}: ChangeModalProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(initialDescription);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    const success = await dispatch(asyncUpdatePost(postId, description));
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-slate-900 rounded-none shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="font-semibold text-slate-50 text-lg">Ubah Postingan</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="p-1 rounded-none text-slate-300 hover:text-gray-900 hover:bg-slate-700 transition"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="edit-desc">
              Deskripsi Postingan
            </label>
            <textarea
              id="edit-desc"
              required
              rows={4}
              value={description}
              /* v8 ignore next */
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 rounded-none transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-none shadow-lg shadow-indigo-500/10 transition"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
