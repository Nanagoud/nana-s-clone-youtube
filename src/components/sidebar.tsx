'use client'

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./newDocumentbutton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
} from "@clerk/nextjs";
import { collectionGroup, where, query, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import SideBarOption from "./sideBarOption";



interface RoomDocument extends DocumentData {
  createdAt: string,
  userId: string
  role: 'owner' | 'editor'
  roomId: string
}

export default function SidebarPage() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[]
    editor: RoomDocument[]
  }>({
    owner: [],
    editor: []
  })

  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress;

  const roomsQuery = user && query(
    collectionGroup(db, 'rooms'),
    where('userId', '==', email)
  )


  const [data] = useCollection(roomsQuery);


  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>((acc, doc) => {
      const roomData = doc.data() as RoomDocument;
      const item = { id: doc.id, ...roomData };
      if (roomData.role === 'owner') acc.owner.push(item);
      else acc.editor.push(item);
      return acc;
    }, { owner: [], editor: [] });

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      <div className="flex flex-col py-2 space-y-4 md:max-w-45">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No documents found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              Owned Documents
            </h2>
            {groupedData.owner.map((doc) => (
              <SideBarOption key={doc.id} id={doc.id} href={`/docs/${doc.id}`} />
            ))}
          </>
        )}
      </div>
      {/* shared with me  */}
      <div className="flex flex-col py-2 space-y-4">
        <h2 className="text-gray-500 font-semibold text-sm">
          Shared with Me
        </h2>
        {groupedData.editor.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No documents found
          </h2>
        ) : (
          <>
            {groupedData.editor.map((doc) => (
              <SideBarOption key={doc.id} id={doc.id} href={`/docs/${doc.id}`} />
            ))}
          </>
        )}
      </div>
      {/* List ....*/}
    </>
  );
  return (
    <div className="p-2 md:p-5 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-1 hover:opacity-30 rounded-lg"
              size={40}
            />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-1/2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <SheetHeader>
              <SheetTitle className="text-gray-900 dark:text-gray-100">Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  )

}
