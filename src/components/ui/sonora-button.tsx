import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sonoraButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
        hero: "bg-gradient-accent text-white hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        premium: "bg-gradient-primary text-white border border-primary/20 hover:border-primary/40 hover:shadow-elegant transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-primary bg-transparent text-primary hover:bg-primary/10 hover:text-primary",
        glow: "bg-primary text-primary-foreground shadow-glow hover:shadow-elegant hover:scale-105 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SonoraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sonoraButtonVariants> {
  asChild?: boolean;
}

const SonoraButton = React.forwardRef<HTMLButtonElement, SonoraButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(sonoraButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
SonoraButton.displayName = "SonoraButton";

export { SonoraButton, sonoraButtonVariants };