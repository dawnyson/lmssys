// app/courses/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const courses = [
    {
        id: "course1",
        title: "React for Beginners",
        description: "Learn the basics of React.",
        thumbnailUrl: "/thumbs/react.png",
    },
    {
        id: "course2",
        title: "TypeScript Mastery",
        description: "Master TypeScript with hands-on examples.",
        thumbnailUrl: "/thumbs/typescript.png",
    },
];

export default function CoursesPage() {
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">📚 คอร์สทั้งหมด</h1>
                <Link href="/dashboard/courses/create">
                    <Button>➕ สร้างคอร์สใหม่</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                        <Card className="hover:shadow-lg transition duration-300">
                            <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="rounded-t w-full h-48 object-cover"
                            />
                            <CardContent className="p-4">
                                <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
                                <p className="text-sm text-muted-foreground">
                                    {course.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}