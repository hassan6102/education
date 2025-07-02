"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { subjects, educationLevels, locations } from "@/lib/data"

export default function RegisterTeacherPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subjects: [] as string[],
    educationLevels: [] as string[],
    locations: [] as string[],
    description: "",
    teachingMethod: "",
    image: null as File | null,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subject],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => s !== subject),
      }))
    }
  }

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        educationLevels: [...prev.educationLevels, level],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        educationLevels: prev.educationLevels.filter((l) => l !== level),
      }))
    }
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        locations: [...prev.locations, location],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        locations: prev.locations.filter((l) => l !== location),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">تم إرسال طلبك بنجاح!</h2>
            <p className="text-gray-600 mb-6">شكراً لك على التسجيل. سيتم مراجعة طلبك والتواصل معك خلال 24-48 ساعة.</p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full">العودة للرئيسية</Button>
              </Link>
              <Link href="/teachers">
                <Button variant="outline" className="w-full">
                  تصفح المدرسين
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">منصة المدرسين</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                الرئيسية
              </Link>
              <Link href="/teachers" className="text-gray-700 hover:text-blue-600">
                المدرسين
              </Link>
              <Link href="/subjects" className="text-gray-700 hover:text-blue-600">
                المواد
              </Link>
              <Link href="/levels" className="text-gray-700 hover:text-blue-600">
                المراحل
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                تواصل معنا
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">انضم كمدرس</h2>
            <p className="text-gray-600">املأ النموذج التالي للانضمام إلى منصتنا وابدأ في تدريس الطلاب</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">الصورة الشخصية</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>ارفع صورة</span>
                          <input
                            id="image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files?.[0] || null }))}
                          />
                        </label>
                        <p className="pr-1">أو اسحب وأفلت</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات التدريس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold">المواد الدراسية *</Label>
                  <p className="text-sm text-gray-600 mb-3">اختر المواد التي تدرسها</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`subject-${subject.id}`}
                          checked={formData.subjects.includes(subject.name)}
                          onCheckedChange={(checked) => handleSubjectChange(subject.name, checked as boolean)}
                        />
                        <Label htmlFor={`subject-${subject.id}`} className="text-sm">
                          {subject.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">المراحل التعليمية *</Label>
                  <p className="text-sm text-gray-600 mb-3">اختر المراحل التي تدرس لها</p>
                  <div className="space-y-2">
                    {educationLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`level-${level.id}`}
                          checked={formData.educationLevels.includes(level.name)}
                          onCheckedChange={(checked) => handleLevelChange(level.name, checked as boolean)}
                        />
                        <Label htmlFor={`level-${level.id}`} className="text-sm">
                          {level.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">أماكن التدريس *</Label>
                  <p className="text-sm text-gray-600 mb-3">اختر الأماكن المتاحة للتدريس</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {locations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`location-${location.id}`}
                          checked={formData.locations.includes(location.name)}
                          onCheckedChange={(checked) => handleLocationChange(location.name, checked as boolean)}
                        />
                        <Label htmlFor={`location-${location.id}`} className="text-sm">
                          {location.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>نبذة عنك وطريقة التدريس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">نبذة مختصرة عنك *</Label>
                  <Textarea
                    id="description"
                    placeholder="اكتب نبذة مختصرة عن خبرتك ومؤهلاتك..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="teachingMethod">طريقة التدريس *</Label>
                  <Textarea
                    id="teachingMethod"
                    placeholder="اشرح طريقتك في التدريس وكيف تساعد الطلاب على الفهم..."
                    value={formData.teachingMethod}
                    onChange={(e) => setFormData((prev) => ({ ...prev, teachingMethod: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center">
              <Button type="submit" size="lg" className="px-12">
                إرسال الطلب
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
