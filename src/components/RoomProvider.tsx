'use client'
import {ClientSideSuspense, RoomProvider} from "@liveblocks/react/suspense"
import LoadingSpinner from "./LoadingSpinner"
import LiveCursorProviderPage from "./LiveCursorProvider"
export default function RoomProviderPage({
    roomId,
    children}: {
        roomId: string,
        children: React.ReactNode
    }) {
  return (
    <RoomProvider id={roomId} 
    initialPresence={{cursor: null}}>
        <ClientSideSuspense
        fallback={<LoadingSpinner/>}
        >
            <LiveCursorProviderPage>{children}</LiveCursorProviderPage>
            </ClientSideSuspense>
    </RoomProvider>
  )
}
