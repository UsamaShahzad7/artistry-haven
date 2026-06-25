"use server";

import { createServiceClient } from "@/lib/supabase/service";

export interface Testimonial {
  id: string;
  author_name: string;
  text: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

interface TestimonialPayload {
  author_name: string;
  text: string;
  rating: number;
  is_published: boolean;
}

export async function saveTestimonialAction(
  payload: TestimonialPayload,
  testimonialId?: string
): Promise<{ error?: string }> {
  const supabase = createServiceClient();
  if (testimonialId) {
    const { error } = await supabase.from("testimonials").update(payload).eq("id", testimonialId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("testimonials").insert(payload);
    if (error) return { error: error.message };
  }
  return {};
}

export async function deleteTestimonialAction(id: string): Promise<{ error?: string }> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  return {};
}

export async function togglePublishedAction(id: string, is_published: boolean): Promise<{ error?: string }> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("testimonials").update({ is_published }).eq("id", id);
  if (error) return { error: error.message };
  return {};
}
