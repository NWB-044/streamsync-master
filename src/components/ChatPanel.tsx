import { useState } from "react";
import { SendIcon, SmileIcon, CrownIcon, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  user: string;
  text: string;
  isAdmin: boolean;
}

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Mock messages - replace with real-time chat implementation
  const messages: Message[] = [
    { user: "Admin", text: "Welcome to the stream!", isAdmin: true },
    { user: "Viewer1", text: "Hello everyone!", isAdmin: false },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // TODO: Implement real-time message sending
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="animate-fade-in group">
            <div className="flex items-center space-x-2">
              {msg.isAdmin ? (
                <CrownIcon className="h-4 w-4 text-yellow-500" />
              ) : (
                <UserIcon className="h-4 w-4 text-stream-text" />
              )}
              <span className={`font-semibold ${msg.isAdmin ? "text-yellow-500" : "text-stream-accent"}`}>
                {msg.user}:
              </span>
            </div>
            <p className="ml-6 text-stream-text">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
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
    </div>
  );
};