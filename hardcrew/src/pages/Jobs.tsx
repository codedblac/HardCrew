
import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/jobs/JobCard";
import { Link } from "react-router-dom";

// Updated mock data with correct urgentOrFeatured type literals
const jobs = [
  {
    id: "1",
    title: "Experienced Electrician for Office Building Wiring",
    company: "Metro Construction Co.",
    location: "Austin, TX",
    payRange: "$45-60/hr",
    jobType: "Full-time",
    postedAt: "2 days ago",
    skills: ["Electrical Wiring", "Commercial Buildings", "Troubleshooting"],
    urgentOrFeatured: "featured" as const
  },
  {
    id: "2",
    title: "Bathroom Remodel - Need Skilled Plumber",
    location: "Denver, CO",
    payRange: "$500-800",
    jobType: "Contract",
    postedAt: "1 day ago",
    skills: ["Bathroom Plumbing", "Fixture Installation", "Tiling"],
    urgentOrFeatured: "urgent" as const
  },
  {
    id: "3",
    title: "Kitchen Cabinet Installation",
    company: "Homeowner",
    location: "Seattle, WA",
    payRange: "$40-50/hr",
    jobType: "Contract",
    postedAt: "3 days ago",
    skills: ["Cabinet Installation", "Woodworking", "Kitchen Renovation"],
    urgentOrFeatured: null
  },
  {
    id: "4",
    title: "Commercial Painting Project - Office Building",
    company: "Northwest Properties",
    location: "Portland, OR",
    payRange: "$35-45/hr",
    jobType: "Contract",
    postedAt: "5 days ago",
    skills: ["Commercial Painting", "Interior Painting", "Exterior Painting"],
    urgentOrFeatured: null
  },
  {
    id: "5",
    title: "Residential Landscape Design and Installation",
    company: "Homeowner",
    location: "San Diego, CA",
    payRange: "$2,500-5,000",
    jobType: "Project",
    postedAt: "1 week ago",
    skills: ["Landscape Design", "Irrigation", "Planting"],
    urgentOrFeatured: "featured" as const
  },
  {
    id: "6",
    title: "HVAC System Repair and Maintenance",
    company: "Comfort Cooling Inc.",
    location: "Phoenix, AZ",
    payRange: "$30-40/hr",
    jobType: "Part-time",
    postedAt: "2 weeks ago",
    skills: ["HVAC Repair", "System Maintenance", "Troubleshooting"],
    urgentOrFeatured: null
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

const Jobs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Available Jobs</h1>
          <Link to="/post-job">
            <Button className="btn-primary">+ Post a Job</Button>
          </Link>
        </div>
        
        {/* Search, Location, and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by title, skill, or company" 
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
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
            <TabsTrigger value="recent">Recently Posted</TabsTrigger>
          </TabsList>
          
          {/* Tab Content */}
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map(job => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="urgent" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.filter(job => job.urgentOrFeatured === "urgent").map(job => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...jobs].sort((a, b) => 
                a.postedAt.localeCompare(b.postedAt)
              ).map(job => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Load More */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
