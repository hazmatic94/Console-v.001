import { cloneElement, isValidElement, type ComponentPropsWithoutRef, type ElementType, type ReactElement, type ReactNode } from "react";

type TextProps<T extends ElementType = "span"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  truncate?: boolean;
  size?: "1" | "2" | "3";
  weight?: "regular" | "medium" | "bold";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const textSizes = {
  "1": "text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)]",
  "2": "text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)]",
  "3": "text-[length:var(--type-body02-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)]",
};

const weights = {
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

export function Text<T extends ElementType = "span">({ as, children, className = "", truncate = false, size, weight, ...props }: TextProps<T>) {
  const Component = as ?? "span";
  const classes = [size ? textSizes[size] : "", weight ? weights[weight] : "", truncate ? "truncate" : "", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

type HeadingProps<T extends ElementType = "h2"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: string;
  weight?: "regular" | "medium" | "bold";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Heading<T extends ElementType = "h2">({ as, children, className = "", weight, ...props }: HeadingProps<T>) {
  const Component = as ?? "h2";
  const classes = [weight ? weights[weight] : "", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

type ButtonProps = {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "1" | "2" | "3";
  type?: "button" | "submit" | "reset";
  variant?: string;
  color?: string;
};

export function Button({ asChild = false, children, className = "", disabled = false, type = "button" }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-[var(--spacing-8)] rounded-[var(--radius-sm)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] disabled:cursor-not-allowed disabled:opacity-45 ${className}`;

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, { className: `${classes} ${child.props.className ?? ""}` });
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
