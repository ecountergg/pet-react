import { cn } from "@/lib/clsx";

function ASkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-400", className)}
      {...props}
    />
  );
}

export { ASkeleton };
