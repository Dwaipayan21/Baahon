// Default map center: Kolkata (Central/Park Street corridor)
export const KOLKATA_CENTER = {
  lat: 22.5626,
  lng: 88.3582
};

export const DEFAULT_ZOOM = 13;

/**
 * Helper to safely extract { lat, lng } from a pandal object.
 * Supports both { lat, lng } directly and GeoJSON { location: { coordinates: [lng, lat] } }
 */
export const getPandalCoordinates = (pandal) => {
  if (!pandal) return null;
  if (typeof pandal.lat === "number" && typeof pandal.lng === "number") {
    return { lat: pandal.lat, lng: pandal.lng };
  }
  if (pandal.location?.coordinates && Array.isArray(pandal.location.coordinates)) {
    const [lng, lat] = pandal.location.coordinates;
    if (typeof lat === "number" && typeof lng === "number") {
      return { lat, lng };
    }
  }
  if (pandal.coords && typeof pandal.coords.lat === "number" && typeof pandal.coords.lng === "number") {
    return pandal.coords;
  }
  return null;
};

export const PANDALS = [
  {
    id: "ekdalia-evergreen",
    name: "Ekdalia Evergreen Club",
    zone: "Gariahat, South Kolkata",
    address: "15 Ekdalia Rd, Gariahat, Kolkata 700019",
    category: "traditional",
    isBonediBari: false,
    rating: "4.8",
    reviewsCount: "14.2k",
    crowdLevel: "moderate", // "low" | "moderate" | "high" | "peak"
    crowdStatus: "Moderate Crowd",
    crowdQueue: "~15m wait",
    distance: "450m • 6 min walk",
    metroStation: "Kalighat Metro",
    metroDistance: "1.1 km",
    metroLine: "blue",
    featured: true,
    description: "Famous for traditional Durga idol in majestic temple architecture style, glittering German chandelier, and dazzling lighting decorations.",
    image: "https://images.unsplash.com/photo-1603775020644-eb8decd79994?auto=format&fit=crop&w=600&q=80",
    tags: ["Traditional Idol", "Grand Chandelier", "Illumination"],
    lat: 22.5222,
    lng: 88.3644,
    location: { type: "Point", coordinates: [88.3644, 22.5222] }
  },
  {
    id: "bagbazar-sarbojanin",
    name: "Bagbazar Sarbojanin",
    zone: "Bagbazar, North Kolkata",
    address: "78 Bagbazar Street, North Kolkata 700003",
    category: "traditional",
    isBonediBari: false,
    rating: "4.9",
    reviewsCount: "22.5k",
    crowdLevel: "low",
    crowdStatus: "Low Rush",
    crowdQueue: "~5m wait",
    distance: "4.2 km • 18 min transit",
    metroStation: "Shyambazar Metro",
    metroDistance: "600m",
    metroLine: "blue",
    featured: false,
    description: "Centenary heritage puja celebrating more than 100 years with iconic Ekchala Daker Saaj idol and rich Bengali cultural traditions.",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80",
    tags: ["Centenary Heritage", "Ekchala Idol", "Daker Saaj"],
    lat: 22.6012,
    lng: 88.3668,
    location: { type: "Point", coordinates: [88.3668, 22.6012] }
  },
  {
    id: "college-square",
    name: "College Square",
    zone: "College Street, Central Kolkata",
    address: "53 College St, Kolkata 700073",
    category: "theme",
    isBonediBari: false,
    rating: "4.7",
    reviewsCount: "31.8k",
    crowdLevel: "high",
    crowdStatus: "High Rush",
    crowdQueue: "~40m wait",
    distance: "2.8 km • 14 min transit",
    metroStation: "Central / MG Road Metro",
    metroDistance: "400m",
    metroLine: "blue",
    featured: false,
    description: "Spectacular water reflection pandal built atop the College Square swimming pool tank, illuminated by famous Chandannagar lighting.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    tags: ["Water Reflection", "Chandannagar Lights", "Grand Dome"],
    lat: 22.5744,
    lng: 88.3639,
    location: { type: "Point", coordinates: [88.3639, 22.5744] }
  },
  {
    id: "sreebhumi-sporting",
    name: "Sreebhumi Sporting Club",
    zone: "Lake Town / VIP Road",
    address: "VIP Rd, Lake Town, Kolkata 700089",
    category: "theme",
    isBonediBari: false,
    rating: "4.9",
    reviewsCount: "48.1k",
    crowdLevel: "peak",
    crowdStatus: "Peak Rush",
    crowdQueue: "~55m wait",
    distance: "6.5 km • 25 min drive",
    metroStation: "Ultadanga / Belgachia",
    metroDistance: "1.8 km",
    metroLine: "blue",
    featured: false,
    description: "Renowned for awe-inspiring mega-replicas of international landmarks, Disneyland palaces, and pure gold jewelry adorning Maa Durga.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    tags: ["Monument Replica", "Gold Ornaments", "VIP Road"],
    lat: 22.6052,
    lng: 88.4022,
    location: { type: "Point", coordinates: [88.4022, 22.6052] }
  },
  {
    id: "maddox-square",
    name: "Maddox Square",
    zone: "Ballygunge, South Kolkata",
    address: "Ritchie Rd, Ballygunge, Kolkata 700019",
    category: "traditional",
    isBonediBari: false,
    rating: "4.8",
    reviewsCount: "19.3k",
    crowdLevel: "low",
    crowdStatus: "Low Rush",
    crowdQueue: "Open Lawn • ~5m",
    distance: "1.2 km • 14 min walk",
    metroStation: "Netaji Bhavan Metro",
    metroDistance: "1.4 km",
    metroLine: "blue",
    featured: false,
    description: "The ultimate youth adda destination in Kolkata. Vast grassy park atmosphere, traditional pratima, dhunuchi dance, and food stalls.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
    tags: ["Open Adda", "Traditional", "Food Carnival"],
    lat: 22.5312,
    lng: 88.3582,
    location: { type: "Point", coordinates: [88.3582, 22.5312] }
  },
  {
    id: "suruchi-sangha",
    name: "Suruchi Sangha",
    zone: "New Alipore, South Kolkata",
    address: "Block M, New Alipore, Kolkata 700053",
    category: "theme",
    isBonediBari: false,
    rating: "4.7",
    reviewsCount: "16.7k",
    crowdLevel: "moderate",
    crowdStatus: "Moderate Crowd",
    crowdQueue: "~20m wait",
    distance: "3.1 km • 12 min drive",
    metroStation: "Majerhat / Kalighat Metro",
    metroDistance: "1.6 km",
    metroLine: "blue",
    featured: false,
    description: "Showcases diverse artistic craftsmanship and cultural unity, representing handcrafted themes from Indian states each year.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80",
    tags: ["Artisanal Theme", "Cultural Decor", "Award Winner"],
    lat: 22.5057,
    lng: 88.3278,
    location: { type: "Point", coordinates: [88.3278, 22.5057] }
  },
  {
    id: "tridhara-sammilani",
    name: "Tridhara Sammilani",
    zone: "Manoharpukur, South Kolkata",
    address: "Mahanirban Rd, Dover Terrace, Kolkata 700029",
    category: "theme",
    isBonediBari: false,
    rating: "4.8",
    reviewsCount: "25.0k",
    crowdLevel: "moderate",
    crowdStatus: "Moderate Crowd",
    crowdQueue: "~15m wait",
    distance: "700m • 8 min walk",
    metroStation: "Kalighat Metro",
    metroDistance: "750m",
    metroLine: "blue",
    featured: false,
    description: "Celebrated concept puja situated at the confluence of three roads, famous for contemporary visual art installations and soulful lighting.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    tags: ["Contemporary Art", "Confluence Theme", "Rashbehari Spine"],
    lat: 22.5186,
    lng: 88.3589,
    location: { type: "Point", coordinates: [88.3589, 22.5186] }
  },
  {
    id: "shovabazar-rajbari",
    name: "Sovabazar Rajbari",
    zone: "Sovabazar, North Kolkata",
    address: "36 Raja Nabakrishna St, Kolkata 700005",
    category: "heritage",
    isBonediBari: true,
    rating: "4.9",
    reviewsCount: "11.4k",
    crowdLevel: "low",
    crowdStatus: "Low Rush",
    crowdQueue: "~5m wait",
    distance: "3.8 km • 15 min transit",
    metroStation: "Shobhabazar Sutanuti Metro",
    metroDistance: "350m",
    metroLine: "blue",
    featured: false,
    description: "Historic aristocratic puja founded in 1757 by Raja Nabakrishna Deb. Features open courtyard Thanthania natmandir and antique family rituals.",
    image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&q=80",
    tags: ["Bonedi Bari", "Royal Courtyard", "1757 Heritage"],
    lat: 22.5978,
    lng: 88.3619,
    location: { type: "Point", coordinates: [88.3619, 22.5978] }
  },
  {
    id: "ahiritola-jubak-brinda",
    name: "Ahiritola Jubak Brinda",
    zone: "Ahiritola, North Kolkata",
    address: "Ahiritola Street, Kolkata 700005",
    category: "traditional",
    isBonediBari: false,
    rating: "4.7",
    reviewsCount: "13.8k",
    crowdLevel: "low",
    crowdStatus: "Low Rush",
    crowdQueue: "~10m wait",
    distance: "3.5 km • 14 min transit",
    metroStation: "Shobhabazar Sutanuti",
    metroDistance: "550m",
    metroLine: "blue",
    featured: false,
    description: "Popular North Kolkata Durga Puja celebrating near the historic Ahiritola Ghat on the Hooghly river.",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80",
    tags: ["Ghat Heritage", "North Kolkata", "Traditional"],
    lat: 22.5995,
    lng: 88.3558,
    location: { type: "Point", coordinates: [88.3558, 22.5995] }
  },
  {
    id: "deshapriya-park",
    name: "Deshapriya Park",
    zone: "Rashbehari, South Kolkata",
    address: "Deshapriya Park, Rashbehari Ave, Kolkata 700029",
    category: "theme",
    isBonediBari: false,
    rating: "4.8",
    reviewsCount: "35.2k",
    crowdLevel: "high",
    crowdStatus: "High Rush",
    crowdQueue: "~35m wait",
    distance: "800m • 9 min walk",
    metroStation: "Rabindra Sarobar / Kalighat",
    metroDistance: "800m",
    metroLine: "blue",
    featured: false,
    description: "Famous expansive park puja in South Kolkata known for grand thematic architecture and towering idol designs.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    tags: ["Grand Pavilion", "Park Atmosphere", "South Kolkata"],
    lat: 22.5158,
    lng: 88.3524,
    location: { type: "Point", coordinates: [88.3524, 22.5158] }
  }
];

