"use client"

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle-button";

export default function Header() {
    const { user } = useUser();
    console.log(user)
    return (
        <div className="flex justify-between items-center p-5 border-b shadow-sm">
            {user ? (
                <h1 className="text-2xl font-bold">{user.firstName}&apos;s space</h1>
            ) : (
                "Space"
            )}

            <div className="flex gap-4 items-center">
                <SignedIn>
                    <UserButton />
                    {/* <SignOutButton>Sign Out</SignOutButton> */}
                </SignedIn>
                <SignedOut>
                    <SignInButton>Sign In</SignInButton>
                </SignedOut>

                {/* 👇 add your theme toggle here */}
                {/* <ThemeToggle /> */}
            </div>
        </div>
    );
}
