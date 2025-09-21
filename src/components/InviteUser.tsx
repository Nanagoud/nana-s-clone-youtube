'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"

import { toast } from "sonner"
import { inviteUserToDocument } from "@/actions/actions"
function InviteUser() {
    const [isopen, setIsOpen] = useState<boolean>(false)
    const [isInviting, startTransition] = useTransition()
    const pathName = usePathname();
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const handleInviteUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        const room = pathName.split('/').pop();
        if (!room) return;
        startTransition(async () => {
            const { success } = await inviteUserToDocument(room, email);
            if (success) {
                setIsOpen(false);
                setEmail('');
                router.refresh();
                toast.success("User invited successfully!")
            } else {
                toast.error("Failed to invite user")
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
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                    <DialogDescription>
                        Enter the email address of the user you want to invite
                    </DialogDescription>
                </DialogHeader>
                <form  className="flex gap-2">
                    <Input
                        type="email"
                        placeholder="Enter email address"
                        className="w-full"
                        value={email}
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" disabled={isInviting || !email}
                    onClick={handleInviteUser}
                    >
                        {isInviting ? 'Inviting...' : 'Invite'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteUser
