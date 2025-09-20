"use client"

import { createNewDocument } from "@/actions/actions"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation"
import { useTransition } from "react"

export default function NewDocumentButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
   const handleCreateNewDocument = () => {
    startTransition(async ()=> {
      // create new document
      const {docId} = await createNewDocument()
      router.push(`/docs/${docId}`)
    })
   }
  return (
    <div>
     <Button
     onClick={handleCreateNewDocument}
     disabled = {isPending}
     >
      {isPending ? "Creating..." : 'New Document'}
      </Button>
    </div>
  )
}
