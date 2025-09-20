'use client'

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { usePathname } from "next/navigation";
export default function SideBarOption({id, href}:
    {
        id: string;
        href: string;
    }

) {
    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== '/';

    if(!data) return null;
  return (
    <div>
      <Link href={href} className={`border text-center block p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-500"
      }`}>
      <p>{data?.title}</p>
      </Link>
    </div>
  )
}
