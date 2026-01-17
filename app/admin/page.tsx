"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/categories";
import { PageTransition } from "@/components/ui/page-transition";
import { Video } from "@/lib/types";
import { createVideoAction, deleteVideoAction, updateVideoAction } from "./actions";

const VideoRow = ({ video, onUpdate, onDelete }: { video: Video; onUpdate: (id: string, updates: Partial<Video>) => Promise<void>; onDelete: (id: string) => Promise<void> }) => {
  const [localVideo, setLocalVideo] = useState<Video>(video);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync local state if prop changes (e.g. after refetch)
  React.useEffect(() => {
    setLocalVideo(video);
    setIsDirty(false);
  }, [video]);

  const handleChange = (field: keyof Video, value: any) => {
    setLocalVideo((prev) => {
      const updates: any = { [field]: value };
      // Auto-update label based on variant
      if (field === "tag_variant") {
        if (value === "watch") updates.tag_label = "Watch & Study";
        if (value === "dance") updates.tag_label = "Dance Along";
        if (value === "explanation") updates.tag_label = "Explanation";
      }
      return { ...prev, ...updates };
    });
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Exclude id and created_at from updates
    const { id, created_at, ...updates } = localVideo as any;
    await onUpdate(video.id, updates);
    setIsSaving(false);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-4 bg-white shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{video.title}</h3>
          <p className="text-sm text-gray-500 truncate">{video.description}</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => onDelete(video.id)}
            className="text-red-500 hover:text-red-700 text-sm underline"
          >
            Delete
          </button>
          <Button onClick={handleSave} disabled={!isDirty || isSaving} size="sm">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1">
          <Label className="text-xs">Category</Label>
          <select
            value={localVideo.category || "technique"}
            onChange={(e) => handleChange("category", e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            {Object.entries(CATEGORIES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-xs">Type</Label>
          <select
            value={localVideo.tag_variant || "watch"}
            onChange={(e) => handleChange("tag_variant", e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="watch">Watch</option>
            <option value="dance">Dance</option>
            <option value="explanation">Explanation</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
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
      const newVideo = {
        title,
        description,
        video_url: videoUrl,
        duration,
        category,
        tag_variant: "watch", // Default
        tag_label: "Watch & Study", // Default
      };

      const createdVideo = await createVideoAction(newVideo);
      if (createdVideo) setVideos([createdVideo, ...videos]);

      setMessage("Video uploaded successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setDuration("");
      setView("list");
    } catch (error: any) {
      setMessage("Error uploading video: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVideo = async (id: string, updates: Partial<Video>) => {
    setLoading(true);
    try {
      await updateVideoAction(id, updates);
      
      // Update local state immediately to prevent UI reversion
      setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));

      setMessage("Video updated successfully!");
      // We do NOT call fetchVideos() here to avoid stale data overwriting our update
    } catch (error: any) {
      setMessage("Error uploading video: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    setLoading(true);
    try {
      await deleteVideoAction(id);
      
      // Update local state immediately
      setVideos((prev) => prev.filter((v) => v.id !== id));

      setMessage("Video deleted successfully!");
    } catch (error: any) {
      setMessage("Error deleting video: " + error.message);
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
            <VideoRow key={video.id} video={video} onUpdate={handleUpdateVideo} onDelete={handleDeleteVideo} />
          ))}
        </div>
      )}
    </PageTransition>
  );
}