"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Lock, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple authentication check
    if (credentials.username === "حسن" && credentials.password === "حسن") {
      // Store authentication in localStorage (in a real app, use proper authentication)
      localStorage.setItem("adminAuth", "true")
      localStorage.setItem("adminUser", "حسن")
      router.push("/admin-dashboard")
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }

    setIsLoading(false)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
      dir="rtl"
    >
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">منصة المدرسين</h1>
          </div>
          <p className="text-gray-600">لوحة تحكم الإدارة</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="username">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                    className="pr-10"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="pr-10"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>بيانات تجريبية:</strong>
                <br />
                اسم المستخدم: حسن
                <br />
                كلمة المرور: حسن
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
