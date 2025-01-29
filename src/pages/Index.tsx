import { useState } from "react";
import { FileExplorer } from "@/components/FileExplorer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ChatPanel } from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";

const Index = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [showExplorer, setShowExplorer] = useState(true);
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="flex h-screen bg-stream-DEFAULT text-stream-text">
      {/* File Explorer (Admin Only) */}
      {isAdmin && (
        <div
          className={`${
            showExplorer ? "w-64" : "w-0"
          } transition-all duration-300 overflow-hidden bg-stream-secondary border-r border-gray-700`}
        >
          <FileExplorer />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 bg-stream-secondary flex items-center px-4 border-b border-gray-700">
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowExplorer(!showExplorer)}
              className="text-stream-text hover:text-stream-accent"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          )}
          <span className="ml-4 font-semibold">
            {isAdmin ? "Admin Stream Control" : "Stream Viewer"}
          </span>
        </div>

        {/* Video and Chat Container */}
        <div className="flex-1 flex">
          {/* Video Player */}
          <div className="flex-1 bg-black">
            <VideoPlayer isAdmin={isAdmin} />
          </div>

          {/* Chat Panel */}
          <div
            className={`${
              showChat ? "w-80" : "w-0"
            } transition-all duration-300 overflow-hidden bg-stream-secondary border-l border-gray-700`}
          >
            <div className="h-full flex flex-col">
              <div className="h-12 flex items-center justify-between px-4 border-b border-gray-700">
                <span className="font-semibold">Chat</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChat(!showChat)}
                  className="text-stream-text hover:text-stream-accent"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <ChatPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;