import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserIcon, KeyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ViewerData = {
  username: string;
  password: string;
  uniqueId: string;
};

export const ViewerAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [recoveryUniqueId, setRecoveryUniqueId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      handlePasswordRecovery();
      return;
    }

    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleRegister = () => {
    if (!username.trim() || !password.trim() || !uniqueId.trim()) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    const viewers: ViewerData[] = JSON.parse(localStorage.getItem("viewers") || "[]");
    
    if (viewers.some(viewer => viewer.username === username)) {
      toast({
        title: "Error",
        description: "Username sudah digunakan",
        variant: "destructive",
      });
      return;
    }

    viewers.push({ username, password, uniqueId });
    localStorage.setItem("viewers", JSON.stringify(viewers));
    localStorage.setItem("currentViewer", username);
    
    toast({
      title: "Registrasi Berhasil",
      description: "Simpan ID unik Anda: " + uniqueId,
    });
    navigate("/");
  };

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Username dan password harus diisi",
        variant: "destructive",
      });
      return;
    }

    const viewers: ViewerData[] = JSON.parse(localStorage.getItem("viewers") || "[]");
    const viewer = viewers.find(v => v.username === username && v.password === password);

    if (!viewer) {
      toast({
        title: "Error",
        description: "Username atau password salah",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("currentViewer", username);
    toast({
      title: "Login Berhasil",
      description: `Selamat datang kembali, ${username}!`,
    });
    navigate("/");
  };

  const handlePasswordRecovery = () => {
    if (!recoveryUniqueId.trim()) {
      toast({
        title: "Error",
        description: "Masukkan ID unik Anda",
        variant: "destructive",
      });
      return;
    }

    const viewers: ViewerData[] = JSON.parse(localStorage.getItem("viewers") || "[]");
    const viewer = viewers.find(v => v.uniqueId === recoveryUniqueId);

    if (!viewer) {
      toast({
        title: "Error",
        description: "ID unik tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Ditemukan",
      description: `Password Anda: ${viewer.password}`,
    });
    setIsForgotPassword(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stream-DEFAULT">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-stream-secondary p-8 shadow-lg animate-fade-in">
        <div className="text-center">
          {isForgotPassword ? (
            <KeyIcon className="mx-auto h-12 w-12 text-stream-accent" />
          ) : (
            <UserIcon className="mx-auto h-12 w-12 text-stream-accent" />
          )}
          <h2 className="mt-6 text-3xl font-bold text-stream-text">
            {isForgotPassword
              ? "Pemulihan Password"
              : isRegistering
              ? "Daftar Viewer Baru"
              : "Login Viewer"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isForgotPassword
              ? "Masukkan ID unik Anda"
              : isRegistering
              ? "Buat akun viewer baru"
              : "Masuk dengan akun yang sudah ada"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isForgotPassword && (
            <>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="bg-stream-DEFAULT border-gray-700 text-stream-text"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-stream-DEFAULT border-gray-700 text-stream-text"
              />
            </>
          )}
          
          {isRegistering && (
            <Input
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              placeholder="ID Unik (untuk pemulihan password)"
              className="bg-stream-DEFAULT border-gray-700 text-stream-text"
            />
          )}

          {isForgotPassword && (
            <Input
              type="text"
              value={recoveryUniqueId}
              onChange={(e) => setRecoveryUniqueId(e.target.value)}
              placeholder="Masukkan ID Unik Anda"
              className="bg-stream-DEFAULT border-gray-700 text-stream-text"
            />
          )}

          <Button
            type="submit"
            className="w-full bg-stream-accent hover:bg-stream-accent/90 text-white"
          >
            {isForgotPassword
              ? "Pulihkan Password"
              : isRegistering
              ? "Daftar"
              : "Masuk"}
          </Button>

          {!isForgotPassword && (
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
          )}

          {!isRegistering && !isForgotPassword && (
            <Button
              type="button"
              variant="ghost"
              className="w-full text-stream-text hover:text-stream-accent"
              onClick={() => setIsForgotPassword(true)}
            >
              Lupa Password?
            </Button>
          )}

          {isForgotPassword && (
            <Button
              type="button"
              variant="ghost"
              className="w-full text-stream-text hover:text-stream-accent"
              onClick={() => setIsForgotPassword(false)}
            >
              Kembali ke Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};