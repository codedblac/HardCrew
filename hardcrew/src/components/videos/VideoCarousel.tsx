
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import VideoPlayer from "./VideoPlayer";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  url?: string;
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

interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Ensure we have videos to display
  if (!videos || videos.length === 0) {
    return <div className="h-full flex items-center justify-center">No videos available</div>;
  }
  
  return (
    <div className="w-full h-full">
      <Carousel
        opts={{ 
          loop: true,
          axis: "y",
          align: "center"
        }}
        orientation="vertical"
        className="h-[80vh]"
        setApi={(api) => {
          if (api) {
            api.on("select", () => {
              setCurrentIndex(api.selectedScrollSnap() || 0);
            });
          }
        }}
      >
        <CarouselContent className="-mt-4 h-full">
          {videos.map((video, index) => (
            <CarouselItem key={video.id} className="pt-4 h-full">
              <div className="h-full flex items-center justify-center">
                <VideoPlayer
                  id={video.id}
                  url={video.thumbnailUrl} // Using thumbnail as video URL for demonstration
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                  worker={video.worker}
                  className="h-full w-full max-w-md rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-1">
          {videos.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 w-5 rounded-full ${currentIndex === idx ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
        <CarouselPrevious className="left-1/2 -translate-x-1/2 top-4 z-20" />
        <CarouselNext className="left-1/2 -translate-x-1/2 bottom-12 z-20" />
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
