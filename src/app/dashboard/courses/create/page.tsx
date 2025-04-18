"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
    title: z.string().min(1, "กรุณาระบุชื่อคอร์ส"),
    description: z.string().min(10, "รายละเอียดควรมีอย่างน้อย 10 ตัวอักษร"),
    file: z
        .instanceof(File)
        .refine(
            (file) => [, "image/jpg", "image/png"].includes(file.type),
            { message: "ต้องมีรูปภาพ และรองรับเฉพาะไฟล์ JPG หรือ PNG เท่านั้น" }
        )
});


type FormValues = z.infer<typeof formSchema>;

export default function CreateCoursePage() {
    const [preview, setPreview] = useState<string | null>(null);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.file) formData.append("file", data.file);

        const res = await fetch("/api/courses", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const result = await res.json();
            console.log("✅ Course created:", result);
            // Redirect or show success
        } else {
            console.error("❌ Failed to create course");
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">สร้างคอร์สใหม่</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardContent className="space-y-6 py-6">
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="title">ชื่อคอร์ส</Label>
                                <Input id="title" placeholder="ระบุชื่อคอร์ส" {...register("title")} />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="description">รายละเอียด</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    placeholder="รายละเอียดของคอร์สนี้..."
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
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
                                                }
                                            }}
                                        />
                                    )}
                                />
                                {preview && <img src={preview} className="w-40 h-24 object-cover mt-2" />}
                                {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}
                            </div>

                            <div>
                                <Button type="submit">เพิ่มคอร์สของคุณ</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
