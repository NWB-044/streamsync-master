import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AdminAuth = () => {
  const [nickname, setNickname] = useState("");
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (nickname === "Bipho" && passcode === "1732010") {
      localStorage.setItem("isAdmin", "true");
      toast({
        title: "Login Berhasil",
        description: "Selamat datang, Admin!",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Error",
        description: "Nickname atau passcode salah",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stream-DEFAULT">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-stream-secondary p-8 shadow-lg animate-fade-in">
        <div className="text-center">
          <UserIcon className="mx-auto h-12 w-12 text-stream-accent" />
          <h2 className="mt-6 text-3xl font-bold text-stream-text">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Masuk sebagai admin
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Nickname"
            className="bg-stream-DEFAULT border-gray-700 text-stream-text"
          />
          <Input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            className="bg-stream-DEFAULT border-gray-700 text-stream-text"
          />
          
          <Button
            type="submit"
            className="w-full bg-stream-accent hover:bg-stream-accent/90 text-white"
          >
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};