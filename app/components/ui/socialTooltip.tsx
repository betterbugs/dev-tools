import React from "react";
import { cn } from "@/app/libs/helpers";


export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {

    const baseIconStyles =
      "relative flex items-center justify-center w-12 h-12 rounded-full bg-background overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg";
    const baseSvgStyles =
      "relative z-10 w-7 h-7 text-foreground transition-colors duration-300 ease-in-out group-hover:text-white";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute bottom-[-30px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-sm text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-40px] group-focus-within:opacity-100 group-focus-within:visible group-focus-within:bottom-[-40px] font-normal";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-4", className)}
        {...props}
      >
        {items.map((item) => {
          const tooltipId = `tooltip-${item.href.replace(/[^a-zA-Z0-9]/g, '-')}`;
          return (
          <li key={item.href} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              aria-describedby={tooltipId}
              className={cn(baseIconStyles)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <item.Icon className={cn(baseSvgStyles)} />
            </a>
            <div
              id={tooltipId}
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
              role="tooltip"
            >
              {item.tooltip}
            </div>
          </li>
          );
        })}
      </ul>
    );
  }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };