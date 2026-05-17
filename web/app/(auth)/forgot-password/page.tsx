import { ForgotPasswordForm } from "@/components/forgot-password/forgot-password-form";
import { Metadata } from "next";

const ForgotPasswordPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-svh overflow-y-auto bg-background selection:bg-primary/30 py-6">
      <ForgotPasswordForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your account password",
};

export default ForgotPasswordPage;
