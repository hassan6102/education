"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  BookOpen,
  MapPin,
  Star,
  TrendingUp,
  MessageSquare,
  UserCheck,
  UserX,
  Settings,
  BarChart3,
  Search,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { teachers, subjects, locations } from "@/lib/data"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalTeachers: teachers.length,
    approvedTeachers: teachers.filter((t) => t.isApproved).length,
    pendingTeachers: teachers.filter((t) => !t.isApproved).length,
    totalSubjects: subjects.length,
    totalLocations: locations.length,
    averageRating: teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length,
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg ml-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المدرسين</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTeachers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg ml-4">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">مدرسين معتمدين</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedTeachers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg ml-4">
                <UserX className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">في انتظار المراجعة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingTeachers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg ml-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المدرسين الجدد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.slice(0, 5).map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full ml-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">{teacher.name}</p>
                      <p className="text-sm text-gray-500">{teacher.subjects.join(", ")}</p>
                    </div>
                  </div>
                  <Badge variant={teacher.isApproved ? "default" : "secondary"}>
                    {teacher.isApproved ? "معتمد" : "قيد المراجعة"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات المواد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.slice(0, 5).map((subject) => {
                const teacherCount = teachers.filter((t) => t.subjects.includes(subject.name)).length
                return (
                  <div key={subject.id} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{subject.name}</span>
                    <span className="text-sm text-gray-500">{teacherCount} مدرس</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTeachers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة المدرسين</h3>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مدرس جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>قائمة المدرسين</CardTitle>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="بحث..." className="pr-10 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4">الاسم</th>
                  <th className="text-right py-3 px-4">المواد</th>
                  <th className="text-right py-3 px-4">التقييم</th>
                  <th className="text-right py-3 px-4">الحالة</th>
                  <th className="text-right py-3 px-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full ml-3"></div>
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.slice(0, 2).map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {teacher.subjects.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{teacher.subjects.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                        <span>{teacher.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={teacher.isApproved ? "default" : "secondary"}>
                        {teacher.isApproved ? "معتمد" : "قيد المراجعة"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const sidebarItems = [
    { id: "overview", label: "نظرة عامة", icon: BarChart3 },
    { id: "teachers", label: "إدارة المدرسين", icon: Users },
    { id: "subjects", label: "إدارة المواد", icon: BookOpen },
    { id: "levels", label: "إدارة المراحل", icon: TrendingUp },
    { id: "locations", label: "إدارة الأماكن", icon: MapPin },
    { id: "reviews", label: "إدارة التقييمات", icon: Star },
    { id: "messages", label: "الرسائل", icon: MessageSquare },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-l min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse mb-8">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-right transition-colors ${
                    activeTab === item.id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {sidebarItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600">إدارة وتحكم في منصة المدرسين</p>
          </div>

          {activeTab === "overview" && renderOverview()}
          {activeTab === "teachers" && renderTeachers()}
          {activeTab === "subjects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">إدارة المواد الدراسية</h3>
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مادة جديدة
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects.map((subject) => (
                      <Card key={subject.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{subject.name}</h4>
                          <div className="flex space-x-1 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">المراحل: {subject.educationLevels.join(", ")}</p>
                        <p className="text-sm text-gray-500">
                          {teachers.filter((t) => t.subjects.includes(subject.name)).length} مدرس
                        </p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
