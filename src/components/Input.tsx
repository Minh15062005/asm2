import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border rounded-lg px-3 py-2 w-full ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
