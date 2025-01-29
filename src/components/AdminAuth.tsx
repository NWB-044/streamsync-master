import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ADMIN_PASSWORD = "admin123"; // In production, this should be stored securely

export const AdminAuth = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      toast({
        title: "Success",
        description: "Welcome, Admin!",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stream-DEFAULT">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-stream-secondary p-8 shadow-lg animate-fade-in">
        <div className="text-center">
          <LockIcon className="mx-auto h-12 w-12 text-stream-accent" />
          <h2 className="mt-6 text-3xl font-bold text-stream-text">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-400">Enter password to access admin controls</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="bg-stream-DEFAULT border-gray-700 text-stream-text"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-stream-accent hover:bg-stream-accent/90 text-white"
          >
            Access Admin Panel
          </Button>
        </form>
      </div>
    </div>
  );
};