import Link from "next/link"
import { Brain, Heart, Shield, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">AI Diyetisyen & Yaşam Koçu</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Özelleştirilmiş yapay zeka teknolojisi ile kişisel beslenme planları oluşturun. Sağlıklı yaşam
              yolculuğunuzda size rehberlik ediyoruz.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-gray-300">Güvenli & Gizli</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-gray-300">Hızlı & Etkili</span>
              </div>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/form" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Plan Oluştur
                </Link>
              </li>
              <li>
                <Link href="/coach" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  AI Koç
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Hakkında & Gizlilik
                </Link>
              </li>
            </ul>
          </div>

          {/* Özellikler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Özellikler</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Kişiselleştirilmiş Planlar</li>
              <li>VKİ Analizi</li>
              <li>Alışveriş Listesi</li>
              <li>PDF İndirme</li>
              <li>AI Koç Asistanı</li>
              <li>Alternatif Menüler</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-gray-300">
                © {new Date().getFullYear()} AI Diyetisyen & Yaşam Koçu | Tüm Hakları Saklıdır
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              Geliştirici: <span className="text-emerald-400 font-medium">Onur Yerlikaya</span>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            Bu uygulama özelleştirilmiş yapay zeka teknolojisi kullanmaktadır ve profesyonel tıbbi tavsiye yerine
            geçmez.
          </div>
        </div>
      </div>
    </footer>
  )
}
