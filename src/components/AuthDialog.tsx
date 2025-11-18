import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useApp } from "../context/AppContext";
import { Loader2 } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

export function AuthDialog({ open, onOpenChange, defaultTab = "login" }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  
  // Синхронізуємо activeTab з defaultTab коли діалог відкривається
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login, register } = useApp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        onOpenChange(false);
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setError("Невірний email або пароль");
      }
    } catch (err) {
      setError("Помилка входу. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const success = await register(registerName, registerEmail, registerPassword);
      if (success) {
        onOpenChange(false);
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
      } else {
        setError("Перевірте правильність введених даних");
      }
    } catch (err) {
      setError("Помилка реєстрації. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  console.log("AuthDialog render - open:", open, "defaultTab:", defaultTab, "activeTab:", activeTab);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Tabs value={activeTab} onValueChange={(v) => {
          console.log("Tab changed to:", v);
          setActiveTab(v as "login" | "register");
        }} className="mt-2">
          <TabsList className="flex w-full bg-transparent p-0 gap-2 h-auto">
            <TabsTrigger 
              value="register"
              className={`flex-1 rounded-xl font-semibold transition-all duration-200 py-3 px-6 ${
                activeTab === "register" 
                  ? "bg-[#00D084] text-white shadow-lg shadow-[#00D084]/30" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              Реєстрація
            </TabsTrigger>
            <TabsTrigger 
              value="login"
              className={`flex-1 rounded-xl font-semibold transition-all duration-200 py-3 px-6 ${
                activeTab === "login" 
                  ? "bg-[#00D084] text-white shadow-lg shadow-[#00D084]/30" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              Вхід
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-5 mt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-semibold text-[#0A2540]">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 border-2 border-gray-200 focus:border-[#00D084] rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-semibold text-[#0A2540]">
                  Пароль
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Мінімум 6 символів"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="h-12 border-2 border-gray-200 focus:border-[#00D084] rounded-xl"
                />
              </div>
              {error && activeTab === "login" && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl h-12 text-base font-semibold shadow-lg shadow-[#00D084]/30"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Вхід...
                  </>
                ) : (
                  "Увійти"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-5 mt-6">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-sm font-semibold text-[#0A2540]">
                  Ім'я
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Ваше ім'я"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 border-2 border-gray-200 focus:border-[#00D084] rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-sm font-semibold text-[#0A2540]">
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 border-2 border-gray-200 focus:border-[#00D084] rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-sm font-semibold text-[#0A2540]">
                  Пароль
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Мінімум 6 символів"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="h-12 border-2 border-gray-200 focus:border-[#00D084] rounded-xl"
                />
              </div>
              {error && activeTab === "register" && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl h-12 text-base font-semibold shadow-lg shadow-[#00D084]/30"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Реєстрація...
                  </>
                ) : (
                  "Зареєструватися"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

