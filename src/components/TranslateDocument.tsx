'use client'
import * as Y from 'yjs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { BotIcon, LanguagesIcon } from 'lucide-react'
import { toast } from 'sonner'
import MarkDown from 'react-markdown'
type Language =
  | 'english'
  | 'spanish'
  | 'german'
  | 'chinese'
  | 'japanese'
  | 'portuguese'
  | 'french'
  | 'arabic'
  | 'hindi'
  | 'korean'
  | 'italian'
  | 'russian';

const languages: Language[] = [
  'english',
  'spanish',
  'german',
  'chinese',
  'japanese',
  'portuguese',
  'french',
  'arabic',
  'hindi',
  'korean',
  'italian',
  'russian',
]




function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isopen, setIsOpen] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [question] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const documentData = doc.get('document-store').toJSON();
      const plainText = documentData.replace(/<[^>]+>/g, '').trim();
      console.log(plainText)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: plainText,
          targetLanguage: language
        }),
      })
      if (res.ok) {
        const { translated_text } = await res.json()
        setSummary(translated_text)
        console.log(translated_text)
        toast.success("Translated summary successfully!")
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
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the document</DialogTitle>
          <DialogDescription>
            Select the language and AI will translate a summary of the
            document in selected language
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
                <MarkDown>{summary}</MarkDown>
              )}

            </div>
          )
        }
        <form className="flex gap-2">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={isPending || !language}
            onClick={handleAskQuestion}
          >
            {isPending ? 'Translating...' : 'Translate'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TranslateDocument
