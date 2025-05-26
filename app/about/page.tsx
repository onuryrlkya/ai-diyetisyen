import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, Lock, Server } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Ana Sayfaya Dön
        </Link>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-700">Hakkımızda & Gizlilik</CardTitle>
            <CardDescription>AI Diyetisyen & Yaşam Koçu uygulaması nasıl çalışır?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-emerald-700 flex items-center mb-2">
                <Brain className="mr-2 h-5 w-5" /> Yapay Zeka Teknolojisi
              </h3>
              <p className="text-gray-600">
                Bu uygulama, özelleştirilmiş yapay zeka modelini kullanarak kişiselleştirilmiş beslenme planları
                oluşturur. Girdiğiniz bilgilere dayanarak, vücut tipinize, hedeflerinize ve tercihlerinize uygun
                beslenme önerileri sunar.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-emerald-700 flex items-center mb-2">
                <Lock className="mr-2 h-5 w-5" /> Gizlilik Politikası
              </h3>
              <p className="text-gray-600">
                Gizliliğiniz bizim için önemlidir. Girdiğiniz tüm bilgiler yalnızca tarayıcınızın yerel depolama
                alanında (localStorage) saklanır ve hiçbir sunucuya gönderilmez. Verileriniz tamamen sizin
                kontrolünüzdedir ve istediğiniz zaman tarayıcı ayarlarınızdan silebilirsiniz.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-emerald-700 flex items-center mb-2">
                <Server className="mr-2 h-5 w-5" /> Tamamen Frontend Tabanlı
              </h3>
              <p className="text-gray-600">
                Bu uygulama, tamamen frontend tabanlıdır ve herhangi bir backend sunucusu kullanmaz. Tüm işlemler
                tarayıcınızda gerçekleştirilir ve özelleştirilmiş AI teknolojisi doğrudan tarayıcınızdan çağrılır.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-medium text-yellow-700 mb-2">Tıbbi Sorumluluk Reddi</h3>
              <p className="text-yellow-600">
                Bu uygulama tarafından sağlanan bilgiler ve beslenme planları, profesyonel tıbbi tavsiye yerine geçmez.
                Herhangi bir diyet değişikliği yapmadan önce bir doktor veya diyetisyen gibi sağlık uzmanına danışmanızı
                şiddetle tavsiye ederiz. Özellikle kronik bir hastalığınız varsa veya herhangi bir ilaç kullanıyorsanız,
                bu uygulama tarafından önerilen beslenme planlarını uygulamadan önce bir sağlık uzmanına danışın.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-700">Sıkça Sorulan Sorular</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700 mb-1">Verilerim nerede saklanıyor?</h4>
              <p className="text-gray-600 text-sm">
                Tüm verileriniz yalnızca tarayıcınızın yerel depolama alanında (localStorage) saklanır ve hiçbir
                sunucuya gönderilmez.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-1">Bu uygulama ücretli mi?</h4>
              <p className="text-gray-600 text-sm">
                Hayır, bu uygulama tamamen ücretsizdir ve herhangi bir ödeme gerektirmez.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-1">Beslenme planları ne kadar güvenilir?</h4>
              <p className="text-gray-600 text-sm">
                Uygulama, genel beslenme bilgilerine dayanarak öneriler sunar, ancak her bireyin ihtiyaçları farklıdır.
                En doğru ve kişiselleştirilmiş beslenme planı için bir diyetisyene danışmanızı öneririz.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-1">Verilerimi nasıl silebilirim?</h4>
              <p className="text-gray-600 text-sm">
                Tarayıcınızın ayarlarından "Çerezleri ve site verilerini temizle" seçeneğini kullanarak tüm verilerinizi
                silebilirsiniz.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-1">AI teknolojisi nasıl çalışıyor?</h4>
              <p className="text-gray-600 text-sm">
                Özelleştirilmiş yapay zeka modelimiz, beslenme bilimi ve diyetetik alanındaki güncel bilgilerle
                eğitilmiştir. Verdiğiniz kişisel bilgileri analiz ederek size en uygun beslenme planını oluşturur.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
