// app/api/courses/route.ts
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CourseCategory } from "@/generated/prisma";

function generateFileName(originalName: string): string {
    const ext = path.extname(originalName); // .jpg, .png
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}${ext}`;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id;

        if (session) {
            console.log("Session", JSON.stringify(session, null, 2))
        } else {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized not found User ID" }, { status: 401 });
        }

        const data = await req.formData();
        const title = data.get("title") as string;
        const description = data.get("description") as string;
        const category = data.get("category") as string;
        const file = data.get("file") as File | null;

        // ตรวจสอบค่าฟอร์ม
        if (!title || !description || !category) {
            return NextResponse.json({ error: "กรุณาระบุชื่อ รายละเอียดคอร์ส และประเภทของคอร์ส" }, { status: 400 });
        }

        // ตรวจสอบว่าแนบไฟล์มาไหม
        if (!file || file.size === 0) {
            return NextResponse.json({ error: "กรุณาอัปโหลดภาพหน้าปกของคอร์ส" }, { status: 400 });
        }

        // ตรวจสอบชนิดไฟล์
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "รองรับเฉพาะไฟล์ภาพ .png, .jpg และ .jpeg เท่านั้น" },
                { status: 400 }
            );
        }

        // เขียนไฟล์ลง disk
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = generateFileName(file.name);
        const folderPath = `${process.env.SERVER_STORAGE_URL}/courses/thumbnails`;
        const filePath = path.join(folderPath, fileName);

        await writeFile(filePath, buffer);

        // บันทึกลงฐานข้อมูล
        const course = await prisma.course.create({
            data: {
                title,
                description,
                thumbnailUrl: fileName,
                category: category as CourseCategory,
                createdBy: userId,
            },
        });

        return NextResponse.json({ id: course.id }, { status: 201 });

    } catch (error) {
        console.error("Error while creating course:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดระหว่างบันทึกข้อมูล" }, { status: 500 });
    }
}