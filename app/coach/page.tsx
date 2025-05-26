"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, User, Bot, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { generateCoachResponse } from "@/lib/openai-service"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function CoachPage() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Merhaba! 👋 Ben senin kişisel AI beslenme koçunum. OpenAI GPT-4 teknolojisi kullanarak size özel beslenme, diyet ve sağlık önerileri sunuyorum. Sorularınızı bekliyorum! 🥗💪",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<"unknown" | "working" | "fallback">("unknown")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedInput = input?.trim() || ""
    if (!trimmedInput) {
      toast({
        title: "Uyarı",
        description: "Lütfen bir soru yazın.",
        variant: "destructive",
      })
      return
    }

    console.log("🚀 Form gönderiliyor:", trimmedInput)

    // Kullanıcı mesajını ekle
    const userMessage = { role: "user" as const, content: trimmedInput }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log("⏳ AI API çağrısı başlatılıyor...")

      // API çağrısı yap
      const response = await generateCoachResponse(trimmedInput)

      console.log("✅ AI yanıtı alındı:", response.substring(0, 100) + "...")

      // AI yanıtını ekle
      setMessages((prev) => [...prev, { role: "assistant", content: response }])

      setApiStatus("working")
      toast({
        title: "🎉 Başarılı!",
        description: "AI koçunuzdan yanıt alındı!",
      })
    } catch (error) {
      console.error("💥 Hata:", error)

      setApiStatus("fallback")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Üzgünüm, şu anda OpenAI API'sine bağlanamıyorum. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin. API anahtarının doğru olduğundan emin olun.",
        },
      ])

      toast({
        title: "API Hatası",
        description: "OpenAI API'sine bağlanılamadı. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    if (isLoading) return
    setInput(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-6 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Ana Sayfaya Dön
        </Link>

        {/* API Durum Bildirimi */}
        {apiStatus === "fallback" && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-700">
              API bağlantısı kurulamadı. Şimdilik basit yanıtlar veriliyor.
            </span>
          </div>
        )}

        <Card className="shadow-lg">
          <CardHeader className="bg-emerald-50 border-b">
            <CardTitle className="text-xl text-emerald-700 flex items-center">
              🤖 Beslenme Koçu
              {apiStatus === "working" && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">AI Aktif</span>
              )}
              {apiStatus === "fallback" && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Basit Mod</span>
              )}
            </CardTitle>
            <CardDescription>
              {apiStatus === "working"
                ? "Gerçek AI ile beslenme sorularınızı yanıtlayın"
                : "Beslenme sorularınızı yanıtlayın"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start mb-1">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4 mr-1 text-emerald-600" />
                        ) : (
                          <User className="h-4 w-4 mr-1 text-white" />
                        )}
                        <span className="text-xs font-medium">{message.role === "user" ? "Siz" : "Koç"}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-medium">Koç</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-2">
                        <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                        <span className="text-sm">Düşünüyor...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Beslenme hakkında bir soru sorun..."
                  className="flex-1 mr-2"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-emerald-700">🎯 Hızlı Sorular:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start text-left h-auto py-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() =>
                handleQuickQuestion(
                  "Kilo vermek için en etkili ve sağlıklı yöntemler nelerdir? Bana detaylı bir plan önerir misin?",
                )
              }
              disabled={isLoading}
            >
              💪 Kilo vermek için detaylı plan öner
            </Button>
            <Button
              variant="outline"
              className="justify-start text-left h-auto py-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() =>
                handleQuickQuestion(
                  "Canım sürekli tatlı çekiyor ama kilo almak istemiyorum. Bu durumla nasıl başa çıkabilirim?",
                )
              }
              disabled={isLoading}
            >
              🍰 Tatlı isteğimi nasıl kontrol ederim?
            </Button>
            <Button
              variant="outline"
              className="justify-start text-left h-auto py-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() =>
                handleQuickQuestion(
                  "Kas yapmak ve güçlenmek için günlük protein ihtiyacım nedir? Hangi besinleri tercih etmeliyim?",
                )
              }
              disabled={isLoading}
            >
              🥩 Kas yapımı için protein rehberi
            </Button>
            <Button
              variant="outline"
              className="justify-start text-left h-auto py-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() =>
                handleQuickQuestion(
                  "Metabolizmamı hızlandıracak sağlıklı kahvaltı önerilerin neler? Pratik tarifler var mı?",
                )
              }
              disabled={isLoading}
            >
              🥞 Metabolizma hızlandıran kahvaltılar
            </Button>
            <Button
              variant="outline"
              className="justify-start text-left h-auto py-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() =>
                handleQuickQuestion(
                  "Ofiste çalışıyorum ve sağlıksız atıştırıyorum. Sağlıklı atıştırmalık önerilerin var mı?",
                )
              }
              disabled={isLoading}
            >
              🏢 Ofis için sağlıklı atıştırmalıklar
            </Button>
            <Button
              variant="outline"
              className="justify-start text-left h-auto py-3 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() =>
                handleQuickQuestion(
                  "Su içmeyi unutuyorum. Günlük su ihtiyacımı nasıl karşılayabilirim? Pratik ipuçların var mı?",
                )
              }
              disabled={isLoading}
            >
              💧 Su içme alışkanlığı geliştirme
            </Button>
          </div>
        </div>

        <div className="mt-6 bg-emerald-50 p-4 rounded-lg">
          <p className="text-sm text-emerald-700">
            <strong>🤖 AI Teknolojisi:</strong> Bu koç gerçek OpenAI GPT-4 teknolojisi kullanıyor! Beslenme, diyet,
            fitness, sağlık ve wellness konularında detaylı, kişiselleştirilmiş öneriler alabilirsiniz. Sorularınızı ne
            kadar detaylı sorarsanız, o kadar kapsamlı yanıtlar alırsınız! 🎯
          </p>
          <div className="mt-2 text-xs text-emerald-600">
            💡 <strong>İpucu:</strong> "Benim durumum şöyle... bana özel bir plan önerir misin?" şeklinde kişisel
            sorular sorabilirsiniz.
          </div>
        </div>
      </div>
    </div>
  )
}
