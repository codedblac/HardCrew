
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import VideoPlayer from "@/components/videos/VideoPlayer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share, Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Mock data - in a real app this would come from an API
const videos = [
  {
    id: "1",
    title: "Complete Bathroom Renovation - Before & After",
    thumbnailUrl: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "2:45",
    views: 15420,
    createdAt: "3 days ago",
    description: "In this video, I show you the complete process of renovating a bathroom from start to finish. Watch as we transform an outdated bathroom into a modern, functional space.",
    worker: {
      id: "4",
      name: "Robert Wilson",
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      occupation: "Master Plumber"
    }
  },
  {
    id: "2",
    title: "Fixing Electrical Problems: 5 Common Issues",
    thumbnailUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "4:12",
    views: 8730,
    createdAt: "1 week ago",
    description: "In this video, I address the 5 most common electrical problems homeowners face and show you how to diagnose and fix them safely.",
    worker: {
      id: "1",
      name: "Michael Johnson",
      profilePic: "https://images.unsplash.com/photo-1581091226033-d5c48e7114ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      occupation: "Electrician"
    }
  },
];

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  
  const video = videos.find(v => v.id === id);
  
  if (!video) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <p>The video you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }
  
  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed like" : "Added like",
    });
  };
  
  const handleShare = () => {
    // Here we would handle sharing functionality
    toast({
      title: "Share link copied!",
      description: "You can now share this video with others.",
    });
  };
  
  const handleRepost = () => {
    toast({
      title: "Video reposted",
      description: "This video has been reposted to your profile.",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="aspect-video md:aspect-[16/9]">
              <VideoPlayer 
                id={video.id}
                thumbnailUrl={video.thumbnailUrl}
                title={video.title}
                worker={video.worker}
                className="w-full h-full"
              />
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {video.views.toLocaleString()} views • {video.createdAt}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleLike}>
                    <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleRepost}>
                    <Repeat className="mr-2 h-4 w-4" />
                    Repost
                  </Button>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={video.worker.profilePic} 
                  alt={video.worker.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{video.worker.name}</h3>
                  <p className="text-sm text-gray-500">{video.worker.occupation}</p>
                </div>
                <Button className="ml-auto">Follow</Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-700">{video.description}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetail;
