import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Play, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Video } from "@/hooks/useVideos";

interface AdminVideoCardProps {
  video: Video;
  onUpdate: () => void;
}

export const AdminVideoCard = ({ video, onUpdate }: AdminVideoCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description || "");
  const [category, setCategory] = useState(video.category);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId;
      if (url.includes('youtu.be')) {
        // Handle youtu.be URLs with potential parameters
        const urlParts = url.split('/').pop()?.split('?')[0];
        videoId = urlParts;
      } else if (url.includes('/shorts/')) {
        // Handle YouTube Shorts URLs - extract video ID and use regular embed
        const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
        videoId = shortsMatch ? shortsMatch[1] : null;
      } else {
        // Handle regular youtube.com URLs
        videoId = new URLSearchParams(new URL(url).search).get('v');
      }
      // For all YouTube videos (including Shorts), use regular embed URL
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : url;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('videos')
        .update({
          title,
          description,
          category
        })
        .eq('id', video.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Video updated successfully!",
      });
      
      setIsEditOpen(false);
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update video.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', video.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Video deleted successfully!",
      });
      
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete video.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden tango-glow hover:shadow-tango transition-all duration-300">
      <div className="aspect-[9/16] relative">
        <iframe
          src={getVideoEmbedUrl(video.video_url)}
          title={video.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-white flex-1">{video.title}</h3>
          <div className="flex gap-2 ml-2">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="virtual_classes">Virtual Classes</SelectItem>
                        <SelectItem value="performances">Performances</SelectItem>
                        <SelectItem value="workshops">Workshops</SelectItem>
                        <SelectItem value="vlog">Vlog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleUpdate} disabled={isLoading} className="w-full">
                    {isLoading ? "Updating..." : "Update Video"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
        {video.description && (
          <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
        )}
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'Video'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const VideoCard = ({ video }: { video: Video }) => {
  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId;
      if (url.includes('youtu.be')) {
        // Handle youtu.be URLs with potential parameters
        const urlParts = url.split('/').pop()?.split('?')[0];
        videoId = urlParts;
      } else if (url.includes('/shorts/')) {
        // Handle YouTube Shorts URLs
        const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
        videoId = shortsMatch ? shortsMatch[1] : null;
      } else {
        // Handle regular youtube.com URLs
        videoId = new URLSearchParams(new URL(url).search).get('v');
      }
      // For all YouTube videos (including Shorts), use regular embed URL
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : url;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <Card className="overflow-hidden tango-glow hover:shadow-tango transition-all duration-300">
      <div className="aspect-[9/16] relative">
        <iframe
          src={getVideoEmbedUrl(video.video_url)}
          title={video.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-white mb-2">{video.title}</h3>
        {video.description && (
          <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
        )}
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'Video'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};