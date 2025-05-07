
import { useState } from "react";
import { Play, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  createdAt: string;
  worker: {
    id: string;
    name: string;
    profilePic?: string;
    occupation: string;
  };
}

const VideoCard = ({ 
  id, 
  title, 
  thumbnailUrl, 
  duration, 
  views, 
  createdAt, 
  worker 
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  
  const formattedViews = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(views);
  
  const initials = worker.name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
    
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed like" : "Added like",
    });
  };
  
  return (
    <Card 
      className={`video-card h-full card-hover ${isHovered ? 'border-hardcrew-blue' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <Link to={`/videos/${id}`} className="block">
          <div className="relative aspect-video">
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
              {duration}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
              <div className="bg-white rounded-full p-3">
                <Play className="h-6 w-6 text-hardcrew-blue" fill="currentColor" />
              </div>
            </div>
            
            {/* TikTok-style like button */}
            <button 
              className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-70 transition-all"
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>
        </Link>
        
        <div className="p-3">
          <Link to={`/videos/${id}`} className="block mb-2">
            <h3 className="font-medium line-clamp-2 hover:text-hardcrew-blue transition-colors">
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
            <div className="flex-1 min-w-0">
              <Link to={`/workers/${worker.id}`} className="block">
                <p className="text-sm font-medium truncate hover:text-hardcrew-blue transition-colors">
                  {worker.name}
                </p>
              </Link>
              <p className="text-xs text-gray-500 truncate">
                {worker.occupation}
              </p>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            {formattedViews} views • {createdAt}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
