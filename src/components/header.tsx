"use client"

import { useUser, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

export default function Header() {
    const { user } = useUser();
    return (
        <div className="flex justify-between items-center p-5 border-b shadow-sm">
            {user ?
                <h1 className="text-2xl font-bold">
                    {user.firstName} {`'s`} space
                </h1> : 'Space'}
            {/* {bread crumbs} */}
            <div className="flex gap-4">
                <SignedIn>
                    <UserButton></UserButton>
                    {/* <SignOutButton>Sign Out</SignOutButton> */}
                </SignedIn>
                <SignedOut>
                    <SignInButton>Sign In</SignInButton>
                </SignedOut>
            </div>
        </div>
    )
}
