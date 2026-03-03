import React from 'react';

/** Skeleton placeholder rendered while a tool component is being lazy-loaded. */
const ToolSkeleton = (): JSX.Element => (
    <div
        role="status"
        aria-label="Loading tool…"
        className="animate-pulse w-full"
    >
        <div className="bg-white/5 rounded-xl p-6 w-full min-h-[340px] flex flex-col gap-4">
            {/* Simulated header bar */}
            <div className="h-6 bg-white/10 rounded-md w-1/3" />
            {/* Simulated input area */}
            <div className="h-40 bg-white/10 rounded-md w-full" />
            {/* Simulated button row */}
            <div className="flex gap-3">
                <div className="h-9 bg-white/10 rounded-md w-24" />
                <div className="h-9 bg-white/10 rounded-md w-24" />
            </div>
            {/* Simulated output area */}
            <div className="h-24 bg-white/10 rounded-md w-full" />
        </div>
    </div>
);

export default ToolSkeleton;
