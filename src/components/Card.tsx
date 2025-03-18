import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`bg-white shadow-lg rounded-lg p-4 ${className || ""}`}>{children}</div>;
};

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardSectionProps) => {
  return <div className={`mb-4 ${className || ""}`}>{children}</div>;
};

export const CardTitle = ({ children, className }: CardSectionProps) => {
  return <h2 className={`text-xl font-semibold ${className || ""}`}>{children}</h2>;
};

export const CardContent = ({ children, className }: CardSectionProps) => {
  return <div className={className || ""}>{children}</div>;
};
