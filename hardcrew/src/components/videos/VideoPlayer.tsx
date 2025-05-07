
import { useState, useRef, useEffect } from "react";
import { Heart, Share, Repeat, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface VideoPlayerProps {
  id: string;
  url?: string;
  thumbnailUrl: string;
  title: string;
  worker: {
    id: string;
    name: string;
    profilePic?: string;
    occupation: string;
  };
  className?: string;
}

const VideoPlayer = ({ id, url, thumbnailUrl, title, worker, className }: VideoPlayerProps) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100)); // Random initial likes
  const [isLiked, setIsLiked] = useState(false);
  const [shares, setShares] = useState(Math.floor(Math.random() * 50)); // Random initial shares
  const [reposts, setReposts] = useState(Math.floor(Math.random() * 20)); // Random initial reposts
  
  const initials = worker.name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
    
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          // Fallback to showing thumbnail
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    
    if (!isLiked) {
      toast({
        title: "Video liked",
        description: "This video has been added to your liked videos."
      });
    }
  };
  
  const handleShare = () => {
    setShares(prev => prev + 1);
    toast({
      title: "Share link copied!",
      description: "You can now share this video with others."
    });
  };
  
  const handleRepost = () => {
    setReposts(prev => prev + 1);
    toast({
      title: "Video reposted",
      description: "This video has been reposted to your profile."
    });
  };
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error("Error auto-playing video:", error);
          });
          setIsPlaying(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    }, options);
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  
  // When using thumbnails as videos, we need to handle the error case
  const handleVideoError = () => {
    console.log("Video error occurred, using thumbnail instead");
    setIsPlaying(false);
  };
  
  return (
    <div className={cn("relative w-full aspect-[9/16] bg-black rounded-lg overflow-hidden", className)}>
      {/* Use either video with thumbnail fallback or just thumbnail */}
      {url ? (
        <video
          ref={videoRef}
          src={url}
          poster={thumbnailUrl}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={isMuted}
          onClick={togglePlay}
          onError={handleVideoError}
        />
      ) : (
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />
      )}
      
      {/* Play/Pause overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity cursor-pointer"
        onClick={togglePlay}
      >
        {!isPlaying && (
          <div className="bg-black bg-opacity-40 rounded-full p-3">
            <Play className="h-10 w-10 text-white" fill="white" />
          </div>
        )}
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      
      {/* Video controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        {/* Left: Video info */}
        <div className="flex-1 text-white">
          <Link to={`/videos/${id}`} className="block mb-1">
            <h3 className="text-base font-medium line-clamp-1">
              {title}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link to={`/workers/${worker.id}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={worker.profilePic} alt={worker.name} />
                <AvatarFallback className="bg-hardcrew-blue text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Link>
            <Link to={`/workers/${worker.id}`} className="text-sm hover:underline">
              {worker.name}
            </Link>
          </div>
        </div>
        
        {/* Right: Action buttons */}
        <div className="flex flex-col space-y-4 items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLike}
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
          >
            <Heart className={cn("h-6 w-6", isLiked ? "text-red-500 fill-red-500" : "")} />
            <span className="text-xs mt-1">{likes}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleShare}
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
          >
            <Share className="h-6 w-6" />
            <span className="text-xs mt-1">{shares}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleRepost}
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
          >
            <Repeat className="h-6 w-6" />
            <span className="text-xs mt-1">{reposts}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMute}
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
