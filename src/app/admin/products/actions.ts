"use server";

import { createServiceClient } from "@/lib/supabase/service";

export async function uploadImageAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file provided" };

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = await file.arrayBuffer();

  const supabase = createServiceClient();
  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, buffer, { contentType: file.type });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return { url: data.publicUrl };
}

interface ProductPayload {
  name: string;
  description: string | null;
  price: number;
  category: "keychain" | "canvas";
  images: string[];
  is_featured: boolean;
  in_stock: boolean;
}

export async function saveProductAction(
  payload: ProductPayload,
  productId?: string
): Promise<{ error?: string }> {
  const supabase = createServiceClient();

  if (productId) {
    const { error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", productId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) return { error: error.message };
  }

  return {};
}

export async function deleteProductAction(
  id: string
): Promise<{ error?: string }> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  return {};
}
