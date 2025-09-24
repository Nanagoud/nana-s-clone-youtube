

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

import { toast } from "sonner"
import * as Y from 'yjs'
import { BotIcon, MessageCircleCode } from "lucide-react"
import Markdown from "react-markdown"
function ChatDocument({ doc }: { doc: Y.Doc }) {
    const [isopen, setIsOpen] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()
    const [input, setInput] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [question, setQuestion] = useState<string>('');

    const handleAskQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        setQuestion(input);
        startTransition(async () => {
            const documentData = doc.get('document-store').toJSON();

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document: documentData,
                    question: input,
                }),
            })
            if (res.ok) {
                const data = await res.json()
                setInput('')
                setSummary(data.response)
                console.log(data.response)
                toast.success("Question answered successfully!")
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
                <DialogTrigger>
                    <MessageCircleCode />
                    Chat to document
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat to document</DialogTitle>
                    <DialogDescription>
                        Ask the question and chat to document with AI
                    </DialogDescription>
                    <hr className='mt-5' />
                    {question && <p className='mt-5 text-gray-500'>Q: {question}</p>}
                </DialogHeader>
                {
                    summary && (
                        <div className='flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100'>
                            <div className='flex'>
                                <BotIcon className='w-10 flex-shrink-0' />
                                <p className='font-bold'>
                                    GPT {isPending ? 'is thinking...' : 'Says'}
                                </p>
                            </div>
                            {isPending ? (
                                <p>Thinking...</p>
                            ) : (
                                <Markdown>{summary}</Markdown>
                            )}

                        </div>
                    )
                }
                <form className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="i.e what is this about?"
                        className="w-full"
                        name="question"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" disabled={isPending || !input}
                        onClick={handleAskQuestion}
                    >
                        {isPending ? 'Thinking...' : 'Ask'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default ChatDocument
