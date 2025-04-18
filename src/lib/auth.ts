import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID!,
            authorization: {
                params: {
                    prompt: "select_account",
                    scope: "openid profile email offline_access User.Read",
                    response_type: "code"
                },
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    scope: "openid profile email"
                },
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error"
    },
    theme: {
        colorScheme: "light",
        logo: "/logo.png",
        brandColor: "#000000",
        buttonText: "#ffffff",
    },
    session: {
        strategy: "database"
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;  // เพิ่ม ID ของผู้ใช้ใน session
            session.user.role = user.role;  // เพิ่ม role ของผู้ใช้ใน session

            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log("Redirect URL:", url, baseUrl);

            // ป้องกันการรีไดเรกต์ไปยัง /api/auth/signin ซ้ำ
            if (url === `${baseUrl}/api/auth/signin`) {
                return baseUrl; // รีไดเรกต์กลับไปที่ baseUrl (เช่น หน้า Home)
            }

            // รีไดเรกต์ไปยัง URL ที่เริ่มต้นด้วย baseUrl
            if (url.startsWith(baseUrl)) {
                return url;
            }

            // กรณีอื่น ๆ รีไดเรกต์กลับไปที่ baseUrl
            return baseUrl;
        }
    }
};