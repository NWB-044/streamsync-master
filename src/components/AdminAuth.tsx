import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const AdminAuth = () => {
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify admin credentials
    if (password === "1732010" && nickname === "Bipho") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("username", nickname);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang, Admin!",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Error",
        description: "Nickname atau password salah",
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
          <p className="mt-2 text-sm text-gray-400">Masukkan kredensial admin</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nickname"
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
            Masuk sebagai Admin
          </Button>
        </form>
      </div>
    </div>
  );
};