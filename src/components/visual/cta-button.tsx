import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { MotionButton } from "@/components/motion/motion-button";
import { cn } from "@/lib/cn";

const buttonClass =
  "ui-button";

export function CTAButton({
  children,
  className,
  asChild = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const classes = cn(buttonClass, className);

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
