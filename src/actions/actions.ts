/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { auth } from '@clerk/nextjs/server';
import { adminDb } from '../firebase-admin';
import liveBlocks from '@/lib/liveBlocks';
export async function createNewDocument() {
    auth.protect();
    const { sessionClaims } = await auth();
    const docCollectionRef = adminDb.collection('documents');
    const docRef = await docCollectionRef.add({
        title: 'New Document',
        createdAt: new Date(),
    })
    if (!sessionClaims?.email) {
        throw new Error('No email in session claims');
    }

    await adminDb
    .collection('users')
    .doc(sessionClaims.email)
    .collection('rooms')
    .doc(docRef.id)
    .set({
        userId: sessionClaims.email,
        role: 'owner',
        createdAt: new Date(),
        roomId: docRef.id
    })

    return {
        docId: docRef.id
    }
}


export async function deleteDoc(roomId: string) {
    auth.protect();
    const { sessionClaims } = await auth();
    if (!sessionClaims?.email) {
        throw new Error('No email in session claims');
    }
    console.log("Delete document", roomId)
    try {
        await adminDb.collection('documents').doc(roomId).delete();
        const query = await adminDb.collection('rooms')
        .where('roomId', '==', roomId)
        .get();
        const batch = adminDb.batch();
        query.docs.forEach(doc => {
            batch.delete(doc.ref);
        })
        await batch.commit();

        //delete room from liveblocks
        await liveBlocks.deleteRoom(roomId);
        return {
            success: true
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false
        }
    }
}

export async function  inviteUserToDocument(roomId: string, email: string) {
    auth.protect();
    console.log("Invite user to document", roomId, email)
    try {
         await adminDb
        .collection('users')
        .doc(email)
        .collection('rooms')
        .doc(roomId)
        .set({
            userId: email,
            role: 'editor',
            createdAt: new Date(),
            roomId
        })
        return {
            success: true
        }
        
    } catch (error) {
     return {
        success: false
     }   
    }
    
}

export async function removeUserFromDocument(roomId: string, email: string) {
    auth.protect();
    console.log("Remove user from document", roomId, email)
    try {
         await adminDb
        .collection('users')
        .doc(email)
        .collection('rooms')
        .doc(roomId)
        .delete();
        return {
            success: true
        }
        
    } catch (error) {
     return {
        success: false
     }   
    }
    
}
    