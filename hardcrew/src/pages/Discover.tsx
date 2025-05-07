
import { useState } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoUpload } from "@/components/videos/VideoUpload";
import VideoCarousel from "@/components/videos/VideoCarousel";

// Sample videos data
const videos = [
  {
    id: "1",
    title: "Complete Bathroom Renovation - Before & After",
    thumbnailUrl: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "2:45",
    views: 15420,
    createdAt: "3 days ago",
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
    worker: {
      id: "1",
      name: "Michael Johnson",
      profilePic: "https://images.unsplash.com/photo-1581091226033-d5c48e7114ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      occupation: "Electrician"
    }
  },
  {
    id: "3",
    title: "Modern Kitchen Design Ideas 2025",
    thumbnailUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "5:30",
    views: 22180,
    createdAt: "2 weeks ago",
    worker: {
      id: "2",
      name: "Sarah Miller",
      profilePic: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      occupation: "Interior Designer"
    }
  },
  {
    id: "4",
    title: "How to Fix a Leaking Faucet - DIY Guide",
    thumbnailUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "3:18",
    views: 7490,
    createdAt: "3 weeks ago",
    worker: {
      id: "3",
      name: "David Chen",
      profilePic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      occupation: "Plumber"
    }
  },
  {
    id: "5",
    title: "Custom Furniture Build - Reclaimed Wood Table",
    thumbnailUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "7:42",
    views: 12350,
    createdAt: "1 month ago",
    worker: {
      id: "5",
      name: "James Anderson",
      profilePic: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      occupation: "Carpenter"
    }
  },
  {
    id: "6",
    title: "Professional Home Paint Job - Tips and Tricks",
    thumbnailUrl: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    duration: "6:05",
    views: 9870,
    createdAt: "1 month ago",
    worker: {
      id: "6",
      name: "Emily Rodriguez",
      profilePic: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      occupation: "Painter"
    }
  },
];

const categories = [
  "For You",
  "Following",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Interior Design",
  "Painting",
  "Landscaping",
  "HVAC",
  "Appliance Repair",
];

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        {/* Header with search */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search videos" 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setShowUpload(!showUpload)}
            variant="secondary"
            className="ml-2"
            size="sm"
          >
            {showUpload ? "Browse" : "Upload"}
          </Button>
        </div>
        
        {/* Worker Videos Introduction */}
        <div className="bg-gray-50 px-4 py-6 text-center border-b">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Discover Worker Videos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore high-quality videos from skilled professionals sharing their expertise, tips, and project showcases. 
            Learn from the best in plumbing, electrical work, carpentry, interior design, and more. 
            Watch how experts tackle common home improvement challenges and get inspired for your next project.
          </p>
        </div>
        
        {/* Categories */}
        <div className="border-b overflow-x-auto">
          <div className="flex space-x-2 p-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === selectedCategory ? "default" : "outline"}
                className={category === selectedCategory 
                  ? "bg-hardcrew-blue hover:bg-hardcrew-darkBlue" 
                  : "hover:bg-gray-100"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {showUpload ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <VideoUpload />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <VideoCarousel videos={videos} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
