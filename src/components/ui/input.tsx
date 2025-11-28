import * as React from "react";
import { cn } from "../../utils/cn";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1 w-full">
        {/* Label */}
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>

        {/* Input */}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error && "border-destructive",
            className,
          )}
          {...props}
        />

        {/* Error */}
        {error && (
          <p id={errorId} className="text-xs text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "InputWithLabel";
