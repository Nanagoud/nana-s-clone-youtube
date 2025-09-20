'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition, useEffect} from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useRouter } from "next/navigation"
export default function Document({id}: {id: string}) {
    const [title, setTitle] = useState<string>('')
    const [isUpdating, startTransition] = useTransition();
    const [data] = useDocumentData(doc(db, 'documents', id));
    useEffect(() => {
        if(data) {
            setTitle(data.title)
        }
    }, [data])

    const router = useRouter();

    const updateTitle = (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        if(title.trim()) {
            startTransition(async ()=> {
                await updateDoc(doc(db, 'documents', id), {
                    title
                })
                router.refresh();
            });
        }
    }
  return (
    <div>
    <div className="flex max-w-5xl mx-auto justify-between pb-5">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2">
            <Input type="text" placeholder="Untitled"
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="" />
            <Button  type="submit" disabled={isUpdating}>Update</Button>
        </form>
    </div>
    </div>
  )
}
