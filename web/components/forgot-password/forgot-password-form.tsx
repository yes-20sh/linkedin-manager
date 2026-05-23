"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function ForgotPasswordForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");

  const handleSendOtp = () => {
    if (!identifier) return;
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
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to reset your account password
        </p>
      </div>

      <div className="space-y-4">
        {/* Email or Username */}
        <div className="space-y-2">
          <Label htmlFor="identifier" className="text-sm font-medium leading-none text-foreground/90">
            Email or Username
          </Label>
          <div className="flex gap-2">
            <Input
              id="identifier"
              type="text"
              placeholder="john@example.com or johndoe"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all"
            />
            <Button
              type="button"
              onClick={handleSendOtp}
              disabled={!identifier || otpSent || otpLoading}
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

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium leading-none text-foreground/90">
            New Password
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
            Confirm New Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="h-10 bg-secondary/20 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary/50 backdrop-blur-sm transition-all"
          />
        </div>

        {/* Forgot Password Button */}
        <Button className="w-full mt-2 h-10 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] border-none">
          Reset Password
        </Button>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Remember your password?{" "}
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
