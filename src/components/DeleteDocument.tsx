'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { deleteDoc } from "@/actions/actions"
import { toast } from "sonner"
function DeleteDocument() {
    const [isopen, setIsOpen] = useState<boolean>(false)
    const [isDeleting, startTransition] = useTransition()
    const pathName = usePathname();
    const router = useRouter();
    const handleDeleteDocument = async () => {
        const room = pathName.split('/').pop();
        if(!room) return;
        startTransition(async () => {
            const {success} = await deleteDoc(room);
            if(success) {
                setIsOpen(false);
                router.push('/');
                
                toast.success("Room Deleted successfully!")
            } else {
                toast.error("Failed to delete room")
            }
        })
    }
    return (
        <Dialog open={isopen} onOpenChange={setIsOpen}>
            <Button
                asChild
                variant="destructive"
            >
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This will delete the document and all its contents, removing
                        all
                        users from the document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button
                        type='button'
                        variant='destructive'
                        onClick={handleDeleteDocument}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant='secondary'>
                            Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDocument
