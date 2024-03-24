import React, { forwardRef } from "react";
import clsx from "clsx";

export type LoadingProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  variant?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
};

export const Loading = forwardRef<HTMLSpanElement, LoadingProps>(
  (
    { size, variant = "spinner", color, className, style, ...props },
    ref,
  ): JSX.Element => {
    const classes = clsx("loading", {
      className,
      "loading-lg": size === "lg",
      "loading-md": size === "md",
      "loading-sm": size === "sm",
      "loading-xs": size === "xs",
      "loading-spinner": variant === "spinner",
      "loading-dots": variant === "dots",
      "loading-ring": variant === "ring",
      "loading-ball": variant === "ball",
      "loading-bars": variant === "bars",
      "loading-infinity": variant === "infinity",
      "text-primary": color === "primary",
      "text-secondary": color === "secondary",
      "text-accent": color === "accent",
    });

    return <span {...props} ref={ref} className={classes} style={style} />;
  },
);

Loading.displayName = "Loading";
