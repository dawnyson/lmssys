// app/api/courses/route.ts
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function generateFileName(originalName: string): string {
    const ext = path.extname(originalName); // นามสกุล .jpg .png
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8); // 6 ตัว
    return `${timestamp}-${random}${ext}`;
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.formData();
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const file = data.get("file") as File | null;

    let fileName = null;

    if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        fileName = generateFileName(file.name);

        const folderPath = `${process.env.SERVER_STORAGE_URL}/courses/thumbnails`;
        const filePath = path.join(folderPath, fileName);

        await writeFile(filePath, buffer);
    }

    const course = await prisma.course.create({
        data: {
            title,
            description,
            thumbnailUrl: fileName ?? "",
            createdBy: userId,
        },
    });

    return NextResponse.json(course);
}