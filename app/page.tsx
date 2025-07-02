"use client"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Star, BookOpen, Users, Award, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { teachers, educationLevels, subjects, locations } from "@/lib/data"
import { StatsCounter } from "@/components/interactive/stats-counter"
import { TeacherCard } from "@/components/interactive/teacher-card"
import { useState } from "react"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchLevel, setSearchLevel] = useState("")
  const [searchSubject, setSearchSubject] = useState("")
  const [searchLocation, setSearchLocation] = useState("")

  const featuredTeachers = teachers.slice(0, 4)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (searchLevel) params.set("level", searchLevel)
    if (searchSubject) params.set("subject", searchSubject)
    if (searchLocation) params.set("location", searchLocation)

    const searchURL = params.toString() ? `/teachers?${params.toString()}` : "/teachers"
    window.location.href = searchURL
  }

  return (
      <>
      <Head>
        <title>منصة المدرسين | Hassan Platform</title>
        <meta name="description" content="أفضل منصة للبحث عن مدرسين لكل المراحل التعليمية" />
      </Head>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">منصة المدرسين</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-blue-600 font-semibold">
                الرئيسية
              </Link>
              <Link href="/teachers" className="text-gray-700 hover:text-blue-600 transition-colors">
                المدرسين
              </Link>
              <Link href="/subjects" className="text-gray-700 hover:text-blue-600 transition-colors">
                المواد
              </Link>
              <Link href="/levels" className="text-gray-700 hover:text-blue-600 transition-colors">
                المراحل
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                تواصل معنا
              </Link>
            </nav>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/register-teacher">
                <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-700">
                  سجّل كمدرس
                </Button>
              </Link>
              <Link href="/admin-login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  لوحة التحكم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ابحث عن{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              مدرسك المثالي
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            منصة شاملة تربط الطلاب بأفضل المدرسين الخصوصيين في جميع المواد والمراحل التعليمية
          </p>

          {/* Search Form */}
          <Card className="max-w-5xl mx-auto mb-12 shadow-2xl border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="ابحث بالاسم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 h-12 border-2 focus:border-blue-400"
                  />
                </div>

                <Select value={searchLevel} onValueChange={setSearchLevel}>
                  <SelectTrigger className="h-12 border-2 focus:border-blue-400">
                    <SelectValue placeholder="المرحلة التعليمية" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level.id} value={level.name}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={searchSubject} onValueChange={setSearchSubject}>
                  <SelectTrigger className="h-12 border-2 focus:border-blue-400">
                    <SelectValue placeholder="المادة الدراسية" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={searchLocation} onValueChange={setSearchLocation}>
                  <SelectTrigger className="h-12 border-2 focus:border-blue-400">
                    <SelectValue placeholder="المكان" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleSearch}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Search className="ml-2 h-5 w-5" />
                  ابحث الآن
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                <StatsCounter end={teachers.length} suffix="+" />
              </h3>
              <p className="text-gray-600 text-lg">مدرس مؤهل</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                <StatsCounter end={subjects.length} suffix="+" />
              </h3>
              <p className="text-gray-600 text-lg">مادة دراسية</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                <StatsCounter end={98} suffix="%" />
              </h3>
              <p className="text-gray-600 text-lg">نسبة الرضا</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              مدرسين مميزين
            </h3>
            <p className="text-xl text-gray-600">تعرف على بعض أفضل المدرسين في منصتنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} showAnimation={false} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/teachers">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 shadow-lg"
              >
                عرض جميع المدرسين
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">تصفح حسب التخصص</h3>
            <p className="text-lg text-gray-600">اختر المجال الذي تريد التعلم فيه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationLevels.slice(0, 6).map((level) => {
              const teacherCount = teachers.filter((teacher) => teacher.educationLevel.includes(level.name)).length
              return (
                <Link key={level.id} href={`/teachers?level=${encodeURIComponent(level.name)}`}>
                  <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{level.name}</h4>
                      <p className="text-gray-600">{teacherCount} مدرس متاح</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">لماذا تختار منصتنا؟</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg ml-4">
                    <Search className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">بحث متقدم وذكي</h4>
                    <p className="opacity-90">ابحث عن المدرس المناسب حسب المادة والمرحلة والموقع مع فلاتر متقدمة</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg ml-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">مدرسين مؤهلين ومعتمدين</h4>
                    <p className="opacity-90">جميع المدرسين مراجعين ومؤهلين لضمان أعلى جودة في التعليم</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg ml-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">تقييمات حقيقية وموثوقة</h4>
                    <p className="opacity-90">اقرأ تقييمات الطلاب السابقين لاتخاذ القرار الصحيح</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h4 className="text-3xl font-bold mb-4">ابدأ رحلتك التعليمية الآن</h4>
                <p className="mb-6 text-lg opacity-90">انضم إلى آلاف الطلاب الذين وجدوا مدرسهم المثالي</p>
                <Link href="/teachers">
                  <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform duration-300">
                    ابحث عن مدرسك الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <BookOpen className="h-6 w-6" />
                <h5 className="text-lg font-semibold">منصة المدرسين</h5>
              </div>
              <p className="text-gray-400 mb-4">منصة شاملة لربط الطلاب بأفضل المدرسين الخصوصيين</p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Phone className="h-4 w-4" />
                <span className="text-sm">01234567890</span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse mt-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@teachers-platform.com</span>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">روابط سريعة</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/teachers" className="hover:text-white transition-colors">
                    المدرسين
                  </Link>
                </li>
                <li>
                  <Link href="/subjects" className="hover:text-white transition-colors">
                    المواد
                  </Link>
                </li>
                <li>
                  <Link href="/levels" className="hover:text-white transition-colors">
                    المراحل
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">للمدرسين</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/register-teacher" className="hover:text-white transition-colors">
                    سجّل كمدرس
                  </Link>
                </li>
                <li>
                  <Link href="/admin-login" className="hover:text-white transition-colors">
                    لوحة التحكم
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">معلومات</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    تواصل معنا
                  </Link>
                </li>
                <li>
                  <span className="text-sm">سياسة الخصوصية</span>
                </li>
                <li>
                  <span className="text-sm">الشروط والأحكام</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 منصة المدرسين. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
