import { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  MaximizeIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  isAdmin?: boolean;
  currentVideo?: string;
  subtitle?: string;
  title?: string;
}

export const VideoPlayer = ({ 
  isAdmin = false, 
  currentVideo = "", 
  subtitle = "",
  title = "No video selected"
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-full group bg-black">
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
        <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
      </div>

      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={currentVideo}
        poster="/placeholder.svg"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        {subtitle && <track kind="subtitles" src={subtitle} default />}
      </video>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            className="w-full"
            onValueChange={([value]) => {
              if (videoRef.current && isAdmin) {
                videoRef.current.currentTime = value;
              }
            }}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime -= 10;
                      }
                    }}
                    className="text-white hover:text-stream-accent"
                  >
                    <SkipBackIcon className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:text-stream-accent"
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
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime += 10;
                      }
                    }}
                    className="text-white hover:text-stream-accent"
                  >
                    <SkipForwardIcon className="h-6 w-6" />
                  </Button>
                </>
              )}

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:text-stream-accent"
                >
                  {isMuted ? (
                    <VolumeXIcon className="h-6 w-6" />
                  ) : (
                    <Volume2Icon className="h-6 w-6" />
                  )}
                </Button>
                <Slider
                  value={[volume * 100]}
                  max={100}
                  className="w-24"
                  onValueChange={([value]) => setVolume(value / 100)}
                />
              </div>

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
      </div>
    </div>
  );
};