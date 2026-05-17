import { ReactNode } from "react";

export interface LoginTextProps {
  title: string;
  description: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  forgotPasswordHref?: string;
}

export interface SocialButtonProps {
  children: ReactNode;
  icon: ReactNode;
}
