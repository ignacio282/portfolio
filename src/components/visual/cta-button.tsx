import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { MotionButton } from "@/components/motion/motion-button";
import { cn } from "@/lib/cn";

const buttonVariants = {
  solid: "ui-button",
  outline: "ui-button-outline"
};

export function CTAButton({
  children,
  className,
  asChild = false,
  variant = "solid",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
}) {
  const classes = cn(buttonVariants[variant], className);

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return (
      <MotionButton>
        {cloneElement(child, {
          className: cn(child.props.className, classes)
        })}
      </MotionButton>
    );
  }

  return (
    <MotionButton>
      <a className={classes} {...props}>
        {children}
      </a>
    </MotionButton>
  );
}
