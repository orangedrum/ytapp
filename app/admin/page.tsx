"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/categories";
import { PageTransition } from "@/components/ui/page-transition";
import { Video } from "@/lib/types";

export default function AdminPage() {
  // Sanity check log
  console.log("Admin Page Rendering");

  const [accessKey, setAccessKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [view, setView] = useState<"list" | "add">("list");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("technique");

  const fetchVideos = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase.from("videos").select("*").order('created_at', { ascending: false });
    if (data) {
      setVideos(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check for now as requested
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsAuthenticated(true);
      await fetchVideos();
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
      setView("list");
      await fetchVideos();
    } catch (error: any) {
      setMessage("Error uploading video: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVideo = async (id: string, updates: Partial<Video>) => {
    setLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("videos").update(updates).eq("id", id);
      if (error) throw error;
      
      setMessage("Video updated successfully!");
      await fetchVideos();
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
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {view === "list" ? (
          <Button onClick={() => setView("add")}>Add New Video</Button>
        ) : (
          <Button variant="outline" onClick={() => setView("list")}>Back to List</Button>
        )}
      </div>
      
      {message && <p className={`text-center mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}

      {view === "add" ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto w-full">
          <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>
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
        </form>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto w-full">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center bg-white shadow-sm">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{video.title}</h3>
                <p className="text-sm text-gray-500 truncate">{video.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Category</Label>
                  <select 
                    value={video.category || "technique"} 
                    onChange={(e) => handleUpdateVideo(video.id, { category: e.target.value as any })}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    {Object.entries(CATEGORIES).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Tag Type</Label>
                  <select 
                    value={video.tag_variant || "watch"} 
                    onChange={(e) => handleUpdateVideo(video.id, { tag_variant: e.target.value as any })}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    <option value="watch">Watch</option>
                    <option value="dance">Dance</option>
                    <option value="explanation">Explanation</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Tag Label</Label>
                  <Input 
                    value={video.tag_label || ""} 
                    onChange={(e) => {
                      // Just update local state for input, would need a separate save or debounce for text input to be smooth
                      // For simplicity, let's just update on blur or enter, but here we'll just use onBlur for the actual save
                      const newVideos = videos.map(v => v.id === video.id ? { ...v, tag_label: e.target.value } : v);
                      setVideos(newVideos);
                    }}
                    onBlur={(e) => handleUpdateVideo(video.id, { tag_label: e.target.value })}
                    className="h-9 w-32"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}