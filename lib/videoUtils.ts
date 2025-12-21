export const getVideoEmbedUrl = (url: string, enableTracking = false) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId;
    if (url.includes('youtu.be')) {
      const urlParts = url.split('/').pop()?.split('?')[0];
      videoId = urlParts;
    } else if (url.includes('/shorts/')) {
      const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
      videoId = shortsMatch ? shortsMatch[1] : null;
    } else {
      videoId = new URLSearchParams(new URL(url).search).get('v');
    }
    const trackingParams = enableTracking ? '&enablejsapi=1&origin=' + window.location.origin : '';
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0${trackingParams}` : url;
  }
  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop()?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

export const extractYouTubeThumbnail = (url: string): string => {
  if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
    return '';
  }

  let videoId: string | null = null;
  
  try {
    if (url.includes('youtu.be')) {
      // Format: https://youtu.be/VIDEO_ID or https://youtu.be/VIDEO_ID?si=...
      const urlParts = url.split('/').pop()?.split('?')[0];
      videoId = urlParts || null;
    } else if (url.includes('/shorts/')) {
      // Format: https://youtube.com/shorts/VIDEO_ID
      const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
      videoId = shortsMatch ? shortsMatch[1] : null;
    } else {
      // Format: https://youtube.com/watch?v=VIDEO_ID
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v');
    }
  } catch (error) {
    console.error('Error parsing YouTube URL:', url, error);
    return '';
  }

  if (videoId) {
    console.log(`Extracted video ID: ${videoId} from URL: ${url}`);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  
  console.warn(`Could not extract video ID from URL: ${url}`);
  return '';
};
