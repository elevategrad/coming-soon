"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "relative inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold backdrop-blur-md transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground shadow hover:shadow-lg",
        outline: "border border-foreground text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends Omit<
    HTMLMotionProps<"div">,
    keyof VariantProps<typeof badgeVariants>
  > {
  variant?: VariantProps<typeof badgeVariants>["variant"];
}

const animationProps: HTMLMotionProps<"div"> = {
  initial: { "--x": "100%" } as { [key: string]: string },
  animate: { "--x": "-100%" } as { [key: string]: string },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    duration: 3,
  },
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, children: childrenProp, ...props }, ref) => {
    const children = React.isValidElement(childrenProp)
      ? childrenProp
      : String(childrenProp);

    return (
      <motion.div
        ref={ref}
        {...animationProps}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        <span
          className="relative block text-current"
          style={{
            maskImage:
              "linear-gradient(-75deg, hsl(var(--primary)) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), hsl(var(--primary)) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
