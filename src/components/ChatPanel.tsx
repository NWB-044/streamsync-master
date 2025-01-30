import { useState, useEffect } from "react";
import { SendIcon, SmileIcon, CrownIcon, UserIcon, ShieldIcon, MinimizeIcon, MaximizeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  user: string;
  text: string;
  isAdmin: boolean;
  timestamp: Date;
  avatar?: string;
}

interface BannedContent {
  words: string[];
  usernames: string[];
}

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatWidth, setChatWidth] = useState(320); // Default width
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { toast } = useToast();

  // This would be loaded from a configuration file
  const bannedContent: BannedContent = {
    words: ["badword1", "badword2"],
    usernames: ["banned1", "banned2"],
  };

  const filterMessage = (text: string): string => {
    let filtered = text;
    bannedContent.words.forEach(word => {
      const regex = new RegExp(word, "gi");
      filtered = filtered.replace(regex, "huhu haha");
    });
    return filtered;
  };

  const sendMessage = () => {
    if (message.trim()) {
      const filteredMessage = filterMessage(message);
      const newMessage: Message = {
        id: Date.now().toString(),
        user: isAdmin ? "Admin" : "Viewer",
        text: filteredMessage,
        isAdmin,
        timestamp: new Date(),
        avatar: "/placeholder.svg",
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
    }
  };

  const handleResize = (e: MouseEvent) => {
    if (e.clientX > 200 && e.clientX < window.innerWidth - 200) {
      setChatWidth(window.innerWidth - e.clientX);
    }
  };

  const startResize = () => {
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const stopResize = () => {
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  return (
    <div 
      className={`flex-1 flex flex-col bg-stream-secondary transition-all duration-300 ease-in-out ${
        isMinimized ? 'h-12' : 'h-full'
      }`}
      style={{ width: isMinimized ? 'auto' : `${chatWidth}px` }}
    >
      <div className="h-12 flex items-center justify-between px-4 border-b border-gray-700">
        <span className="font-semibold">Chat</span>
        <div className="flex items-center space-x-2">
          <div
            className="w-1 h-6 bg-gray-700 cursor-col-resize hidden md:block"
            onMouseDown={startResize}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-stream-text hover:text-stream-accent"
          >
            {isMinimized ? (
              <MaximizeIcon className="h-4 w-4" />
            ) : (
              <MinimizeIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="animate-fade-in group">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback>
                      {msg.isAdmin ? (
                        <CrownIcon className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <UserIcon className="h-4 w-4 text-stream-text" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${msg.isAdmin ? "text-yellow-500" : "text-stream-accent"}`}>
                        {msg.user}
                      </span>
                      {msg.isAdmin && (
                        <ShieldIcon className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-stream-text mt-1">{msg.text}</p>
                  </div>
                  
                  {isAdmin && !msg.isAdmin && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => {
                          toast({
                            title: "User Moderated",
                            description: "Action taken against user",
                          });
                        }}
                      >
                        <ShieldIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-stream-text hover:text-stream-accent"
              >
                <SmileIcon className="h-5 w-5" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-stream-DEFAULT border-gray-700 text-stream-text"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={sendMessage}
                className="text-stream-text hover:text-stream-accent"
              >
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};