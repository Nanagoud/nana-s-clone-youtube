"use client"

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle-button";
import BreadCrumbs from "./breadcrums";

export default function Header() {
    const { user } = useUser();
    console.log(user)
    return (
        <div className="flex justify-between items-center p-5 border-b shadow-sm">
            {user ? (
                // header
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {user.firstName}&apos;s space
                </h1>

            ) : (
                "Space"
            )}

            <BreadCrumbs/>

            <div className="flex gap-4 items-center">
                <SignedIn>
                    <UserButton />
                    {/* <SignOutButton>Sign Out</SignOutButton> */}
                </SignedIn>
                <SignedOut>
                    <SignInButton>Sign In</SignInButton>
                </SignedOut>
                <ThemeToggle />
            </div>
        </div>
    );
}
