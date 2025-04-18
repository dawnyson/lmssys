import { Metadata } from "next";
import CourseCreateForm from "./course-create-form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Dynamic Metadata
export const metadata: Metadata = {
    title: "สร้างคอร์สใหม่",
    description: "แบบฟอร์มสร้างคอร์สใหม่สำหรับผู้ดูแล"
}

// Server Component Page
export default async function Page() {
    const pathname = "/dashboard/courses/create";
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin?callbackUrl=" + pathname);
    }

    return (
        <div className="max-w-3xl py-5 mx-auto">
            <CourseCreateForm />
        </div>
    );
}