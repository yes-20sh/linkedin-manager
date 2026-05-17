import React from "react";
import { Metadata } from "next";
import { LinkedinPostContainer } from "@/components/linkedin-post/linkedin-post-container";

export const metadata: Metadata = {
  title: "LinkedIn Posts - Linkedin Manager",
  description: "Compose, schedule, and use post templates for LinkedIn outreach.",
};

export default function LinkedinPostPage() {
  return <LinkedinPostContainer />;
}
