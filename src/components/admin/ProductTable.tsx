"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProductAction } from "@/app/admin/products/actions";
import type { Product } from "@/components/public/ProductCard";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await deleteProductAction(id);
    setDeleting(null);
    router.refresh();
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-blush-300 p-16 text-center">
        <p className="font-display text-2xl text-text-muted italic mb-4">No products yet</p>
        <Link
          href="/admin/products/new"
          className="inline-block px-8 py-3 bg-rose-gold text-white font-body font-semibold text-sm rounded-full hover:bg-rose-gold-dark transition-colors"
        >
          Add Your First Product
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-blush-300 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blush-300 bg-blush-50">
              <th className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider text-left px-6 py-4">
                Product
              </th>
              <th className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider text-left px-4 py-4">
                Category
              </th>
              <th className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider text-left px-4 py-4">
                Price
              </th>
              <th className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider text-center px-4 py-4">
                Featured
              </th>
              <th className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider text-center px-4 py-4">
                Stock
              </th>
              <th className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider text-right px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blush-300/50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-blush-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-blush-100 flex-shrink-0">
                      {product.images?.[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-text-deep">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="font-body text-xs text-text-muted mt-0.5 line-clamp-1 max-w-[200px]">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-block px-3 py-1 bg-blush-100 text-text-muted font-body text-xs rounded-full capitalize">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-body text-sm text-rose-gold font-medium">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-lg ${product.is_featured ? "text-rose-gold" : "text-blush-300"}`}>
                    {product.is_featured ? "★" : "☆"}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full font-body text-xs font-medium ${
                      product.in_stock
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {product.in_stock ? "In Stock" : "Sold Out"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-body text-sm text-rose-gold hover:text-rose-gold-dark font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deleting === product.id}
                      className="font-body text-sm text-text-muted hover:text-red-600 transition-colors disabled:opacity-40"
                    >
                      {deleting === product.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
