import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, BookOpen, Phone, Mail, MessageCircle, Calendar, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { teachers, reviews } from "@/lib/data"
import { notFound } from "next/navigation"

interface TeacherProfilePageProps {
  params: {
    id: string
  }
}

export default function TeacherProfilePage({ params }: TeacherProfilePageProps) {
  const teacher = teachers.find((t) => t.id === params.id)

  if (!teacher) {
    notFound()
  }

  const teacherReviews = reviews.filter((r) => r.teacherId === teacher.id)

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
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 space-x-reverse">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  الرئيسية
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/teachers" className="text-gray-500 hover:text-gray-700">
                  المدرسين
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900">{teacher.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teacher Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
                  <Image
                    src={teacher.image || "/placeholder.svg"}
                    alt={teacher.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto md:mx-0"
                  />
                  <div className="flex-1 text-center md:text-right">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{teacher.name}</h2>
                    <div className="flex items-center justify-center md:justify-start mb-3">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="mr-1 text-lg font-semibold text-gray-900">{teacher.rating}</span>
                      <span className="mr-2 text-gray-600">({teacher.reviewsCount} تقييم)</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 ml-2" />
                      انضم في {new Date(teacher.joinDate).toLocaleDateString("ar-EG")}
                    </div>
                    {teacher.isOnline && <Badge className="bg-green-100 text-green-800">متاح للتدريس الأونلاين</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subjects and Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 ml-2" />
                  المواد والمراحل التعليمية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">المواد الدراسية:</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">المراحل التعليمية:</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.educationLevel.map((level, index) => (
                        <Badge key={index} variant="outline">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>نبذة عن المدرس</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{teacher.description}</p>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">طريقة التدريس:</h4>
                  <p className="text-gray-700 leading-relaxed">{teacher.teachingMethod}</p>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 ml-2" />
                  التقييمات ({teacherReviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacherReviews.length > 0 ? (
                  <div className="space-y-4">
                    {teacherReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                              <span className="text-sm font-semibold text-blue-600">
                                {review.studentName.charAt(0)}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-900">{review.studentName}</span>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(review.date).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">لا توجد تقييمات بعد</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>تواصل مع المدرس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Phone className="ml-2 h-4 w-4" />
                  اتصل عبر الواتساب
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="ml-2 h-4 w-4" />
                  إرسال رسالة
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="ml-2 h-4 w-4" />
                  طلب معاودة اتصال
                </Button>
              </CardContent>
            </Card>

            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 ml-2" />
                  أماكن التدريس
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teacher.locations.map((location, index) => (
                    <div key={index} className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 ml-2" />
                      <span className="text-gray-700">{location}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 ml-2" />
                  إحصائيات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">التقييم:</span>
                    <span className="font-semibold">{teacher.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">عدد التقييمات:</span>
                    <span className="font-semibold">{teacher.reviewsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المواد:</span>
                    <span className="font-semibold">{teacher.subjects.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الأماكن:</span>
                    <span className="font-semibold">{teacher.locations.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
