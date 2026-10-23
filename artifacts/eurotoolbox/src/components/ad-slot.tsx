import { type ReactNode } from 'react';

/**
 * Global control for ad rendering.
 * Set to false by default as required during AdSense review.
 * No ad scripts or network calls will execute when this is false.
 */
export const ADS_ENABLED = false;

interface AdSlotProps {
  id?: string;
  className?: string;
  fallback?: ReactNode;
}

export function AdSlot({ id = 'ad-slot', className = '', fallback = null }: AdSlotProps) {
  if (!ADS_ENABLED) {
    return null;
  }

  return (
    <div
      id={id}
      data-ad-slot={id}
      className={`my-8 flex min-h-[90px] w-full items-center justify-center rounded-lg border border-border/60 bg-muted/20 p-4 text-center text-xs text-muted-foreground ${className}`}
    >
      {fallback ?? <span>Advertisement</span>}
    </div>
  );
}

export default AdSlot;
