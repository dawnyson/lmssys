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
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`

            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url

            return baseUrl
        }
    }
};