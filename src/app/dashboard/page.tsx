'use client'

import { useSession, signOut } from "next-auth/react"

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>⏳ กำลังโหลดข้อมูล...</div>;
    }

    if (!session) {
        return <div>🔒 กรุณาเข้าสู่ระบบ</div>;
    }

    return (
        <>
            <div>👋 ยินดีต้อนรับ {session.user.name} {session.user.role}</div>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
                ออกจากระบบ
            </button>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">ข้อมูลผู้ใช้:</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">ข้อมูลผู้ใช้:</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">ข้อมูลผู้ใช้:</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">ข้อมูลผู้ใช้:</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">ข้อมูลผู้ใช้:</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </>
    );
}
