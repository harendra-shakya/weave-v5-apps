import Link from "next/link";
import type { ReactNode } from "react";

/**
 * BackFilmButton — the primary CTA. Ember fill, restrained radius.
 * Defaults to the locked label "Back this film".
 */

const BASE =
  "inline-flex items-center justify-center rounded-sm bg-or-ember px-7 py-3 " +
  "font-sans text-base font-semibold text-or-paper transition-colors " +
  "hover:bg-or-ember-deep focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-or-ember " +
  "disabled:cursor-not-allowed disabled:opacity-60";

type Props = {
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export function BackFilmButton({
  href,
  type = "button",
  onClick,
  disabled,
  className = "",
  children = "Back this film",
}: Props) {
  if (href) {
    return (
      <Link href={href} className={`${BASE} no-underline ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE} ${className}`}
    >
      {children}
    </button>
  );
}
