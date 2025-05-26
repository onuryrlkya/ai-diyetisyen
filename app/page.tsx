"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, FileText, ShoppingCart, Users, Zap, Shield, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/nutrition-consultation-bg.jpg')",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Destekli
              <span className="text-emerald-400 block">Beslenme Planı</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              Özelleştirilmiş yapay zeka teknolojisi ile size özel beslenme planları oluşturun. Kilo vermek artık zor
              değil!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/form">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                  Hemen Planlamaya Başla <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/coach">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg bg-transparent"
                >
                  AI Koç ile Konuş
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-gray-300">Tamamen ücretsiz • Hesap oluşturmadan kullanabilirsiniz</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Neden AI Diyetisyen?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Yapay zeka teknolojisi ile beslenme planlaması artık daha kolay, daha kişisel ve daha etkili.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<Brain className="h-12 w-12 text-emerald-500" />}
                title="Yapay Zeka Destekli"
                description="Özelleştirilmiş AI teknolojisi ile size özel beslenme planları oluşturur. Tercihlerinizi, alerjilerinizi ve hedeflerinizi dikkate alır."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<FileText className="h-12 w-12 text-emerald-500" />}
                title="Detaylı Analiz"
                description="VKİ analizi, besin değerleri hesaplaması ve kilo durumu değerlendirmesi ile kapsamlı sağlık raporu alın."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<ShoppingCart className="h-12 w-12 text-emerald-500" />}
                title="Pratik Çözümler"
                description="Haftalık alışveriş listesi, alternatif menüler ve PDF çıktıları ile beslenme planınızı kolayca uygulayın."
              />
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">10K+</div>
              <div className="text-gray-600">Oluşturulan Plan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
              <div className="text-gray-600">Memnuniyet Oranı</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Koç Desteği</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-gray-600">Ücretsiz</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sadece 3 adımda kişiselleştirilmiş beslenme planınızı oluşturun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Bilgilerinizi Girin</h3>
              <p className="text-gray-600">Yaş, boy, kilo, hedefleriniz ve beslenme tercihlerinizi bizimle paylaşın.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analiz Eder</h3>
              <p className="text-gray-600">
                Yapay zeka teknolojimiz verilerinizi analiz ederek size özel plan oluşturur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Planınızı Alın</h3>
              <p className="text-gray-600">Detaylı beslenme planınızı, alışveriş listenizi ve PDF çıktınızı indirin.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sağlıklı Yaşamın
                <span className="text-emerald-600 block">Yeni Adresi</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Geleneksel diyetisyen randevularına son! AI Diyetisyen ile istediğiniz zaman, istediğiniz yerden
                kişiselleştirilmiş beslenme planlarına ulaşın.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Kişiselleştirilmiş Planlar</h4>
                    <p className="text-gray-600">Size özel beslenme planları ve alternatif menüler</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Detaylı VKİ Analizi</h4>
                    <p className="text-gray-600">Sağlık durumunuz hakkında kapsamlı bilgi</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 AI Koç Desteği</h4>
                    <p className="text-gray-600">Beslenme sorularınız için anında yanıt</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Gizlilik Güvencesi</h4>
                    <p className="text-gray-600">Verileriniz sadece tarayıcınızda saklanır</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Zap className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Hızlı</h4>
                <p className="text-sm text-gray-600">2 dakikada plan oluşturun</p>
              </Card>

              <Card className="p-6 text-center">
                <Shield className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Güvenli</h4>
                <p className="text-sm text-gray-600">Verileriniz korunur</p>
              </Card>

              <Card className="p-6 text-center">
                <Users className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Kişisel</h4>
                <p className="text-sm text-gray-600">Size özel çözümler</p>
              </Card>

              <Card className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Etkili</h4>
                <p className="text-sm text-gray-600">Kanıtlanmış sonuçlar</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sağlıklı Yaşama İlk Adımı Atın</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Binlerce kişi AI Diyetisyen ile hedeflerine ulaştı. Sıra sizde!
            </p>
            <Link href="/form">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Ücretsiz Planımı Oluştur <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="p-6 h-full hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl text-emerald-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
