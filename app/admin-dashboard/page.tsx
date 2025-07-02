"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  LogOut,
  Eye,
  CheckCircle,
  XCircle,
  Activity,
} from "lucide-react"
import { teachers, subjects, locations, educationLevels } from "@/lib/data"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [adminUser, setAdminUser] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth")
    const user = localStorage.getItem("adminUser")

    if (!isAuth || isAuth !== "true") {
      router.push("/admin-login")
      return
    }

    setAdminUser(user || "المدير")
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    router.push("/admin-login")
  }

  const stats = {
    totalTeachers: teachers.length,
    approvedTeachers: teachers.filter((t) => t.isApproved).length,
    pendingTeachers: teachers.filter((t) => !t.isApproved).length,
    totalSubjects: subjects.length,
    totalLocations: locations.length,
    averageRating: teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length,
    totalReviews: teachers.reduce((acc, t) => acc + t.reviewsCount, 0),
    onlineTeachers: teachers.filter((t) => t.isOnline).length,
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">إجمالي المدرسين</p>
                <p className="text-3xl font-bold">{stats.totalTeachers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">مدرسين معتمدين</p>
                <p className="text-3xl font-bold">{stats.approvedTeachers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">في انتظار المراجعة</p>
                <p className="text-3xl font-bold">{stats.pendingTeachers}</p>
              </div>
              <UserX className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">متوسط التقييم</p>
                <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg ml-4">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المواد</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg ml-4">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأماكن</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLocations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg ml-4">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">مدرسين أونلاين</p>
                <p className="text-2xl font-bold text-gray-900">{stats.onlineTeachers}</p>
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
                  <tr key={teacher.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full ml-3"></div>
                        <div>
                          <span className="font-medium">{teacher.name}</span>
                          <p className="text-sm text-gray-500">{teacher.contactEmail}</p>
                        </div>
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
                        <span className="text-sm text-gray-500 mr-1">({teacher.reviewsCount})</span>
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
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {!teacher.isApproved && (
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4" />
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

  const renderSubjects = () => (
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
              <Card key={subject.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{subject.name}</h4>
                  <div className="flex space-x-1 space-x-reverse">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
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
  )

  const renderLevels = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة المراحل التعليمية</h3>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مرحلة جديدة
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {educationLevels.map((level) => (
              <Card key={level.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold">{level.name}</h4>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">المواد ({level.subjects.length}):</p>
                    <div className="flex flex-wrap gap-1">
                      {level.subjects.slice(0, 5).map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {level.subjects.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{level.subjects.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      المدرسين: {teachers.filter((t) => t.educationLevel.includes(level.name)).length}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
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

  if (!adminUser) {
    return <div>جاري التحميل...</div>
  }

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

            {/* Admin Info */}
            <div className="bg-blue-50 rounded-lg p-3 mb-6">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{adminUser.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{adminUser}</p>
                  <p className="text-xs text-gray-600">مدير النظام</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-right transition-colors ${activeTab === item.id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t">
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="ml-2 h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sidebarItems.find((item) => item.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600">إدارة وتحكم في منصة المدرسين</p>
              </div>
              <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString("ar-EG")}</div>
            </div>
          </div>

          {activeTab === "overview" && renderOverview()}
          {activeTab === "teachers" && renderTeachers()}
          {activeTab === "subjects" && renderSubjects()}
          {activeTab === "levels" && renderLevels()}
          {activeTab === "locations" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">إدارة الأماكن</h3>
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مكان جديد
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {locations.map((location) => (
                      <Card key={location.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{location.name}</h4>
                            <Badge variant="outline" className="text-xs mt-1">
                              {location.type === "city" ? "مدينة" : location.type === "area" ? "منطقة" : "أونلاين"}
                            </Badge>
                          </div>
                          <div className="flex space-x-1 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {teachers.filter((t) => t.locations.includes(location.name)).length} مدرس
                        </p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">إدارة التقييمات</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500 py-8">سيتم إضافة إدارة التقييمات قريباً</p>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">الرسائل</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500 py-8">سيتم إضافة إدارة الرسائل قريباً</p>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">إعدادات النظام</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500 py-8">سيتم إضافة الإعدادات قريباً</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
