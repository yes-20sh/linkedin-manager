import { LoginForm } from "@/components/login/login-form";
import { Metadata } from "next";

const LoginPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-svh overflow-y-auto bg-background selection:bg-primary/30 py-6">
      <LoginForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default LoginPage;
