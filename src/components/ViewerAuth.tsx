import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ViewerAuth = () => {
  const [nickname, setNickname] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      toast({
        title: "Error",
        description: "Nickname tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    // Store viewer data locally
    if (isRegistering) {
      const existingUsers = JSON.parse(localStorage.getItem("viewers") || "[]");
      if (existingUsers.includes(nickname)) {
        toast({
          title: "Error",
          description: "Nickname sudah digunakan",
          variant: "destructive",
        });
        return;
      }
      existingUsers.push(nickname);
      localStorage.setItem("viewers", JSON.stringify(existingUsers));
    } else {
      const existingUsers = JSON.parse(localStorage.getItem("viewers") || "[]");
      if (!existingUsers.includes(nickname)) {
        toast({
          title: "Error",
          description: "Nickname tidak terdaftar",
          variant: "destructive",
        });
        return;
      }
    }

    localStorage.setItem("currentViewer", nickname);
    toast({
      title: isRegistering ? "Registrasi Berhasil" : "Login Berhasil",
      description: `Selamat datang, ${nickname}!`,
    });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stream-DEFAULT">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-stream-secondary p-8 shadow-lg animate-fade-in">
        <div className="text-center">
          <UserIcon className="mx-auto h-12 w-12 text-stream-accent" />
          <h2 className="mt-6 text-3xl font-bold text-stream-text">
            {isRegistering ? "Daftar Viewer Baru" : "Login Viewer"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isRegistering
              ? "Buat akun viewer baru"
              : "Masuk dengan akun yang sudah ada"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nickname"
              className="bg-stream-DEFAULT border-gray-700 text-stream-text"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-stream-accent hover:bg-stream-accent/90 text-white"
          >
            {isRegistering ? "Daftar" : "Masuk"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-stream-text hover:text-stream-accent"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Sudah punya akun? Login"
              : "Belum punya akun? Daftar"}
          </Button>
        </form>
      </div>
    </div>
  );
};