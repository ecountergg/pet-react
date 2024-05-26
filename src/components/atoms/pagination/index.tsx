import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/clsx";
import { IButtonProps } from "@/components/atoms/button/index";
import { buttonVariants } from "@/components/atoms/button/class";

const APagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-end", className)}
    {...props}
  />
);
APagination.displayName = "APagination";

const APaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
APaginationContent.displayName = "APaginationContent";

const APaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
APaginationItem.displayName = "APaginationItem";

type PaginationLinkProps = {
  disabled?: boolean;
  isActive?: boolean;
} & Pick<IButtonProps, "size"> &
  React.ComponentProps<"a">;

const APaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    role="button"
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
APaginationLink.displayName = "APaginationLink";

const APaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof APaginationLink>) => (
  <APaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </APaginationLink>
);
APaginationPrevious.displayName = "APaginationPrevious";

const APaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof APaginationLink>) => (
  <APaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </APaginationLink>
);
APaginationNext.displayName = "APaginationNext";

const APaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
APaginationEllipsis.displayName = "APaginationEllipsis";

export {
  APagination,
  APaginationContent,
  APaginationEllipsis,
  APaginationItem,
  APaginationLink,
  APaginationNext,
  APaginationPrevious,
};
