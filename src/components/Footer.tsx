"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith('/auth') || pathname === "/404") {
        return null;
    }

    return (
        <footer className="w-full border-t">
            <div className="max-w-screen-xl mx-auto px-4 py-2 text-center text-sm">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
}