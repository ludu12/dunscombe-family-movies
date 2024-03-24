import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";
import {Loading} from "@/ui/components/Loading";

export type ButtonMode =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "link"
  | "none";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: ButtonMode;
  outline?: boolean;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    mode = "primary",
    outline,
    active,
    loading,
    className,
    children,
    startIcon,
    endIcon,
    ...rest
  } = props;

  const classes = clsx(
    `btn`,
    {
      "text-white": mode === "primary",
      "btn-primary": mode === "primary",
      "btn-secondary": mode === "secondary",
      "btn-accent": mode === "accent",
      "btn-ghost": mode === "ghost",
      "btn-link": mode === "link",
      "btn-outline": outline,
      "btn-active": active,
    },
    className,
  );

  return (
    <button {...rest} className={classes}>
      {loading && <Loading />}
      {startIcon && !loading && startIcon}
      {children}
      {endIcon && endIcon}
    </button>
  );
};

export default Button;
