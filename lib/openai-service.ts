// Sadece coach için basit API servisi
export interface UserData {
  name: string
  age: string
  gender: string
  height: string
  weight: string
  goal: string
  budget: number
  allergies: string
  dietType: string
  duration: string
  mealCount: string
  dislikedFoods: string
  favoriteFoods: string
  bmi: string
}

export interface MealPlan {
  items: string[]
  explanation: string
}

export interface DietPlan {
  meals: {
    [key: string]: MealPlan
  }
  shoppingList: string[]
  alternativeMeals: {
    [key: string]: {
      items: string[]
    }
  }[]
  nutritionalAnalysis: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  weightAnalysis: {
    currentStatus: string
    recommendation: string
    timeToGoal: string
    healthyWeightRange: {
      min: number
      max: number
    }
  }
}

// Diet plan için fallback fonksiyon (API kullanmıyor)
export async function generateDietPlanWithAI(userData: UserData): Promise<DietPlan> {
  console.log("Diet plan oluşturuluyor (fallback)...")

  const safeUserData = {
    name: userData.name || "Kullanıcı",
    allergies: userData.allergies || "",
    dislikedFoods: userData.dislikedFoods || "",
    favoriteFoods: userData.favoriteFoods || "",
    age: userData.age || "25",
    gender: userData.gender || "male",
    height: userData.height || "170",
    weight: userData.weight || "70",
    goal: userData.goal || "maintain",
    budget: userData.budget || 500,
    dietType: userData.dietType || "omnivore",
    duration: userData.duration || "weekly",
    mealCount: userData.mealCount || "3",
    bmi: userData.bmi || "24.0",
  }

  const isVegetarian = safeUserData.dietType === "vegetarian"
  const isVegan = safeUserData.dietType === "vegan"
  const wantsToLoseWeight = safeUserData.goal === "lose"
  const wantsToGainWeight = safeUserData.goal === "gain"
  const mealCount = Number.parseInt(safeUserData.mealCount)
  const height = Number.parseFloat(safeUserData.height)
  const weight = Number.parseFloat(safeUserData.weight)
  const bmi = Number.parseFloat(safeUserData.bmi)

  const minHealthyWeight = Math.round((18.5 * height * height) / 10000)
  const maxHealthyWeight = Math.round((24.9 * height * height) / 10000)

  const dietPlan: DietPlan = {
    meals: {
      Kahvaltı: {
        items: [
          isVegan
            ? "Avokado ezmeli tam tahıllı ekmek"
            : isVegetarian
              ? "Yumurtalı menemen ve tam tahıllı ekmek"
              : "Protein omlet (2 yumurta, peynir) ve tam tahıllı ekmek",
          "Taze meyve tabağı (elma, muz, çilek)",
          isVegan ? "Badem sütlü yulaf ezmesi" : "Yoğurt ve granola",
          "Yeşil çay veya filtre kahve",
        ],
        explanation: wantsToLoseWeight
          ? "Protein açısından zengin bu kahvaltı, gün boyu tok kalmanızı sağlayarak atıştırma isteğinizi azaltır."
          : wantsToGainWeight
            ? "Yüksek kalori ve protein içeren bu kahvaltı, kas yapımını destekler ve enerji sağlar."
            : "Dengeli bu kahvaltı, gün boyu enerji seviyenizi dengede tutar.",
      },
      "Öğle Yemeği": {
        items: [
          isVegan
            ? "Nohut ve sebzeli salata (domates, salatalık, marul, zeytinyağı)"
            : isVegetarian
              ? "Mercimek çorbası ve peynirli salata"
              : "Izgara tavuk göğsü (120g) ve sebzeli bulgur pilavı",
          "Mevsim yeşillikleri salatası",
          "1 dilim tam tahıllı ekmek",
          "Taze sıkılmış portakal suyu veya su",
        ],
        explanation: wantsToLoseWeight
          ? "Düşük kalorili ancak doyurucu bu öğün, öğleden sonra enerji düşüşü yaşamanızı engeller."
          : wantsToGainWeight
            ? "Kompleks karbonhidratlar ve protein açısından zengin bu öğün, kas yapımını destekler."
            : "Dengeli makro besinler içeren bu öğün, metabolizmanızı dengede tutar.",
      },
      "Akşam Yemeği": {
        items: [
          isVegan
            ? "Sebzeli mercimek köftesi ve bulgur pilavı"
            : isVegetarian
              ? "Fırında sebzeli makarna ve peynir"
              : "Fırında somon (150g), ıspanaklı patates püresi",
          "Zeytinyağlı mevsim sebzeleri",
          "Yoğurt veya cacık",
          "Su veya ayran",
        ],
        explanation: wantsToLoseWeight
          ? "Akşam yemeğinde protein ağırlıklı ve düşük karbonhidratlı bu seçim, gece metabolizmanızın yavaşladığı saatlerde fazla kalori almanızı engeller."
          : wantsToGainWeight
            ? "Protein ve sağlıklı yağlar açısından zengin bu akşam yemeği, gece boyunca kas onarımını destekler."
            : "Dengeli ve hafif sindirilebilir bu akşam yemeği, kaliteli uyku için idealdir.",
      },
    },
    shoppingList: [
      "Tam tahıllı ekmek",
      "Yulaf ezmesi",
      "Mevsim meyveleri (elma, muz, çilek)",
      "Mevsim sebzeleri",
      "Protein kaynakları (tavuk, balık, yumurta, peynir)",
      "Bakliyatlar (mercimek, nohut)",
      "Bulgur, pirinç",
      "Zeytinyağı",
      "Yoğurt",
      "Kuruyemişler (badem, ceviz)",
    ],
    alternativeMeals: [
      {
        Kahvaltı: {
          items: ["Yulaf ezmesi ve meyve", "Yeşil çay"],
        },
        "Öğle Yemeği": {
          items: ["Ton balıklı salata", "Tam tahıllı ekmek"],
        },
        "Akşam Yemeği": {
          items: ["Sebzeli tavuk sote", "Bulgur pilavı"],
        },
      },
    ],
    nutritionalAnalysis: {
      calories: wantsToLoseWeight ? 1800 : wantsToGainWeight ? 2500 : 2200,
      protein: wantsToLoseWeight ? 120 : wantsToGainWeight ? 150 : 100,
      carbs: wantsToLoseWeight ? 150 : wantsToGainWeight ? 300 : 250,
      fat: wantsToLoseWeight ? 60 : wantsToGainWeight ? 80 : 70,
      fiber: 30,
    },
    weightAnalysis: {
      currentStatus:
        bmi < 18.5
          ? "Düşük kilolu"
          : bmi < 25
            ? "Normal kilolu"
            : bmi < 30
              ? "Fazla kilolu"
              : bmi < 35
                ? "Obez (Sınıf I)"
                : bmi < 40
                  ? "Obez (Sınıf II)"
                  : "Aşırı Obez (Sınıf III)",
      recommendation:
        bmi < 18.5
          ? "Sağlıklı bir şekilde kilo almanız önerilir."
          : bmi < 25
            ? "Mevcut kilonuzu korumanız idealdir."
            : "Sağlıklı bir şekilde kilo vermeniz önerilir.",
      timeToGoal:
        bmi < 18.5
          ? "Haftada 0.5 kg alarak, 8-12 hafta içinde ideal kiloya ulaşabilirsiniz."
          : bmi >= 25
            ? "Haftada 0.5-1 kg vererek, 12-24 hafta içinde ideal kiloya ulaşabilirsiniz."
            : "Şu anda ideal kilo aralığındasınız.",
      healthyWeightRange: {
        min: minHealthyWeight,
        max: maxHealthyWeight,
      },
    },
  }

  if (mealCount === 5) {
    dietPlan.meals["Ara Öğün 1"] = {
      items: [
        isVegan
          ? "Bir avuç karışık kuruyemiş (badem, ceviz, fındık)"
          : isVegetarian
            ? "Yoğurt ve bir avuç yaban mersini"
            : "Protein bar veya yoğurt",
        "1 adet meyve (elma veya armut)",
      ],
      explanation: "Dengeli bu ara öğün, kan şekerinizi dengede tutar.",
    }

    dietPlan.meals["Ara Öğün 2"] = {
      items: [
        isVegan
          ? "Humus ve havuç çubukları"
          : isVegetarian
            ? "Peynir ve tam tahıllı kraker"
            : "Hindi dilimleri ve tam tahıllı kraker",
        "Yeşil çay veya bitki çayı",
      ],
      explanation: "Dengeli bu ara öğün, gün içinde enerji seviyenizi korur.",
    }
  }

  return dietPlan
}

