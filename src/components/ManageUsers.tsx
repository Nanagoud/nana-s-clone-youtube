'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import {removeUserFromDocument } from "@/actions/actions"
import { useRoom } from "@liveblocks/react"
import { useUser } from "@clerk/nextjs"
import useOwner from "@/lib/useOwner"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "@/firebase"
function ManageUsers() {
    const room = useRoom();
    const {user} = useUser()
    const isOwner = useOwner()
    const [isopen, setIsOpen] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, 'rooms'), where('roomId', '==', room.id))
    )

    const handleDelete = async (userId: string) => {
        startTransition(async () => {
          if(!user) return;
         const {success} = await removeUserFromDocument(room.id, userId);
         if(success){
            toast.success('User removed successfully');
            setIsOpen(false);
         }
        })
    }
    return (
        <Dialog
            open={isopen}
            onOpenChange={setIsOpen}
        >
            <Button
                asChild
                variant="outline"
            >
                <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users with access</DialogTitle>
                    <DialogDescription>
                        Below is a list of users with access to this document
                    </DialogDescription>
                </DialogHeader>
                <hr className="my-2 border-gray-300 w-full"/>
                <div>
                    {usersInRoom?.docs.map((doc) => (
                        <div 
                        key={doc.data().userId}
                        className="flex items-center justify-between my-2">
                        <p className="font-light">
                            {
                                doc.data().userId === user?.emailAddresses[0].toString()
                                ? `You (${doc.data().userId})`
                                : doc.data().userId
                            }
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                            >
                                {doc.data().role}
                            </Button>
                            {isOwner && 
                            doc.data().userId !== user?.emailAddresses[0].toString() && (
                                <Button
                                    variant="destructive"
                                    disabled={isPending}
                                    onClick={() => handleDelete(doc.data().userId)}
                                    size="sm"
                                >
                                   {isPending ? 'Removing...' : 'X'}
                                </Button>
                            )}
                        </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ManageUsers
