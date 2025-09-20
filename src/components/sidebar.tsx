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
import { collectionGroup, where, query, getDocs} from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";


type DocumentData = {
  id: string
}
interface RoomDocument extends DocumentData {
  createdAt: string,
  userId: string
  role: 'owner' | 'editor'
  roomId: string
}

export default function SidebarPage() {
  const { isLoaded, isSignedIn, user } = useUser();
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

  console.log(email)
  const roomsQuery = user && query(
  collectionGroup(db, 'rooms'),
  where('userId', '==', email)
)


const [data, loading, error] = useCollection(roomsQuery);


  useEffect(() => {
  if (!data) return;

  const grouped = data.docs.reduce<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>((acc, doc) => {
    const roomData = doc.data() as Omit<RoomDocument, 'id'>;
    const item: RoomDocument = { id: doc.id, ...roomData };
    if (roomData.role === 'owner') acc.owner.push(item);
    else acc.editor.push(item);
    return acc;
  }, { owner: [], editor: [] });

  setGroupedData(grouped);
}, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      {groupedData.owner.length === 0 ? (
        <div className="text-center">
          You have no documents
        </div>
      ) : (
        <>
          {groupedData.owner.map((doc) => (
            <div key={doc.id}>
              {doc.roomId}
            </div>
          ))}
        </>
      )}
      {/* List ....*/}
    </>
  );
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-1 hover:opacity-30 rounded-lg"
              size={40}
            />
          </SheetTrigger>
          <SheetContent side="left" className="w-1/2 bg-gray-200">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="">
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  )
}