// YENİ API SERVİSİ - SADECE OPENAI YANITLARI
export async function generateCoachResponse(userMessage: string): Promise<string> {
  console.log("🤖 Coach API başlatılıyor...")
  console.log("📝 Gelen mesaj:", userMessage)

  // Basit kontrol
  if (!userMessage || userMessage.trim().length === 0) {
    return "Lütfen bir soru sorun."
  }

  const cleanMessage = userMessage.trim()

  // API anahtarı
  const apiKey =
    process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
    "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"

  console.log("🔑 API anahtarı var mı?", !!apiKey)

  if (!apiKey) {
    throw new Error("API anahtarı bulunamadı")
  }

  try {
    console.log("🔑 OpenAI API çağrısı yapılıyor...")

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Sen profesyonel bir beslenme uzmanı ve yaşam koçusun. Türkçe, samimi ve yararlı yanıtlar ver. Beslenme, diyet, sağlık, fitness konularında detaylı yardım et. Kişiselleştirilmiş öneriler sun.",
          },
          {
            role: "user",
            content: cleanMessage,
          },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    })

    console.log("📡 API yanıt durumu:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ API hatası:", response.status, response.statusText, errorText)
      throw new Error(`API Error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    console.log("✅ API yanıtı alındı")

    const content = data.choices?.[0]?.message?.content
    if (content && content.trim().length > 0) {
      console.log("🎉 Başarılı AI yanıtı:", content.substring(0, 50) + "...")
      return content.trim()
    } else {
      throw new Error("Boş yanıt alındı")
    }
  } catch (error) {
    console.error("💥 API hatası:", error)
    throw error
  }
}
