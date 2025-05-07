import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorkerCard from "@/components/workers/WorkerCard";
import { WorkerProfileForm } from "@/components/workers/WorkerProfileForm";

const workers = [
  {
    id: "1",
    name: "Michael Johnson",
    profilePic: "https://images.unsplash.com/photo-1581091226033-d5c48e7114ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    occupation: "Electrician",
    rating: 4.9,
    reviewCount: 47,
    skills: ["Electrical Wiring", "Troubleshooting", "Lighting Installation"],
    isVerified: true
  },
  {
    id: "2",
    name: "Sarah Miller",
    profilePic: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    occupation: "Interior Designer",
    rating: 4.8,
    reviewCount: 32,
    skills: ["Space Planning", "Color Consulting", "Furniture Selection"],
    isVerified: true
  },
  {
    id: "3",
    name: "David Chen",
    profilePic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    occupation: "Plumber",
    rating: 4.7,
    reviewCount: 28,
    skills: ["Pipe Repair", "Fixture Installation", "Water Heaters"],
    isVerified: false
  },
  {
    id: "4",
    name: "Robert Wilson",
    profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    occupation: "Master Plumber",
    rating: 4.9,
    reviewCount: 56,
    skills: ["Bathroom Renovation", "Water Systems", "Commercial Plumbing"],
    isVerified: true
  },
  {
    id: "5",
    name: "James Anderson",
    profilePic: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    occupation: "Carpenter",
    rating: 4.6,
    reviewCount: 23,
    skills: ["Custom Furniture", "Woodworking", "Cabinetry"],
    isVerified: true
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    profilePic: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    occupation: "Painter",
    rating: 4.7,
    reviewCount: 19,
    skills: ["Interior Painting", "Exterior Painting", "Color Consulting"],
    isVerified: false
  },
];

const categories = [
  "All",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Interior Design",
  "Painting",
  "Landscaping",
  "HVAC",
  "Appliance Repair",
  "Flooring",
];

const Workers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showProfileForm, setShowProfileForm] = useState(false);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Find Skilled Workers</h1>
          <Button 
            onClick={() => setShowProfileForm(!showProfileForm)}
            variant="secondary"
          >
            {showProfileForm ? "View Workers" : "Update Profile"}
          </Button>
        </div>
        
        {showProfileForm ? (
          <div className="max-w-2xl mx-auto">
            <WorkerProfileForm />
          </div>
        ) : (
          <>
            {/* Search, Location, and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search by name or skill" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="City or zip code" 
                  className="pl-10"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Categories */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
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
            
            {/* Worker Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map(worker => (
                <WorkerCard key={worker.id} {...worker} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Workers;
