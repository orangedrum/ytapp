"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/categories";
import { PageTransition } from "@/components/ui/page-transition";

export default function AdminPage() {
  const [accessKey, setAccessKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("technique");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check for now as requested
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      setMessage("Invalid Access Key");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("videos").insert([
        {
          title,
          description,
          video_url: videoUrl,
          duration,
          category,
          tag_variant: "watch", // Default
          tag_label: "Watch & Study", // Default
        },
      ]);

      if (error) throw error;

      setMessage("Video uploaded successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setDuration("");
    } catch (error: any) {
      setMessage("Error uploading video: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">Admin Access</h1>
          <Input
            type="password"
            placeholder="Enter Access Key"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
          />
          <Button type="submit" className="w-full">Login</Button>
          {message && <p className="text-red-500 text-center">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <PageTransition className="flex flex-col min-h-screen p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Upload New Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto w-full">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoUrl">YouTube URL</Label>
          <Input id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required placeholder="https://youtube.com/..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 05:30" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            {Object.entries(CATEGORIES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </Button>

        {message && <p className={`text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
      </form>
    </PageTransition>
  );
}