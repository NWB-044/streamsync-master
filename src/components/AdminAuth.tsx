import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const AdminAuth = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already authenticated
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This would be replaced with actual authentication API call
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("username", username);
        toast({
          title: "Success",
          description: "Welcome, Admin!",
        });
        navigate("/admin");
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid username or password",
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
          <p className="mt-2 text-sm text-gray-400">Enter your credentials to access admin controls</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="bg-stream-DEFAULT border-gray-700 text-stream-text"
              autoComplete="username"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-stream-DEFAULT border-gray-700 text-stream-text"
              autoComplete="current-password"
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