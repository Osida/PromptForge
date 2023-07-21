"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {logo, profile1} from "@/public";
import {linksData, navData} from "@/constants";
import {signIn, signOut, useSession} from "next-auth/react";

const Navbar = () => {
    const {data: session} = useSession();

    return (
        <nav className="navbar container flex items-center pt-5 bg-base-100">
            <Link href={linksData.homeHref}>
                <div className="avatar btn btn-md btn-ghost btn-circle">
                    <Image src={logo.src} fill={true} alt={"Logo Image"} className={"rounded-full"}/>
                </div>
            </Link>

            <div className="flex-1 ml-2">
                <h2 className="hidden font-bold text-xl sm:inline-flex">{navData.logoName}</h2>
            </div>

            <div className="flex-none gap-4">
                {session?.user ? (
                    <>
                        <CreatePostLink/>
                        <SignOutButton/>
                        <ProfileLink profileImage={session?.user?.image}/>
                        <MobileDropdown profileImage={session?.user?.image}/>
                    </>
                ) : (
                    <SignInButton/>
                )}
            </div>
        </nav>
    );
};

// Helper component for Create Post link
const CreatePostLink = () => (
    <Link href={linksData.createPromptHref}>
        <button className="hidden sm:inline-flex nav-button font-bold text-base-100 bg-gradient-pink-lime">
            {navData.createPromptButton}
        </button>
    </Link>
);

// Helper component for Sign Out button
const SignOutButton = () => (
    <button onClick={() => signOut({callbackUrl: "/"})} className="hidden sm:inline-flex nav-button">
        {navData.signOutButton}
    </button>
);

// Helper component for Profile link
const ProfileLink = ({profileImage}: { profileImage: string | null | undefined }) => (
    <Link href={linksData.profileHref}>
        <div className="hidden avatar btn btn-md btn-ghost btn-circle sm:inline-flex">
            <Image src={profileImage || profile1.src} fill={true} alt={"Profile Image"} className={"rounded-full"}/>
        </div>
    </Link>
);

// Helper component for Mobile Dropdown
const MobileDropdown = ({profileImage}: { profileImage: string | null | undefined }) => (
    <aside className="dropdown dropdown-end sm:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <Image src={profileImage || profile1.src} fill={true} alt={"Profile Image"} className={"rounded-full"}/>
                </div>
            </div>
        </label>
        <ul tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52">
            <li key="profile" className="justify-between">
                <Link href={linksData.profileHref}>{navData.profileLink}</Link>
            </li>
            <li key="create-prompt">
                <Link href={linksData.createPromptHref}>{navData.createPromptButton}</Link>
            </li>
            <li key="sign-out">
                <button onClick={() => signOut({callbackUrl: "/"})} className={"mt-4 nav-button"}>
                    {navData.signOutButton}
                </button>
            </li>
        </ul>
    </aside>
);

// Helper component for Sign In button
const SignInButton = () => (
    <button onClick={() => signIn("google")} className="nav-button">
        {navData.signInButton}
    </button>
);


export default Navbar;
