import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>🔒 กรุณาเข้าสู่ระบบ</div>;
    }

    return <div>👋 ยินดีต้อนรับ {session.user?.name}  sadasd {session.user?.role}</div>;
}