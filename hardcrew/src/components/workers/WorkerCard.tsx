
import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface WorkerCardProps {
  id: string;
  name: string;
  profilePic?: string;
  occupation: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  isVerified?: boolean;
}

const WorkerCard = ({
  id,
  name,
  profilePic,
  occupation,
  rating,
  reviewCount,
  skills,
  isVerified = false
}: WorkerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
  
  return (
    <Link to={`/workers/${id}`}>
      <Card 
        className={`card-hover cursor-pointer overflow-hidden ${isHovered ? 'border-hardcrew-blue' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={profilePic} alt={name} />
                <AvatarFallback className="bg-hardcrew-blue text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  {isVerified && (
                    <span className="bg-blue-100 text-hardcrew-blue text-xs font-semibold px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{occupation}</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
              </div>
              <span className="mx-1 text-gray-400">•</span>
              <span className="text-gray-600 text-sm">{reviewCount} reviews</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
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
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between border-t">
          <span className="text-sm text-gray-600">Available for hire</span>
          <span className="text-hardcrew-blue font-medium">View Profile</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default WorkerCard;
