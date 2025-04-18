"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const handleProviderLogin = (provider: string) => {
        signIn(provider, { callbackUrl });
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <div className="space-y-6">

                <Image src={"/logo.png"} className="mx-auto" alt="Logo" width={64} height={64} />

                <div className="text-center">
                    <h1 className="text-2xl">ขอต้อนรับกลับมา</h1>
                </div>

                <Separator className="my-5" />

                <div className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full flex items-center py-5 gap-2"
                        onClick={() => handleProviderLogin("google")}
                    >
                        <Image src={"/google.png"} alt="Logo" width={30} height={30} />
                        ดำเนินการต่อด้วย Google
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full flex items-center py-5 gap-2"
                        onClick={() => handleProviderLogin("azure-ad")}
                    >
                        <Image src={"/365.png"} alt="Logo" width={30} height={30} />
                        ดำเนินการต่อด้วยบัญชี Microsoft
                    </Button>
                </div>

                <div className="text-xs text-center text-muted-foreground mt-6">
                    <a href="/" className="underline">
                        ไปหน้าแรก
                    </a>{" "}
                    |
                    <a href="#" className="underline ml-1">
                        นโยบายความเป็นส่วนตัว
                    </a>
                </div>
            </div>
        </div>
    );
}