"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { uploadImageAction, saveProductAction } from "@/app/admin/products/actions";
import type { Product } from "@/components/public/ProductCard";

interface ProductFormProps {
  product?: Product;
}

interface FormState {
  name: string;
  description: string;
  price: string;
  category: "keychain" | "canvas";
  is_featured: boolean;
  in_stock: boolean;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    category: product?.category ?? "keychain",
    is_featured: product?.is_featured ?? false,
    in_stock: product?.in_stock ?? true,
  });

  const [existingImages, setExistingImages] = useState<string[]>(product?.images ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleField = (
    field: keyof FormState,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((i) => i !== url));
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of newFiles) {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadImageAction(fd);
      if (result.error) throw new Error(`Upload failed: ${result.error}`);
      urls.push(result.url!);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const uploadedUrls = await uploadImages();
      const allImages = [...existingImages, ...uploadedUrls];

      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: parseFloat(form.price),
        category: form.category,
        images: allImages,
        is_featured: form.is_featured,
        in_stock: form.in_stock,
      };

      const result = await saveProductAction(payload, product?.id);
      if (result.error) throw new Error(result.error);

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Product Name *
        </label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => handleField("name", e.target.value)}
          placeholder="e.g. Rose Gold Resin Keychain"
          className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-white font-body text-sm text-text-deep placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          placeholder="Describe the product, materials, dimensions…"
          className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-white font-body text-sm text-text-deep placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors resize-none"
        />
      </div>

      {/* Price + Category row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            Price (Rs.) *
          </label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => handleField("price", e.target.value)}
            placeholder="1500"
            className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-white font-body text-sm text-text-deep placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            Category *
          </label>
          <select
            value={form.category}
            onChange={(e) => handleField("category", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-white font-body text-sm text-text-deep focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors"
          >
            <option value="keychain">Keychain & Charm</option>
            <option value="canvas">Canvas Painting</option>
          </select>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-8">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            role="checkbox"
            aria-checked={form.is_featured}
            tabIndex={0}
            onClick={() => handleField("is_featured", !form.is_featured)}
            onKeyDown={(e) => e.key === " " && handleField("is_featured", !form.is_featured)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              form.is_featured ? "bg-rose-gold" : "bg-blush-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                form.is_featured ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
          <span className="font-body text-sm text-text-deep">Featured</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            role="checkbox"
            aria-checked={form.in_stock}
            tabIndex={0}
            onClick={() => handleField("in_stock", !form.in_stock)}
            onKeyDown={(e) => e.key === " " && handleField("in_stock", !form.in_stock)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              form.in_stock ? "bg-green-500" : "bg-blush-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                form.in_stock ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
          <span className="font-body text-sm text-text-deep">In Stock</span>
        </label>
      </div>

      {/* Images */}
      <div>
        <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Product Images
        </label>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {existingImages.map((url) => (
              <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden bg-blush-100 group">
                <Image src={url} alt="" fill className="object-cover" sizes="96px" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  className="absolute inset-0 bg-text-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New file previews */}
        {newPreviews.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {newPreviews.map((url, i) => (
              <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden bg-blush-100 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNewFile(i)}
                  className="absolute inset-0 bg-text-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload zone */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-3 w-full px-5 py-4 border-2 border-dashed border-blush-300 rounded-xl hover:border-rose-gold hover:bg-blush-50 transition-colors text-text-muted hover:text-rose-gold"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="font-body text-sm">Click to upload images</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-rose-gold hover:bg-rose-gold-dark disabled:opacity-60 text-white font-body font-semibold text-sm rounded-full transition-colors duration-200"
        >
          {loading ? "Saving…" : product ? "Save Changes" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 font-body text-sm text-text-muted hover:text-text-deep transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
