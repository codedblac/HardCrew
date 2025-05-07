
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart, Share, Repeat, Video, Camera, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";

export function VideoUpload() {
  const { toast } = useToast();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [recordingMode, setRecordingMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      toast({
        title: "Video uploaded successfully!",
        description: "You can now add details to your video.",
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 1080 },
          height: { ideal: 1920 }
        }, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { 
          type: "video/webm" 
        });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
          videoRef.current.play();
        }
        
        streamRef.current?.getTracks().forEach(track => track.stop());
      };
      
      chunksRef.current = [];
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "You are now recording your video.",
      });
      
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast({
        title: "Recording failed",
        description: "Could not access camera or microphone.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording complete!",
        description: "You can now preview and publish your video.",
      });
    }
  };
  
  const resetRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    setRecordedVideo(null);
    setPreviewUrl(null);
    setRecordingMode(false);
    setIsRecording(false);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
    }
  };
  
  const handlePublish = () => {
    // Here we would typically handle the actual upload to a server
    toast({
      title: "Video published!",
      description: "Your video is now live on your profile.",
    });
    
    // Reset for next upload
    resetRecording();
    setTitle("");
  };

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed like" : "Added like",
    });
  };

  const handleShare = () => {
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
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex flex-col space-y-4">
        {!recordingMode && !previewUrl && (
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => setRecordingMode(true)} 
              variant="default"
              className="flex-1"
            >
              <Camera className="mr-2 h-4 w-4" />
              Record Video
            </Button>
            
            <div className="flex-1">
              <label 
                htmlFor="video-upload" 
                className="cursor-pointer flex items-center justify-center w-full py-2 px-4 border-2 border-dashed rounded-lg hover:bg-gray-50"
              >
                <Video className="mr-2 h-4 w-4" />
                <span>Upload Video</span>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>
        )}
        
        {(recordingMode || previewUrl || recordedVideo) && (
          <>
            <div className="relative">
              <AspectRatio ratio={9/16} className="bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={previewUrl || recordedVideo || undefined}
                  className="w-full h-full object-cover"
                  autoPlay={isRecording}
                  loop
                  muted={isRecording}
                  playsInline
                />
                
                {!recordedVideo && !previewUrl && recordingMode && (
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {isRecording && (
                      <div className="animate-pulse h-3 w-3 rounded-full bg-red-500"></div>
                    )}
                  </div>
                )}
              </AspectRatio>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={resetRecording}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {recordingMode && !recordedVideo && (
              <div className="flex justify-center">
                {isRecording ? (
                  <Button onClick={stopRecording} variant="destructive">
                    Stop Recording
                  </Button>
                ) : (
                  <Button onClick={startRecording} variant="default">
                    Start Recording
                  </Button>
                )}
              </div>
            )}
            
            {(recordedVideo || previewUrl) && (
              <>
                <div className="space-y-4">
                  <Input
                    placeholder="Add a title for your video..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                  
                  <Button 
                    onClick={handlePublish} 
                    variant="default" 
                    className="w-full"
                    disabled={!title.trim()}
                  >
                    Publish
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLike}
          className={isLiked ? "text-red-500" : ""}
        >
          <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          {likes}
        </Button>
        
        <Button variant="ghost" size="sm" onClick={handleRepost}>
          <Repeat className="mr-2 h-4 w-4" />
          Repost
        </Button>
        
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
