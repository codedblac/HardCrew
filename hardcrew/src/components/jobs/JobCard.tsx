
import { MapPin, Clock, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: string;
  title: string;
  company?: string;
  location: string;
  payRange: string;
  jobType: string;
  postedAt: string;
  skills: string[];
  urgentOrFeatured?: 'urgent' | 'featured' | null;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  payRange,
  jobType,
  postedAt,
  skills,
  urgentOrFeatured
}: JobCardProps) => {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="card-hover overflow-hidden h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
            {urgentOrFeatured && (
              <Badge className={
                urgentOrFeatured === 'urgent' 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-hardcrew-blue bg-opacity-10 text-hardcrew-blue hover:bg-opacity-20'
              }>
                {urgentOrFeatured === 'urgent' ? 'Urgent' : 'Featured'}
              </Badge>
            )}
          </div>
          
          {company && (
            <div className="flex items-center mb-3">
              <User className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-700">{company}</span>
            </div>
          )}
          
          <div className="flex items-center mb-3">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-700">{location}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-500 text-sm">Posted {postedAt}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between border-t">
          <div className="flex items-center">
            <span className="font-medium text-hardcrew-darkBlue">{payRange}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{jobType}</span>
          </div>
          <span className="text-hardcrew-blue font-medium">Apply Now</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
