import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { extractYouTubeThumbnail } from "@/lib/videoUtils";

interface VideoFormData {
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  duration: number;
  featured: boolean;
  admin_notes: string;
}

interface VideoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video?: any;
  onSuccess: () => void;
}

export default function VideoFormDialog({ open, onOpenChange, video, onSuccess }: VideoFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    category: "videos",
    duration: 0,
    featured: false,
    admin_notes: ""
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || "",
        description: video.description || "",
        video_url: video.video_url || "",
        thumbnail_url: video.thumbnail_url || "",
        category: video.category || "videos",
        duration: video.duration || 0,
        featured: video.featured || false,
        admin_notes: video.admin_notes || ""
      });
    } else {
      // Reset form for new video
      setFormData({
        title: "",
        description: "",
        video_url: "",
        thumbnail_url: "",
        category: "videos",
        duration: 0,
        featured: false,
        admin_notes: ""
      });
    }
  }, [video, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.video_url.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and Video URL are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (video) {
        // Update existing video
        const { error } = await supabase
          .from('videos')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', video.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Video updated successfully"
        });
      } else {
        // Create new video
        const { error } = await supabase
          .from('videos')
          .insert(formData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Video created successfully"
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{video ? "Edit Video" : "Create New Video"}</DialogTitle>
          <DialogDescription>
            {video ? "Update video information" : "Add a new video to the library"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter video description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">Video URL *</Label>
              <Input
                id="video_url"
                value={formData.video_url}
                onChange={(e) => {
                  const url = e.target.value;
                  const autoThumbnail = extractYouTubeThumbnail(url);
                  console.log('Video URL changed:', url);
                  console.log('Auto-generated thumbnail:', autoThumbnail);
                  setFormData({ 
                    ...formData, 
                    video_url: url,
                    // Only auto-populate if thumbnail is currently empty
                    thumbnail_url: formData.thumbnail_url || autoThumbnail
                  });
                }}
                placeholder="https://youtube.com/watch?v=..."
                required
              />
            <p className="text-xs text-muted-foreground">
              Supports YouTube, Vimeo, and direct video links
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
            <Input
              id="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="Auto-generated for YouTube videos"
            />
            {formData.thumbnail_url && (
              <div className="mt-2">
                <img 
                  src={formData.thumbnail_url} 
                  alt="Thumbnail preview" 
                  className="w-full max-w-xs rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="videos">Videos</SelectItem>
                  <SelectItem value="virtual_classes">Virtual Classes</SelectItem>
                  <SelectItem value="performances">Performances</SelectItem>
                  <SelectItem value="workshops">Workshops</SelectItem>
                  <SelectItem value="vlog">Vlog</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured video (show on homepage)
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin_notes">Admin Notes</Label>
            <Textarea
              id="admin_notes"
              value={formData.admin_notes}
              onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
              placeholder="Internal notes visible only to admins"
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {video ? "Update Video" : "Create Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
