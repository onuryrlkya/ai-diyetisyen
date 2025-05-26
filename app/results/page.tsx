"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Download, ShoppingCart, Sparkles, Info, TrendingUp, TrendingDown, Dumbbell } from "lucide-react"
import Link from "next/link"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { useRouter } from "next/navigation"
import { generateDietPlanWithAI, type UserData, type DietPlan } from "@/lib/openai-service"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

export default function ResultsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("diet-plan")
  const pdfContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userDietData")

    if (!storedData) {
      router.push("/form")
      return
    }

    try {
      const parsedData = JSON.parse(storedData) as UserData
      setUserData(parsedData)

      // Generate diet plan based on user data
      const fetchDietPlan = async () => {
        try {
          const plan = await generateDietPlanWithAI(parsedData)
          setDietPlan(plan)
        } catch (error) {
          console.error("Diet plan generation error:", error)
          toast({
            title: "Hata",
            description: "Beslenme planı oluşturulurken bir hata oluştu. Varsayılan plan kullanılıyor.",
            variant: "destructive",
          })
        } finally {
          setLoading(false)
        }
      }

      fetchDietPlan()
    } catch (error) {
      console.error("Error parsing user data:", error)
      toast({
        title: "Hata",
        description: "Kullanıcı verileri işlenirken bir hata oluştu. Lütfen formu tekrar doldurun.",
        variant: "destructive",
      })
      router.push("/form")
    }
  }, [router, toast])

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Zayıf", color: "text-blue-600", bgColor: "bg-blue-100" }
    if (bmi < 25) return { category: "Normal", color: "text-green-600", bgColor: "bg-green-100" }
    if (bmi < 30) return { category: "Fazla Kilolu", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    if (bmi < 35) return { category: "Obez (Sınıf I)", color: "text-orange-600", bgColor: "bg-orange-100" }
    if (bmi < 40) return { category: "Obez (Sınıf II)", color: "text-red-600", bgColor: "bg-red-100" }
    return { category: "Aşırı Obez (Sınıf III)", color: "text-red-800", bgColor: "bg-red-100" }
  }

  const getBmiScale = (bmi: number) => {
    // BMI scale from 15 to 40
    const min = 15
    const max = 40
    const clampedBmi = Math.max(min, Math.min(max, bmi))
    return ((clampedBmi - min) / (max - min)) * 100
  }

  const generatePDF = async () => {
    if (!pdfContentRef.current) return

    try {
      const canvas = await html2canvas(pdfContentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Beslenme_Planı_${userData?.name || "Kullanıcı"}.pdf`)
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Hata",
        description: "PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    }
  }

  const generateShoppingListPDF = () => {
    if (!dietPlan) return

    try {
      const pdf = new jsPDF()

      // Add title
      pdf.setFontSize(20)
      pdf.setTextColor(39, 174, 96) // emerald color
      pdf.text("Alışveriş Listesi", 105, 20, { align: "center" })

      // Add date
      pdf.setFontSize(12)
      pdf.setTextColor(100, 100, 100)
      pdf.text(
        `${new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}`,
        105,
        30,
        { align: "center" },
      )

      // Add items
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)

      const itemsPerColumn = Math.ceil(dietPlan.shoppingList.length / 2)
      const leftColumnItems = dietPlan.shoppingList.slice(0, itemsPerColumn)
      const rightColumnItems = dietPlan.shoppingList.slice(itemsPerColumn)

      // Left column
      pdf.setFontSize(14)
      pdf.text("Malzemeler:", 20, 50)
      pdf.setFontSize(12)

      leftColumnItems.forEach((item, index) => {
        pdf.text(`□ ${item}`, 25, 60 + index * 10)
      })

      // Right column (if needed)
      if (rightColumnItems.length > 0) {
        pdf.setFontSize(14)
        pdf.text("Malzemeler (devam):", 110, 50)
        pdf.setFontSize(12)

        rightColumnItems.forEach((item, index) => {
          pdf.text(`□ ${item}`, 115, 60 + index * 10)
        })
      }

      // Add footer
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text("AI Diyetisyen & Yaşam Koçu tarafından oluşturulmuştur", 105, 280, { align: "center" })

      pdf.save(`Alışveriş_Listesi_${userData?.name || "Kullanıcı"}.pdf`)
    } catch (error) {
      console.error("Shopping list PDF generation error:", error)
      toast({
        title: "Hata",
        description: "Alışveriş listesi oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    }
  }

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/form" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Forma Geri Dön
          </Link>

          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-emerald-50 border-b">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
              </div>

              <div className="space-y-6">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-emerald-700 font-medium mb-2">Beslenme planınız hazırlanıyor...</p>
            <p className="text-gray-600">GPT-4 yapay zeka modelimiz size özel bir plan oluşturuyor.</p>
          </div>
        </div>
      </div>
    )
  }

  const bmiValue = Number.parseFloat(userData.bmi)
  const bmiInfo = getBmiCategory(bmiValue)
  const bmiScalePosition = getBmiScale(bmiValue)

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/form" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Forma Geri Dön
        </Link>

        <div ref={pdfContentRef}>
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-emerald-50 border-b">
              <CardTitle className="text-2xl text-emerald-700">
                {userData.name ? `${userData.name}'in Beslenme Planı` : "Kişisel Beslenme Planı"}
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                tarihinde oluşturuldu
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* BMI Card with Visualization */}
                <Card className="border shadow-sm overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">VKİ Analizi</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Vücut Kitle İndeksi (VKİ), boy ve kilonuza göre vücut yağ oranınızı tahmin eden bir
                              ölçümdür. VKİ = Kilo (kg) / (Boy (m))²
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-4xl font-bold text-emerald-700">{userData.bmi}</span>
                      <span className="ml-2 text-sm text-gray-500">kg/m²</span>
                    </div>

                    <Badge className={`${bmiInfo.bgColor} ${bmiInfo.color} border-0 mb-4 mx-auto block w-fit`}>
                      {bmiInfo.category}
                    </Badge>

                    {/* BMI Scale Visualization */}
                    <div className="relative pt-6 pb-2">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-4 w-4 rounded-full bg-emerald-600 border-2 border-white shadow-md top-5"
                          style={{ left: `calc(${bmiScalePosition}% - 8px)` }}
                        ></div>
                        <div className="flex justify-between text-xs text-gray-500 mt-4">
                          <span>15</span>
                          <span>25</span>
                          <span>40</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Zayıf</span>
                          <span>Normal</span>
                          <span>Obez</span>
                        </div>
                      </div>
                    </div>

                    {dietPlan && dietPlan.weightAnalysis && (
                      <div className="mt-4 pt-4 border-t text-sm">
                        <div className="flex items-start mb-2">
                          <span className="font-medium mr-2">Sağlıklı Kilo Aralığı:</span>
                          <span>
                            {dietPlan.weightAnalysis.healthyWeightRange.min}-
                            {dietPlan.weightAnalysis.healthyWeightRange.max} kg
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium mr-2">Durum:</span>
                          <span>{dietPlan.weightAnalysis.currentStatus}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Weight Analysis Card */}
                <Card className="border shadow-sm overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">Kilo Analizi</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center mb-3">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          userData.goal === "lose"
                            ? "bg-blue-100 text-blue-600"
                            : userData.goal === "maintain"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {userData.goal === "lose" ? (
                          <TrendingDown className="h-5 w-5" />
                        ) : userData.goal === "maintain" ? (
                          <Dumbbell className="h-5 w-5" />
                        ) : (
                          <TrendingUp className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Hedef</div>
                        <div className="font-medium">
                          {userData.goal === "lose"
                            ? "Kilo Vermek"
                            : userData.goal === "maintain"
                              ? "Kilo Korumak"
                              : "Kilo Almak"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Mevcut Kilo</span>
                      <span className="font-bold">{userData.weight} kg</span>
                    </div>

                    {dietPlan && dietPlan.weightAnalysis && (
                      <>
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm mb-2">{dietPlan.weightAnalysis.recommendation}</div>
                          <div className="text-sm text-gray-600">{dietPlan.weightAnalysis.timeToGoal}</div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Nutritional Analysis Card */}
                {dietPlan && dietPlan.nutritionalAnalysis && (
                  <Card className="border shadow-sm overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">Besin Değerleri</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-center mb-3">
                        <div className="text-3xl font-bold text-emerald-700">
                          {dietPlan.nutritionalAnalysis.calories}
                        </div>
                        <div className="text-sm text-gray-500">Günlük Kalori (kcal)</div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Protein</span>
                            <span className="text-sm font-medium">{dietPlan.nutritionalAnalysis.protein}g</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Karbonhidrat</span>
                            <span className="text-sm font-medium">{dietPlan.nutritionalAnalysis.carbs}g</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Yağ</span>
                            <span className="text-sm font-medium">{dietPlan.nutritionalAnalysis.fat}g</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Lif</span>
                            <span className="text-sm font-medium">{dietPlan.nutritionalAnalysis.fiber}g</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {dietPlan && (
                <Tabs defaultValue="diet-plan" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="diet-plan">Beslenme Planı</TabsTrigger>
                    <TabsTrigger value="shopping-list">Market Listesi</TabsTrigger>
                    <TabsTrigger value="alternatives">Alternatifler</TabsTrigger>
                  </TabsList>

                  <TabsContent value="diet-plan" className="space-y-6">
                    {Object.entries(dietPlan.meals).map(([mealName, meal]) => (
                      <div key={mealName} className="border rounded-lg overflow-hidden">
                        <div className="bg-emerald-50 px-4 py-3 border-b">
                          <h3 className="font-medium text-emerald-700">{mealName}</h3>
                        </div>
                        <div className="p-4">
                          <ul className="list-disc list-inside mb-3 space-y-1">
                            {meal.items.map((item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                            <Sparkles className="inline-block h-4 w-4 mr-1 text-emerald-500" />
                            <span className="italic">{meal.explanation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="shopping-list">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Haftalık Alışveriş Listesi</CardTitle>
                        <CardDescription>Beslenme planınız için gerekli malzemeler</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dietPlan.shoppingList.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`item-${index}`}
                                className="rounded text-emerald-600 focus:ring-emerald-500"
                              />
                              <label htmlFor={`item-${index}`} className="text-gray-700">
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="alternatives">
                    <div className="space-y-6">
                      {dietPlan.alternativeMeals.map((alternative, altIndex) => (
                        <Card key={altIndex}>
                          <CardHeader>
                            <CardTitle className="text-lg">Alternatif Plan {altIndex + 1}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {Object.entries(alternative).map(([mealName, meal]) => (
                                <div key={mealName}>
                                  <h4 className="font-medium text-emerald-700 mb-2">{mealName}</h4>
                                  <ul className="list-disc list-inside space-y-1">
                                    {meal.items.map((item, index) => (
                                      <li key={index} className="text-gray-700">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={generatePDF} className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" /> PDF Olarak İndir
          </Button>

          <Button
            onClick={generateShoppingListPDF}
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Market Listesini İndir
          </Button>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p>
            <strong>Not:</strong> Bu beslenme planı, yapay zeka tarafından oluşturulmuştur ve profesyonel tıbbi tavsiye
            yerine geçmez. Herhangi bir diyet değişikliği yapmadan önce bir sağlık uzmanına danışmanızı öneririz.
          </p>
        </div>
      </div>
    </div>
  )
}
