import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { UserIcon, Camera, Settings } from "lucide-react";

interface UserInfo {
  username: string;
  deviceName: string;
  ipAddress: string;
  userAgent: string;
}

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "User123",
    deviceName: navigator.platform,
    ipAddress: "192.168.1.1", // This would be fetched from the server
    userAgent: navigator.userAgent,
  });
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { toast } = useToast();
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload
      toast({
        title: "Success",
        description: "Profile picture updated",
      });
    }
  };

  return (
    <div className="p-6 bg-stream-secondary rounded-lg animate-fade-in">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>
              <UserIcon className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 p-1 bg-stream-accent rounded-full cursor-pointer hover:bg-stream-accent/90"
          >
            <Camera className="h-4 w-4 text-white" />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-stream-text">{userInfo.username}</h2>
          <p className="text-sm text-gray-400">{isAdmin ? "Admin" : "Viewer"}</p>
        </div>
        
        {isAdmin && (
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-400">Device Information</label>
          <p className="text-stream-text">{userInfo.deviceName}</p>
        </div>
        <div>
          <label className="text-sm text-gray-400">IP Address</label>
          <p className="text-stream-text">{userInfo.ipAddress}</p>
        </div>
        <div>
          <label className="text-sm text-gray-400">Browser</label>
          <p className="text-stream-text truncate">{userInfo.userAgent}</p>
        </div>
      </div>
    </div>
  );
};