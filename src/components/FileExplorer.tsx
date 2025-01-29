import { useState, useEffect } from "react";
import { FolderIcon, FileVideoIcon, SearchIcon, RefreshCwIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FileItem {
  name: string;
  type: "folder" | "video" | "subtitle";
  path: string;
  size?: string;
  modifiedDate?: string;
}

export const FileExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { toast } = useToast();

  const fetchFiles = async () => {
    if (!isAdmin) return;
    
    setIsLoading(true);
    try {
      // This would be replaced with actual file system API calls
      const response = await fetch(`/api/files?path=${encodeURIComponent(currentPath)}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('File fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
      console.log("Selected video:", file.path);
      toast({
        title: "Video Selected",
        description: file.name,
      });
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            disabled={isLoading}
            className="text-stream-text hover:text-stream-accent"
          >
            <RefreshCwIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
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
        
        {filteredFiles.map((file, index) => (
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
            <div className="flex-1">
              <span className="group-hover:text-stream-accent transition-colors truncate">
                {file.name}
              </span>
              {file.size && (
                <span className="text-xs text-gray-500 ml-2">
                  {file.size}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};