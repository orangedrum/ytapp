'use server'

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateVideoAction(id: string, updates: any) {
  const { error } = await supabase.from("videos").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  
  // Invalidate caches so changes show up immediately in the app
  revalidatePath('/library');
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function deleteVideoAction(id: string) {
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  
  revalidatePath('/library');
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function createVideoAction(video: any) {
  const { data, error } = await supabase.from("videos").insert([video]).select();
  if (error) throw new Error(error.message);
  
  revalidatePath('/library');
  revalidatePath('/admin');
  revalidatePath('/');
  return data?.[0];
}