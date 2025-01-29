import { useState, useEffect } from "react";
import { FolderIcon, FileVideoIcon, SearchIcon, RefreshIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FileItem {
  name: string;
  type: "folder" | "video" | "subtitle";
  path: string;
}

export const FileExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [files, setFiles] = useState<FileItem[]>([]);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { toast } = useToast();

  const fetchFiles = async () => {
    try {
      // This would be replaced with actual file system API calls
      const response = await fetch(`/api/files?path=${currentPath}`);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFiles();
    }
  }, [currentPath, isAdmin]);

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentPath(`${currentPath}${file.name}/`);
    } else if (file.type === "video") {
      // Handle video selection
      console.log("Selected video:", file.path);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="h-full flex flex-col bg-stream-secondary animate-fade-in">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-stream-DEFAULT border-gray-700 text-stream-text"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchFiles}
            className="text-stream-text hover:text-stream-accent"
          >
            <RefreshIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-2 text-sm text-gray-400 truncate">
          Current path: {currentPath}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {currentPath !== "/" && (
          <div
            onClick={() => setCurrentPath(currentPath.replace(/[^/]+\/$/, ""))}
            className="flex items-center px-4 py-2 hover:bg-stream-DEFAULT cursor-pointer group"
          >
            <FolderIcon className="h-5 w-5 text-stream-accent mr-2" />
            <span className="text-stream-accent">..</span>
          </div>
        )}
        
        {files.map((file, index) => (
          <div
            key={index}
            onClick={() => handleFileSelect(file)}
            className="flex items-center px-4 py-2 hover:bg-stream-DEFAULT cursor-pointer group"
          >
            {file.type === "folder" ? (
              <FolderIcon className="h-5 w-5 text-stream-accent mr-2 group-hover:text-stream-accent/80" />
            ) : (
              <FileVideoIcon className="h-5 w-5 text-stream-text mr-2 group-hover:text-stream-accent" />
            )}
            <span className="group-hover:text-stream-accent transition-colors truncate">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};