export const CATEGORY_FILTERS = [
  { id: "all", label: "All Pandals", icon: "temple_hindu" },
  { id: "metro", label: "Metro Nearby", icon: "directions_subway" },
  { id: "low_rush", label: "Low Rush", icon: "family_restroom" },
  { id: "bonedi", label: "Bonedi Bari", icon: "history_edu" },
  { id: "theme", label: "Theme Puja", icon: "palette" }
];

/**
 * Real geographic coordinates for Kolkata Metro Line 1 & Line 2
 */
export const METRO_LINES_GEO = [
  {
    id: "blue",
    name: "Line 1 (Blue Line)",
    route: "Dakshineswar ⇄ Kavi Subhash",
    color: "#005bb3",
    path: [
      { lat: 22.6534, lng: 88.3582 }, // Dakshineswar
      { lat: 22.6412, lng: 88.3685 }, // Baranagar
      { lat: 22.6289, lng: 88.3842 }, // Noapara
      { lat: 22.6219, lng: 88.3934 }, // Dum Dum
      { lat: 22.6062, lng: 88.3846 }, // Belgachia
      { lat: 22.6009, lng: 88.3705 }, // Shyambazar
      { lat: 22.5978, lng: 88.3665 }, // Shobhabazar Sutanuti
      { lat: 22.5857, lng: 88.3601 }, // Girish Park
      { lat: 22.5807, lng: 88.3601 }, // Mahatma Gandhi Road
      { lat: 22.5694, lng: 88.3588 }, // Central
      { lat: 22.5658, lng: 88.3547 }, // Chandni Chowk
      { lat: 22.5647, lng: 88.3516 }, // Esplanade
      { lat: 22.5532, lng: 88.3524 }, // Park Street
      { lat: 22.5447, lng: 88.3496 }, // Maidan
      { lat: 22.5372, lng: 88.3475 }, // Rabindra Sadan
      { lat: 22.5317, lng: 88.3468 }, // Netaji Bhavan
      { lat: 22.5228, lng: 88.3471 }, // Jatin Das Park
      { lat: 22.5151, lng: 88.3469 }, // Kalighat
      { lat: 22.5103, lng: 88.3464 }, // Rabindra Sarobar
      { lat: 22.4975, lng: 88.3461 }, // Mahanayak Uttam Kumar
      { lat: 22.4842, lng: 88.3571 }, // Netaji
      { lat: 22.4764, lng: 88.3725 }, // Masterda Surya Sen
      { lat: 22.4721, lng: 88.3862 }, // Gitanjali
      { lat: 22.4735, lng: 88.3978 }  // Kavi Subhash
    ],
    stations: [
      { name: "Shyambazar", lat: 22.6009, lng: 88.3705 },
      { name: "Central", lat: 22.5694, lng: 88.3588 },
      { name: "Esplanade", lat: 22.5647, lng: 88.3516, interchange: true },
      { name: "Park Street", lat: 22.5532, lng: 88.3524 },
      { name: "Rabindra Sadan", lat: 22.5372, lng: 88.3475 },
      { name: "Kalighat", lat: 22.5151, lng: 88.3469 },
      { name: "Rabindra Sarobar", lat: 22.5103, lng: 88.3464 }
    ]
  },
  {
    id: "green",
    name: "Line 2 (Green Line)",
    route: "Howrah Maidan ⇄ Salt Lake Sector V",
    color: "#16a34a",
    path: [
      { lat: 22.5866, lng: 88.3262 }, // Howrah Maidan
      { lat: 22.5833, lng: 88.3428 }, // Howrah Railway Station
      { lat: 22.5714, lng: 88.3486 }, // Mahakaran (BBD Bagh)
      { lat: 22.5647, lng: 88.3516 }, // Esplanade Interchange
      { lat: 22.5684, lng: 88.3713 }, // Sealdah
      { lat: 22.5694, lng: 88.3912 }, // Phoolbagan
      { lat: 22.5717, lng: 88.4034 }, // Salt Lake Stadium
      { lat: 22.5776, lng: 88.4067 }, // Bengal Chemical
      { lat: 22.5864, lng: 88.4098 }, // City Centre
      { lat: 22.5901, lng: 88.4168 }, // Central Park
      { lat: 22.5852, lng: 88.4234 }, // Karunamoyee
      { lat: 22.5804, lng: 88.4326 }  // Salt Lake Sector V
    ],
    stations: [
      { name: "Howrah Stn", lat: 22.5833, lng: 88.3428 },
      { name: "Esplanade", lat: 22.5647, lng: 88.3516, interchange: true },
      { name: "Sealdah", lat: 22.5684, lng: 88.3713 },
      { name: "Phoolbagan", lat: 22.5694, lng: 88.3912 },
      { name: "Salt Lake Sec V", lat: 22.5804, lng: 88.4326 }
    ]
  }
];
