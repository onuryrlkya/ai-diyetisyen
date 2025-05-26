"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function FormPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    goal: "lose",
    budget: 500,
    allergies: "",
    dietType: "omnivore",
    duration: "weekly",
    mealCount: "3",
    dislikedFoods: "",
    favoriteFoods: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBudgetChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, budget: value[0] }))
  }

  const nextStep = () => {
    // Form doğrulama
    if (step === 1) {
      if (!formData.age || !formData.height || !formData.weight) {
        toast({
          title: "Eksik Bilgi",
          description: "Lütfen yaş, boy ve kilo bilgilerinizi girin.",
          variant: "destructive",
        })
        return
      }

      // Yaş, boy ve kilo için geçerlilik kontrolü
      const age = Number.parseInt(formData.age)
      const height = Number.parseFloat(formData.height)
      const weight = Number.parseFloat(formData.weight)

      if (age < 12 || age > 100) {
        toast({
          title: "Geçersiz Yaş",
          description: "Lütfen 12-100 arasında bir yaş girin.",
          variant: "destructive",
        })
        return
      }

      if (height < 100 || height > 250) {
        toast({
          title: "Geçersiz Boy",
          description: "Lütfen 100-250 cm arasında bir boy girin.",
          variant: "destructive",
        })
        return
      }

      if (weight < 30 || weight > 300) {
        toast({
          title: "Geçersiz Kilo",
          description: "Lütfen 30-300 kg arasında bir kilo girin.",
          variant: "destructive",
        })
        return
      }
    }

    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Sadece 3. adımda form gönderilsin
    if (step !== 3) {
      nextStep()
      return
    }

    setLoading(true)

    try {
      // Calculate BMI
      const heightInM = Number.parseFloat(formData.height) / 100
      const weightInKg = Number.parseFloat(formData.weight)
      const bmi = weightInKg / (heightInM * heightInM)

      // Store data in localStorage
      localStorage.setItem(
        "userDietData",
        JSON.stringify({
          ...formData,
          bmi: bmi.toFixed(1),
        }),
      )

      // Simulate API call delay
      setTimeout(() => {
        setLoading(false)
        router.push("/results")
      }, 2000)
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      toast({
        title: "Hata",
        description: "Beslenme planı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Ana Sayfaya Dön
        </Link>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-700">Kişisel Beslenme Planı Oluştur</CardTitle>
            <CardDescription>
              Adım {step}/3: {step === 1 ? "Kişisel Bilgiler" : step === 2 ? "Beslenme Tercihleri" : "Ek Detaylar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Adınız (Opsiyonel)</Label>
                    <Input id="name" name="name" placeholder="Adınız" value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Yaşınız</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Yaşınız"
                        required
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Cinsiyet</Label>
                      <RadioGroup
                        defaultValue={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Erkek</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Kadın</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Boy (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        placeholder="Boy (cm)"
                        required
                        value={formData.height}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Kilo (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="Kilo (kg)"
                        required
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hedefiniz</Label>
                    <RadioGroup
                      defaultValue={formData.goal}
                      onValueChange={(value) => handleSelectChange("goal", value)}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lose" id="lose" />
                        <Label htmlFor="lose">Kilo Vermek</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maintain" id="maintain" />
                        <Label htmlFor="maintain">Kilo Korumak</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gain" id="gain" />
                        <Label htmlFor="gain">Kilo Almak</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Günlük Bütçe (₺)</Label>
                    <div className="pt-6 pb-2">
                      <Slider
                        defaultValue={[formData.budget]}
                        max={1000}
                        step={50}
                        onValueChange={handleBudgetChange}
                      />
                    </div>
                    <div className="text-right text-emerald-700 font-medium">{formData.budget} ₺</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Alerjileriniz (varsa)</Label>
                    <Textarea
                      id="allergies"
                      name="allergies"
                      placeholder="Örn: gluten, fıstık, süt ürünleri"
                      value={formData.allergies}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietType">Beslenme Tipi</Label>
                    <Select
                      defaultValue={formData.dietType}
                      onValueChange={(value) => handleSelectChange("dietType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Beslenme tipinizi seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="omnivore">Etçil (Her şey)</SelectItem>
                        <SelectItem value="vegetarian">Vejetaryen</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Plan Süresi</Label>
                      <Select
                        defaultValue={formData.duration}
                        onValueChange={(value) => handleSelectChange("duration", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Plan süresini seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Günlük</SelectItem>
                          <SelectItem value="weekly">Haftalık</SelectItem>
                          <SelectItem value="monthly">Aylık</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mealCount">Öğün Sayısı</Label>
                      <Select
                        defaultValue={formData.mealCount}
                        onValueChange={(value) => handleSelectChange("mealCount", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Öğün sayısını seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 Öğün</SelectItem>
                          <SelectItem value="5">5 Öğün</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dislikedFoods">Sevmediğiniz Yiyecekler (Opsiyonel)</Label>
                    <Textarea
                      id="dislikedFoods"
                      name="dislikedFoods"
                      placeholder="Örn: brokoli, patlıcan, mantar"
                      value={formData.dislikedFoods}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteFoods">Favori Yiyecekleriniz (Opsiyonel)</Label>
                    <Textarea
                      id="favoriteFoods"
                      name="favoriteFoods"
                      placeholder="Örn: tavuk, çilek, badem"
                      value={formData.favoriteFoods}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-sm text-emerald-700">
                      <strong>Not:</strong> Verileriniz sadece tarayıcınızda saklanır ve hiçbir sunucuya gönderilmez. Bu
                      uygulama, profesyonel tıbbi tavsiye yerine geçmez. Lütfen herhangi bir diyet değişikliği yapmadan
                      önce bir sağlık uzmanına danışın.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Geri
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                    İleri <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> İşleniyor...
                      </>
                    ) : (
                      <>
                        Planı Oluştur <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
