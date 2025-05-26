interface UserData {
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

interface DietPlan {
  meals: {
    [key: string]: {
      items: string[]
      explanation: string
    }
  }
  shoppingList: string[]
  alternativeMeals: {
    [key: string]: {
      items: string[]
    }
  }[]
}

// This is a mock function that would normally call the GPT-4o API
// In a real implementation, this would make an API call to OpenAI
export function generateDietPlan(userData: UserData): DietPlan {
  // Parse user preferences
  const isVegetarian = userData.dietType === "vegetarian"
  const isVegan = userData.dietType === "vegan"
  const wantsToLoseWeight = userData.goal === "lose"
  const wantsToGainWeight = userData.goal === "gain"
  const mealCount = Number.parseInt(userData.mealCount)
  const allergies = userData.allergies
    .toLowerCase()
    .split(",")
    .map((a) => a.trim())
  const dislikedFoods = userData.dislikedFoods
    .toLowerCase()
    .split(",")
    .map((a) => a.trim())
  const favoriteFoods = userData.favoriteFoods
    .toLowerCase()
    .split(",")
    .map((a) => a.trim())

  // Generate a diet plan based on user preferences
  const dietPlan: DietPlan = {
    meals: {},
    shoppingList: [],
    alternativeMeals: [],
  }

  // Add breakfast
  dietPlan.meals["Kahvaltı"] = {
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
  }

  // Add lunch
  dietPlan.meals["Öğle Yemeği"] = {
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
  }

  // Add dinner
  dietPlan.meals["Akşam Yemeği"] = {
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
  }

  // Add snacks if 5 meals are requested
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
      explanation: wantsToLoseWeight
        ? "Protein ve lif açısından zengin bu ara öğün, ana öğünler arasında açlık hissinizi kontrol eder."
        : wantsToGainWeight
          ? "Kalori ve besin değeri yüksek bu ara öğün, günlük kalori ihtiyacınızı karşılamanıza yardımcı olur."
          : "Dengeli bu ara öğün, kan şekerinizi dengede tutar.",
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
      explanation: wantsToLoseWeight
        ? "Düşük kalorili ve protein açısından zengin bu ara öğün, akşam yemeği öncesi aşırı yemenizi engeller."
        : wantsToGainWeight
          ? "Protein açısından zengin bu ara öğün, kas yapımını destekler."
          : "Dengeli bu ara öğün, gün içinde enerji seviyenizi korur.",
    }
  }

  // Generate shopping list
  dietPlan.shoppingList = [
    // Proteins
    isVegan
      ? "Nohut, mercimek, tofu, tempeh"
      : isVegetarian
        ? "Yumurta, peynir çeşitleri, yoğurt"
        : "Tavuk göğsü, somon, hindi dilimleri, yumurta, peynir",

    // Grains
    "Tam tahıllı ekmek",
    "Bulgur",
    "Yulaf ezmesi",

    // Fruits
    "Elma",
    "Muz",
    "Çilek",
    "Portakal",
    "Yaban mersini",

    // Vegetables
    "Domates",
    "Salatalık",
    "Marul",
    "Ispanak",
    "Havuç",
    "Patates",
    "Mevsim sebzeleri",

    // Nuts and seeds
    "Badem",
    "Ceviz",
    "Fındık",

    // Dairy and alternatives
    isVegan ? "Badem sütü" : "Yoğurt",

    // Others
    "Zeytinyağı",
    "Yeşil çay",
    "Filtre kahve",
    "Granola",
    isVegan ? "Humus" : "Protein bar",
  ]

  // Filter out allergies and disliked foods
  dietPlan.shoppingList = dietPlan.shoppingList.filter((item) => {
    const lowerItem = item.toLowerCase()
    return (
      !allergies.some((allergy) => lowerItem.includes(allergy)) &&
      !dislikedFoods.some((disliked) => lowerItem.includes(disliked))
    )
  })

  // Add favorite foods if they're not already included
  favoriteFoods.forEach((favorite) => {
    if (favorite && !dietPlan.shoppingList.some((item) => item.toLowerCase().includes(favorite))) {
      dietPlan.shoppingList.push(favorite.charAt(0).toUpperCase() + favorite.slice(1))
    }
  })

  // Generate alternative meals
  dietPlan.alternativeMeals = [
    // Alternative 1
    {
      Kahvaltı: {
        items: [
          isVegan
            ? "Meyveli ve kuruyemişli yulaf ezmesi"
            : isVegetarian
              ? "Peynirli ve sebzeli tost"
              : "Protein shake ve muz",
          "Taze sıkılmış portakal suyu",
          "Yeşil çay",
        ],
      },
      "Öğle Yemeği": {
        items: [
          isVegan ? "Sebzeli kinoa salatası" : isVegetarian ? "Mantarlı makarna" : "Ton balıklı salata",
          "1 adet meyve",
          "Su",
        ],
      },
      "Akşam Yemeği": {
        items: [
          isVegan
            ? "Sebzeli nohut yemeği ve bulgur pilavı"
            : isVegetarian
              ? "Sebzeli pizza (ev yapımı)"
              : "Fırında köfte, sebzeli pilav",
          "Mevsim salatası",
          "Ayran veya su",
        ],
      },
    },

    // Alternative 2
    {
      Kahvaltı: {
        items: [
          isVegan ? "Sebzeli tofu scramble" : isVegetarian ? "Peynirli ve domatesli omlet" : "Protein pancake ve bal",
          "Yeşil smoothie",
          "Filtre kahve",
        ],
      },
      "Öğle Yemeği": {
        items: [
          isVegan
            ? "Mercimek köftesi ve bulgur salatası"
            : isVegetarian
              ? "Peynirli sebze çorbası"
              : "Tavuk wrap, yoğurt",
          "Mevsim meyveleri",
          "Su",
        ],
      },
      "Akşam Yemeği": {
        items: [
          isVegan
            ? "Sebzeli fasulye yemeği ve bulgur pilavı"
            : isVegetarian
              ? "Sebzeli makarna ve peynir"
              : "Izgara balık, zeytinyağlı sebze",
          "Cacık veya yoğurt",
          "Su",
        ],
      },
    },
  ]

  // If 5 meals are requested, add snacks to alternatives
  if (mealCount === 5) {
    dietPlan.alternativeMeals.forEach((alternative) => {
      alternative["Ara Öğün 1"] = {
        items: [
          isVegan ? "Meyve smoothie (muz, çilek, badem sütü)" : isVegetarian ? "Meyveli yoğurt" : "Protein bar",
          "Yeşil çay",
        ],
      }

      alternative["Ara Öğün 2"] = {
        items: [
          isVegan ? "Avokado ve tam tahıllı kraker" : isVegetarian ? "Peynir ve meyve" : "Hindi dilimleri ve salatalık",
          "Su veya bitki çayı",
        ],
      }
    })
  }

  return dietPlan
}
