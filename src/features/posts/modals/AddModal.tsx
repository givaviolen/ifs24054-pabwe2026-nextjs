"use client";

import React, { useState, useRef } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { asyncCreatePost } from "../states/action";
import { IconPhoto, IconX } from "@tabler/icons-react";

export interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddModal({ isOpen, onClose }: AddModalProps) {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    const success = await dispatch(asyncCreatePost(description, coverFile || undefined));
    setIsSubmitting(false);

    if (success) {
      setDescription("");
      handleRemoveCover();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-slate-900 rounded-none shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="font-semibold text-slate-50 text-lg">Buat Postingan Baru</h3>
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
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Apa yang sedang Anda pikirkan?"
              className="w-full p-3 border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {coverPreview ? (
            <div className="relative rounded-none overflow-hidden border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400 max-h-56">
              <img
                src={coverPreview}
                alt="Pratinjau cover"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveCover}
                aria-label="Hapus gambar"
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-sm transition"
                title="Hapus gambar"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              {/* v8 ignore next 4 */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border-b-2 border-transparent focus:border-indigo-500 bg-slate-800 text-white placeholder-slate-400 rounded-none text-xs font-medium text-slate-300 hover:bg-slate-700 transition"
              >
                <IconPhoto className="w-4 h-4 text-indigo-400" />
                <span>Tambah Foto Cover</span>
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

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
              {isSubmitting ? "Mempublikasikan..." : "Publikasikan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
