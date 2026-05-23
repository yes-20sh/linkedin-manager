"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function SignupForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    if (!email) return;
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  return (
    <div className="relative z-10 w-full max-w-sm p-4 sm:p-8">
      <div className="space-y-2 text-center pb-6">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight text-foreground drop-shadow-sm">
          Create an Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to sign up for Linkedin Manager
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium leading-none text-foreground/90">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium leading-none text-foreground/90">
            Email Address
          </Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all"
            />
            <Button
              type="button"
              onClick={handleSendOtp}
              disabled={!email || otpSent || otpLoading}
              className="h-10 px-3 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-[0.98] disabled:opacity-50 shrink-0"
            >
              {otpLoading ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
            </Button>
          </div>
        </div>

        {/* OTP Input Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="otp"
              className={`text-sm font-medium leading-none transition-colors ${
                otpSent ? "text-foreground/90" : "text-muted-foreground/60"
              }`}
            >
              One-Time Password (OTP)
            </Label>
            {!otpSent && (
              <span className="text-[10px] text-muted-foreground/70">
                Send OTP to unlock
              </span>
            )}
          </div>
          <Input
            id="otp"
            type="text"
            placeholder={otpSent ? "Enter 6-digit OTP" : "OTP locked"}
            disabled={!otpSent}
            maxLength={6}
            className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium leading-none text-foreground/90">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-foreground/90">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all"
          />
        </div>

        {/* Sign Up Button */}
        <Button className="w-full mt-2 h-10 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] border-none">
          Sign up
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-border" />
          </div>

          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-background px-3 text-muted-foreground backdrop-blur-md">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full h-10 text-sm transition-all bg-secondary/10 border-border text-foreground hover:bg-secondary/20 hover:text-foreground backdrop-blur-sm"
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Sign up with Google
        </Button>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline transition-all"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
