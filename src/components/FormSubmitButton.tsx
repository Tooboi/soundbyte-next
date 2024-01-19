"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`bg-byte-600 hover:bg-byte-700 active:bg-byte-950 border-2 border-byte-700 active:border-byte-800 btn rounded-lg btn-block ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner loading-md" />}
      {children}
    </button>
  );
}