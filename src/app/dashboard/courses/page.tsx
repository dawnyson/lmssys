"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotebookPen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Course } from "@/generated/prisma";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { MaterialStatus, CourseCategory } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const myCourses = [
    {
        id: "21412521",
        title: "React for Beginners",
        description: "Learn the basics of React.",
        thumbnailUrl: "1744970585917-bo4s3x",
        createdBy: "ITAppService",
        status: MaterialStatus.Published,
        category: CourseCategory.SoftSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "215125215421",
        title: "TypeScript Mastery",
        description: "MastMaster TypeScript with hands-on examples.Master TypeScript with hands-on examples.Master TypeScript with hands-on examples.Master TypeScript with hands-on examples.Master TypeScript with hands-on examples.Master TypeScript with hands-on examples.er TypeScript with hands-on examples.",
        thumbnailUrl: "1744970585917-bo4s3x",
        createdBy: "ITAppService",
        status: MaterialStatus.Private,
        category: CourseCategory.SoftSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function CoursesPage() {

    return (
        <div className="max-w-screen-xl mx-auto">

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <NotebookPen />
                    <h1 className="text-2xl font-bold">คอร์สของฉัน</h1>
                </div>
                <Link href="/dashboard/courses/create">
                    <Button variant={"outline"}>
                        <Plus /> สร้างคอร์สใหม่
                    </Button>
                </Link>
            </div>

            <div className="mb-6">
                <Table className="w-full">
                    <TableCaption>ตารางแสดงรายการคอร์สของคุณทั้งหมด</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead className="w-2/12">ชื่อ</TableHead>
                            <TableHead className="w-5/12">รายละเอียด</TableHead>
                            <TableHead className="w-[100px]">สถานะ</TableHead>
                            <TableHead className="w-[80px] text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="truncate">{course.id.slice(0, 6)}…</TableCell>
                                <TableCell className="truncate">{course.title}</TableCell>
                                <TableCell className="max-w-[300px] truncate">
                                    {course.description}
                                </TableCell>
                                <TableCell>{course.status}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link" onClick={() => redirect(`/dashboard/courses/${course.id}/edit`)}>แก้ไข</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>คอร์สทั้งหมด</TableCell>
                            <TableCell className="text-right">{myCourses.length} รายการ</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>

        </div>
    );
}