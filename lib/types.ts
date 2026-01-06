export type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail_url: string;
  video_url: string;
  category: "adorn" | "technique" | "posture" | "lead" | "musicality" | "connection";
  tag_variant: "watch" | "dance" | "explanation";
  tag_label: string;
  rating: number;
  views: number;
  created_at: string;
};