"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, RotateCcw } from "lucide-react";
import { CourseCategory } from "@/generated/prisma";

const formSchema = z.object({
    title: z
        .string()
        .min(1, "กรุณาระบุชื่อคอร์ส")
        .max(64, "ชื่อคอร์สต้องไม่เกิน 100 ตัวอักษร"),
    description: z
        .string()
        .min(10, "รายละเอียดควรมีอย่างน้อย 10 ตัวอักษร")
        .max(1024, "รายละเอียดต้องไม่เกิน 500 ตัวอักษร"),
    category: z.string().min(1, "กรุณาเลือกหมวดหมู่คอร์ส"),
    file: z
        .custom<File>((file) => file instanceof File, {
            message: "กรุณาอัปโหลดไฟล์ภาพ",
        })
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "รองรับเฉพาะไฟล์ JPG หรือ PNG เท่านั้น",
            }
        ),
});

type FormValues = z.infer<typeof formSchema>;

export default function CourseCreateForm() {
    const router = useRouter();

    const [preview, setPreview] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control,
        register,
        handleSubmit,
        trigger,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange"
    });

    const resetForm = () => {
        setPreview(null);
        reset();
        setServerError(null);
    }

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setServerError(null);

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        if (data.file) formData.append("file", data.file);

        try {
            const res = await fetch("/api/courses", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const result = await res.json();
                console.log("Course created:", result);

                // Redirect or show success
                reset();
                setPreview(null);

                router.push(`/dashboard/courses/${result.id}`);
            } else {
                console.error("Failed to create course");
                const errorData = await res.json();
                setServerError(errorData.error || "เกิดข้อผิดพลาด");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setServerError("เกิดข้อผิดพลาด");
        } finally {
            setIsLoading(false);
        }
    };

    const testloading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return (
        <React.Fragment>
            <h1 className="text-2xl font-bold mb-6">สร้างคอร์สใหม่</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardContent className="space-y-6 py-2">
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="title">ชื่อคอร์ส</Label>
                                <Input
                                    id="title"
                                    placeholder="ระบุชื่อคอร์ส"
                                    {...register("title", { onChange: () => trigger("title") })}
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="description">รายละเอียด</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    placeholder="รายละเอียดของคอร์สนี้..."
                                    {...register("description", { onChange: () => trigger("description") })}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                )}
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="category">หมวดหมู่คอร์ส</Label>
                                <select
                                    id="category"
                                    {...register("category", { onChange: () => trigger("category") })}
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                >
                                    <option value="">-- เลือกหมวดหมู่ --</option>
                                    {Object.entries(CourseCategory).map(([key, value]) => (
                                        <option key={key} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-sm text-red-500">{errors.category.message}</p>
                                )}
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="file">ภาพหน้าปก</Label>
                                <Controller
                                    name="file"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    field.onChange(file);
                                                    setPreview(URL.createObjectURL(file));
                                                    trigger("file");
                                                } else {
                                                    field.onChange(null);
                                                    setPreview(null);
                                                    trigger("file");
                                                }
                                            }}
                                        />
                                    )}
                                />
                                {preview && <img src={preview} className="w-40 h-24 object-cover mt-2" />}
                                {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}
                            </div>

                            <div className="space-x-2 mt-4">
                                <Button size={"sm"} variant={"outline"} type="reset" onClick={resetForm} disabled={!isDirty}>
                                    <RotateCcw /> Reset
                                </Button>
                                <Button size={"sm"} variant={"default"} type="submit" disabled={!isValid || isLoading}>
                                    {isLoading && <Loader2 className="animate-spin" />}
                                    {isLoading ? "กำลังบันทึก..." : <><Plus /> เพิ่มคอร์สของคุณ</>}
                                </Button>
                            </div>

                            {serverError && (
                                <p className="text-sm text-red-500">{serverError}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </React.Fragment>
    );
}