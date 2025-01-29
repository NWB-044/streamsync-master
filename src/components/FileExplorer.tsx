import { useState } from "react";
import { FolderIcon, FileVideoIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const FileExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Mock data - replace with actual file system integration
  const files = [
    { name: "Movies", type: "folder" },
    { name: "Anime", type: "folder" },
    { name: "Series", type: "folder" },
    { name: "movie1.mp4", type: "video" },
    { name: "episode1.mp4", type: "video" },
  ];

  if (!isAdmin) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-stream-DEFAULT border-gray-700 text-stream-text"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 hover:bg-stream-DEFAULT cursor-pointer group"
          >
            {file.type === "folder" ? (
              <FolderIcon className="h-5 w-5 text-stream-accent mr-2 group-hover:text-stream-accent/80" />
            ) : (
              <FileVideoIcon className="h-5 w-5 text-stream-text mr-2 group-hover:text-stream-accent" />
            )}
            <span className="group-hover:text-stream-accent transition-colors">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};