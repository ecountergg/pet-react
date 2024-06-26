import * as React from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { cn } from "@/lib/clsx";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  `
    flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm
    ring-offset-background file:border-0 file:bg-transparent file:text-sm
    file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      inputSize: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const AInput = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, inputSize, type, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(inputVariants({ inputSize, className }))}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

const AFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  type,
  control,
  name,
  className,
  defaultValue,
  ...props
}: UseControllerProps<TFieldValues, TName> & IInputProps) => {
  const {
    field: { value, onChange: onChange },
    fieldState,
  } = useController({
    name,
    control,
    // @ts-expect-error
    defaultValue: defaultValue ?? "",
  });
  return (
    <>
      <input
        {...props}
        type={type}
        className={cn(inputVariants({ className }))}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {fieldState.error && (
        <small className="text-red-700">{fieldState.error?.message}</small>
      )}
    </>
  );
};

export { AInput, AFormInput };
