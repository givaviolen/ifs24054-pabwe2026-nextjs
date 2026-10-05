"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { asyncChangeCover } from "../states/action";
import { IconPhoto, IconX } from "@tabler/icons-react";

export interface ChangeCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number | string;
  currentCover?: string | null;
}

export default function ChangeCoverModal({
  isOpen,
  onClose,
  postId,
  currentCover,
}: ChangeCoverModalProps) {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentCover || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentCover || null);
    setSelectedFile(null);
  }, [currentCover, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    const success = await dispatch(asyncChangeCover(postId, selectedFile));
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-slate-900 rounded-none shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="font-semibold text-slate-50 text-lg">Ubah Cover Postingan</h3>
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
          <div className="border border-dashed border-slate-600 rounded-none p-4 text-center">
            {preview ? (
              <div className="relative rounded-none overflow-hidden max-h-60 mb-3">
                <img src={preview} alt="Pratinjau cover" className="w-full h-48 object-cover" />
              </div>
            ) : (
              <div className="py-8 text-slate-300">
                <IconPhoto className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Belum ada gambar yang dipilih</p>
              </div>
            )}

            {/* v8 ignore next 4 */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-gray-200 text-slate-200 text-xs font-semibold rounded-none transition"
            >
              <IconPhoto className="w-4 h-4 text-indigo-400" />
              <span>{preview ? "Pilih Gambar Lain" : "Pilih Gambar Cover"}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
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
              disabled={isSubmitting || !selectedFile}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-none shadow-lg shadow-indigo-500/10 transition"
            >
              {isSubmitting ? "Mengunggah..." : "Simpan Cover"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
