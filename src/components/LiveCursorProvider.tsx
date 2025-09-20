import { useMyPresence, useOthers } from "@liveblocks/react/suspense"
import React from "react"

import FollowPointer from "./FollowPointer"

function LiveCursorProviderPage({ children }: { children: React.ReactNode }) {
    const [myPresence, setMyPresence] = useMyPresence()
    const others = useOthers()

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const cursor = {
            x: Math.floor(event.pageX),
            y: Math.floor(event.pageY)
        }
        setMyPresence({ cursor })
    }

    const handlePointerLeave = () => {
        setMyPresence({ cursor: null })
    }

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {/* Render cursors */}
            {others.filter((other) => other.presence.cursor).map(({connectionId, presence, info}) => (
                <FollowPointer 
                key = {connectionId}
                info={info}
                x = {presence.cursor!.x}
                y = {presence.cursor!.y} >

                </FollowPointer>
                
            ))}
            {children}
        </div>
    )
}

export default LiveCursorProviderPage
