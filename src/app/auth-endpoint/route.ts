import { adminDb } from "@/firebase-admin";
import liveBlocks from "@/lib/liveBlocks";
import { auth } from "@clerk/nextjs/server"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    auth.protect();
    const {sessionClaims } = await auth()


    const { room } = await req.json()
    const sessions = liveBlocks.prepareSession(sessionClaims!.email!, {
        userInfo: {
            name: sessionClaims!.fullName!,
            avatar: sessionClaims!.image!,
            email: sessionClaims!.email!
        }
    })
    const usersInRoom = await adminDb
        .collectionGroup('rooms')
        .where('userId', '==', sessionClaims!.email)
        .get()


    const userInRoom = usersInRoom.docs.find(doc => doc.id === room)

    if (userInRoom) {  // just check if found
        sessions.allow(room, sessions.FULL_ACCESS)
        const { body, status } = await sessions.authorize()
        return new Response(body, { status })
    } else {
        return NextResponse.json({ error: 'You are not a member of this room' }, { status: 403 })
    }


}