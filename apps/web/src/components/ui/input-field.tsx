import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-brand-ink">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-[52px] rounded-input border bg-white px-4 text-[15px] text-brand-ink placeholder:text-brand-gray/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary",
            error ? "border-red-400" : "border-brand-input-border",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
InputField.displayName = "InputField";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, id, className, children, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-brand-ink">
          {label}
        </label>
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "h-[52px] rounded-input border bg-white px-4 text-[15px] text-brand-ink transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary",
            error ? "border-red-400" : "border-brand-input-border",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p id={`${selectId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
SelectField.displayName = "SelectField";
