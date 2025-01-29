import { useState } from "react";
import { SendIcon, SmileIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ChatPanel = () => {
  const [message, setMessage] = useState("");

  // Mock messages - replace with real-time chat implementation
  const messages = [
    { user: "Admin", text: "Welcome to the stream!" },
    { user: "Viewer1", text: "Hello everyone!" },
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
          <div key={index} className="animate-fade-in">
            <span className="font-semibold text-stream-accent">{msg.user}: </span>
            <span>{msg.text}</span>
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