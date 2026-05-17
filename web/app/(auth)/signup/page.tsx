import { SignupForm } from "@/components/signup/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <div className="relative flex items-center justify-center min-h-svh overflow-y-auto bg-background selection:bg-primary/30 py-6">
      <SignupForm />
    </div>
  );
}
