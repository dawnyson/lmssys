"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "การพัฒนาซอฟต์แวร์เบื้องต้น",
    description: "เรียนรู้พื้นฐานการเขียนโปรแกรมและพัฒนาซอฟต์แวร์",
    image: "/course1.jpg",
    instructor: "อ.สมชาย ใจดี",
  },
  {
    id: 2,
    title: "การตลาดดิจิทัล",
    description: "กลยุทธ์การตลาดออนไลน์เพื่อเพิ่มยอดขาย",
    image: "/course2.jpg",
    instructor: "อ.สมหญิง เก่งงาน",
  },
  {
    id: 3,
    title: "การออกแบบ UX/UI",
    description: "สร้างประสบการณ์ผู้ใช้ที่ยอดเยี่ยมด้วยการออกแบบที่ดี",
    image: "/course3.jpg",
    instructor: "อ.กานต์ สร้างสรรค์",
  },
  {
    id: 4,
    title: "การจัดการโครงการ",
    description: "เรียนรู้การบริหารจัดการโครงการอย่างมืออาชีพ",
    image: "/course4.jpg",
    instructor: "อ.วิทยา บริหารดี",
  },
  {
    id: 5,
    title: "การพัฒนาทักษะการสื่อสาร",
    description: "เพิ่มความมั่นใจในการพูดและการนำเสนอ",
    image: "/course5.jpg",
    instructor: "อ.สุภาพร พูดเก่ง",
  },
]

export default function HomePage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleProviderLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <main className="bg-background text-foreground">
      <section className="w-full h-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            ยินดีต้อนรับสู่ระบบ LMS
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            ระบบบริหารจัดการการเรียนรู้สำหรับองค์กรของคุณ
          </p>
          {!isAuthenticated ? (
            <div className="flex justify-center items-center space-x-4">
              <Button variant={"outline"} className="py-5" onClick={() => handleProviderLogin("azure-ad")}>
                <Image src={"/365.png"} alt="Logo" width={30} height={30} />
                Login with Microsoft 365
              </Button>
              <Button variant={"outline"} className="py-5" onClick={() => handleProviderLogin("google")}>
                <Image src={"/google.png"} alt="Logo" width={30} height={30} />
                Login with Google
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-base">ยินดีต้อนรับ, {session.user?.name || "ผู้ใช้"}</p>
              <Link href="/dashboard">
                <Button>ไปยังหน้าแดชบอร์ด</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-5">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <Sparkles className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">เรียนสะดวก</h3>
              <p className="text-sm text-muted-foreground">
                เข้าถึงบทเรียนได้ทุกที่ทุกเวลา ผ่านมือถือหรือคอมพิวเตอร์
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Sparkles className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">ติดตามผล</h3>
              <p className="text-sm text-muted-foreground">
                ระบบติดตามความก้าวหน้า และรายงานผลการเรียนอัตโนมัติ
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Sparkles className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">รองรับหลากหลายเนื้อหา</h3>
              <p className="text-sm text-muted-foreground">
                รองรับเนื้อหาทั้งวิดีโอ เอกสาร แบบทดสอบ และ interactive
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">คอร์สที่น่าสนใจ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card>
                  <CardContent className="p-6">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2 truncate">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 truncate">
                      {course.description}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      โดย <span className="font-medium">{course.instructor}</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}