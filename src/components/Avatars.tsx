'use client'

import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
export default function Avatars() {
    const others = useOthers()
    const self = useSelf()
    const all = [...others, self]
    return (
        <div className="flex items-center gap-2">
            <p className="font-light text-sm">Users currently in this document</p>
            <div className="flex -space-x-5">
                {
                    all.map((other, i) => (
                        <Tooltip key={other.id + i}>
                            <TooltipTrigger>
                                <Avatar>
                                    <AvatarImage src={other.info.avatar} />
                                    <AvatarFallback>{other.info.name}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{self?.id === other.id ? 'You' : other.info.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))
                }
            </div>
        </div>
    )
}
