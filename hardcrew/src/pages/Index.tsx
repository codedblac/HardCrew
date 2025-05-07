import { Link } from "react-router-dom";
import { Play, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import WorkerCard from "@/components/workers/WorkerCard";
import VideoCard from "@/components/videos/VideoCard";
import JobCard from "@/components/jobs/JobCard";

// Mock data
const featuredWorkers = [
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
  }
];

const trendingVideos = [
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
      profilePic: "https://images.unsplash.com/photo-1581091226033-d5c48e7114ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
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
      profilePic: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      occupation: "Interior Designer"
    }
  },
];

const featuredJobs = [
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
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/6321773/pexels-photo-6321773.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Skilled Work<br />Deserves to be Seen
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                HardCrew connects skilled tradespeople with clients through video showcases. Get hired, get paid, build your reputation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="w-full md:w-auto">
                  <Button size="lg" className="w-full bg-white text-hardcrew-blue hover:bg-blue-50 font-semibold">
                    Join as a Worker
                  </Button>
                </Link>
                <Link to="/post-job" className="w-full md:w-auto">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="w-full gap-2 bg-hardcrew-orange hover:bg-hardcrew-darkOrange"
                  >
                    <Briefcase className="h-5 w-5" />
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-xl">
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Skilled worker in action"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <button className="bg-white/90 hover:bg-white rounded-full p-4 transition-all transform hover:scale-105">
                      <Play className="h-8 w-8 text-hardcrew-blue" fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">See How HardCrew Works</h3>
                    <p className="text-white/80">Watch our 2-minute intro video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How HardCrew Works</h2>
            <p className="text-lg text-gray-600">
              A simple process to connect skilled workers with clients looking for quality services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-hardcrew-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Workers sign up and create a profile showcasing their skills, certifications, and location.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-hardcrew-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Videos of Your Work</h3>
              <p className="text-gray-600">
                Upload short videos showing your skills, completed projects, and client testimonials.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-bold text-hardcrew-blue">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Hired & Get Paid</h3>
              <p className="text-gray-600">
                Clients discover your profile, book your service, and pay securely through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Workers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Workers</h2>
            <Link to="/workers" className="text-hardcrew-blue hover:text-hardcrew-darkBlue font-medium flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkers.map(worker => (
              <WorkerCard key={worker.id} {...worker} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Videos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Trending Videos</h2>
            <Link to="/discover" className="text-hardcrew-blue hover:text-hardcrew-darkBlue font-medium flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.map(video => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Jobs */}
      <section className="py-16 bg-hardcrew-gray">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Jobs</h2>
            <Link to="/jobs" className="text-hardcrew-blue hover:text-hardcrew-darkBlue font-medium flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredJobs.map(job => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/jobs">
              <Button size="lg" className="btn-primary">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-hardcrew-blue py-16 md:py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Showcase Your Skills?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Join thousands of skilled professionals building their careers through HardCrew. 
              Get discovered, get hired, and grow your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-hardcrew-blue hover:bg-blue-50 font-semibold">
                  Create Your Profile
                </Button>
              </Link>
              <Link to="/discover">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                  Explore the Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
