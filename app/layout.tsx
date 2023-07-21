import React from "react";
import type {Metadata} from "next";
import "@/styles/globals.css";
import {fonts} from "@/public";
import {Navbar} from "../components";
import AuthProvider from "@/lib/nextauth/AuthProvider";
import QueryProvider from "@/lib/tanstack-query/QueryProvider";

interface IRootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "PromptForge",
    description: "Unleash creativity with PromptForge, a pioneering platform for AI conversations. Create, share, and manage custom prompts, unlocking AI tool potential. Enjoy intelligent search, user-friendly prompt management, and a minimalist design. Join us to shape AI-powered conversations, one prompt at a time.",
};

export default function RootLayout({children}: IRootLayoutProps) {
    return (
        <html data-theme="light" lang="en">
        <body className={fonts.montserrat.className}>
        <AuthProvider>
            <QueryProvider>
                <Navbar/>
                {children}
            </QueryProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
