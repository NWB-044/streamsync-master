import { useState, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  MaximizeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  isAdmin: boolean;
}

export const VideoPlayer = ({ isAdmin }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!isAdmin) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative h-full group">
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        src=""
        poster="/placeholder.svg"
      />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            disabled={!isAdmin}
            className="text-white hover:text-stream-accent disabled:opacity-50"
          >
            <SkipBackIcon className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            disabled={!isAdmin}
            className="text-white hover:text-stream-accent disabled:opacity-50"
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            disabled={!isAdmin}
            className="text-white hover:text-stream-accent disabled:opacity-50"
          >
            <SkipForwardIcon className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="text-white hover:text-stream-accent"
          >
            <MaximizeIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};