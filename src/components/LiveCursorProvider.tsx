import { useMyPresence, useOthers } from "@liveblocks/react/suspense"
import React, { useEffect } from "react"

import FollowPointer from "./FollowPointer"

function LiveCursorProviderPage({ children }: { children: React.ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setMyPresence] = useMyPresence()
    const others = useOthers()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMyPresence({
                cursor: {
                    x: e.clientX,
                    y: e.clientY
                }
            });
        };

        const handleMouseLeave = () => {
            setMyPresence({ cursor: null });
        };

        // Add a small delay to ensure the cursor is properly positioned
        const timer = setTimeout(() => {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            window.addEventListener('mouseleave', handleMouseLeave);
        }, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [setMyPresence]);

    return (
        <>
            {/* Cursor Layer - Fixed position overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 9999
            }}>
                {others.filter((other) => other.presence.cursor).map(({connectionId, presence, info}) => (
                    <FollowPointer 
                        key={connectionId}
                        info={info}
                        x={presence.cursor!.x}
                        y={presence.cursor!.y}
                    />
                ))}
            </div>
            
            {/* Content Layer */}
            <div style={{ position: 'relative', width: '100%', minHeight: '100%' }}>
                {children}
            </div>
        </>
    )
}

export default LiveCursorProviderPage
