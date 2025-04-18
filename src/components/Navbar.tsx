"use client"

import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { UserToggle } from "./user/user-toggle";
import { signIn, useSession } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    if (pathname.startsWith('/auth') || pathname === "/404") {
        return null;
    }

    return (
        <header className="w-full shadow-sm border-b">
            <nav className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                    <Image src={"/logo.png"} alt="Logo" width={35} height={35} />
                    <a href="/" className="text-lg font-semibold">LMS</a>
                </div>
                <div className="flex justify-end items-center gap-3">
                    {status === "authenticated" && <ModeToggle />}
                    {status === "loading" && <LoaderCircle className="animate-spin text-gray-300" />}
                    {status === "authenticated" && <UserToggle session={session} />}
                    {status === "unauthenticated" &&
                        <Button variant={"outline"} className="py-5" onClick={() => signIn("", { redirectTo: pathname })}>
                            Login with Microsoft 365
                        </Button>
                    }
                </div>
            </nav>
        </header>
    );
}