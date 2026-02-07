// States and Cities data structure
export const states = [
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    description: "Land of Gods, home to Char Dham and numerous trekking destinations",
    image: "/images/states/uttarakhand.jpg",
    popular: true
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    description: "Mountain state with beautiful valleys, adventure sports, and hill stations",
    image: "/images/states/himachal.jpg",
    popular: true
  },
  {
    id: "ladakh",
    name: "Ladakh",
    description: "Land of high passes, monasteries, and stunning landscapes",
    image: "/images/states/ladakh.jpg",
    popular: true
  },
  {
    id: "sikkim",
    name: "Sikkim",
    description: "Himalayan state with views of Kanchenjunga and Buddhist culture",
    image: "/images/states/sikkim.jpg",
    popular: true
  },
  {
    id: "gujarat",
    name: "Gujarat",
    description: "Land of diverse culture, heritage sites, and coastal beauty",
    image: "/images/states/gujarat.jpg",
    popular: true
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    description: "Rich in heritage, from ancient caves to sacred Jyotirlingas",
    image: "/images/states/maharashtra.jpg",
    popular: true
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    description: "Land of magnificent temples and rich Dravidian culture",
    image: "/images/states/tamil-nadu.jpg",
    popular: true
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    description: "Heart of Indian culture, home to Varanasi and many sacred sites",
    image: "/images/states/uttar-pradesh.jpg",
    popular: true
  },
  {
    id: "odisha",
    name: "Odisha",
    description: "Ancient temples, pristine beaches, and tribal culture",
    image: "/images/states/odisha.jpg",
    popular: true
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    description: "Home to Tirupati and rich Buddhist heritage",
    image: "/images/states/andhra-pradesh.jpg",
    popular: true
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    description: "Heart of India with ancient temples and wildlife",
    image: "/images/states/madhya-pradesh.jpg",
    popular: false
  },
  {
    id: "jharkhand",
    name: "Jharkhand",
    description: "Land of forests and waterfalls",
    image: "/images/states/jharkhand.jpg",
    popular: false
  },
  {
    id: "karnataka",
    name: "Karnataka",
    description: "Heritage sites, beaches, and Western Ghats",
    image: "/images/states/karnataka.jpg",
    popular: true
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    description: "Darjeeling hills and cultural richness",
    image: "/images/states/west-bengal.jpg",
    popular: true
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    description: "Land of rising sun with pristine natural beauty",
    image: "/images/states/arunachal.jpg",
    popular: false
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    description: "Abode of clouds, living root bridges, and waterfalls",
    image: "/images/states/meghalaya.jpg",
    popular: true
  },
  {
    id: "assam",
    name: "Assam",
    description: "Land of one-horned rhinos and tea gardens",
    image: "/images/states/assam.jpg",
    popular: false
  },
  {
    id: "punjab",
    name: "Punjab",
    description: "Land of five rivers and Golden Temple",
    image: "/images/states/punjab.jpg",
    popular: true
  },
  {
    id: "nagaland",
    name: "Nagaland",
    description: "Land of festivals and warrior tribes",
    image: "/images/states/nagaland.jpg",
    popular: false
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir",
    description: "Paradise on earth with stunning valleys",
    image: "/images/states/jammu-kashmir.jpg",
    popular: true
  }
];

export const cities = {
  uttarakhand: [
    { id: "chamoli", name: "Chamoli", stateId: "uttarakhand" },
    { id: "rudraprayag", name: "Rudraprayag", stateId: "uttarakhand" },
    { id: "uttarkashi", name: "Uttarkashi", stateId: "uttarakhand" }
  ],
  "himachal-pradesh": [
    { id: "kullu", name: "Kullu", stateId: "himachal-pradesh" },
    { id: "manali", name: "Manali", stateId: "himachal-pradesh" },
    { id: "lahaul-spiti", name: "Lahaul and Spiti", stateId: "himachal-pradesh" },
    { id: "chamba", name: "Chamba", stateId: "himachal-pradesh" }
  ],
  ladakh: [
    { id: "leh", name: "Leh", stateId: "ladakh" }
  ],
  sikkim: [
    { id: "west-sikkim", name: "West Sikkim", stateId: "sikkim" }
  ],
  gujarat: [
    { id: "dwarka", name: "Dwarka", stateId: "gujarat" },
    { id: "prabhas-patan", name: "Prabhas Patan", stateId: "gujarat" }
  ],
  maharashtra: [
    { id: "pune", name: "Pune", stateId: "maharashtra" },
    { id: "nashik", name: "Nashik", stateId: "maharashtra" },
    { id: "aurangabad", name: "Aurangabad", stateId: "maharashtra" },
    { id: "ahmednagar", name: "Ahmednagar", stateId: "maharashtra" }
  ],
  "tamil-nadu": [
    { id: "rameshwaram", name: "Rameshwaram", stateId: "tamil-nadu" },
    { id: "madurai", name: "Madurai", stateId: "tamil-nadu" }
  ],
  "uttar-pradesh": [
    { id: "varanasi", name: "Varanasi", stateId: "uttar-pradesh" }
  ],
  odisha: [
    { id: "puri", name: "Puri", stateId: "odisha" },
    { id: "konark", name: "Konark", stateId: "odisha" }
  ],
  "andhra-pradesh": [
    { id: "srisailam", name: "Srisailam", stateId: "andhra-pradesh" },
    { id: "tirupati", name: "Tirupati", stateId: "andhra-pradesh" }
  ],
  "madhya-pradesh": [
    { id: "ujjain", name: "Ujjain", stateId: "madhya-pradesh" },
    { id: "khandwa", name: "Khandwa", stateId: "madhya-pradesh" }
  ],
  jharkhand: [
    { id: "deoghar", name: "Deoghar", stateId: "jharkhand" }
  ],
  karnataka: [
    { id: "uttara-kannada", name: "Uttara Kannada", stateId: "karnataka" }
  ],
  "west-bengal": [
    { id: "darjeeling", name: "Darjeeling", stateId: "west-bengal" }
  ],
  "arunachal-pradesh": [
    { id: "lower-subansiri", name: "Lower Subansiri", stateId: "arunachal-pradesh" }
  ],
  meghalaya: [
    { id: "east-khasi-hills", name: "East Khasi Hills", stateId: "meghalaya" }
  ],
  assam: [
    { id: "majuli", name: "Majuli", stateId: "assam" }
  ],
  punjab: [
    { id: "amritsar", name: "Amritsar", stateId: "punjab" }
  ],
  nagaland: [
    { id: "kohima", name: "Kohima", stateId: "nagaland" }
  ],
  "jammu-kashmir": [
    { id: "bandipora", name: "Bandipora", stateId: "jammu-kashmir" }
  ]
};

// Helper functions
const normalizeSlug = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and");
};

export const getStateById = (stateId) => {
  const normalized = normalizeSlug(stateId);
  const aliasMap = {
    uttrakhand: "uttarakhand",
  };
  const resolved = aliasMap[normalized] || normalized;

  return states.find(
    (state) =>
      normalizeSlug(state.id) === resolved ||
      normalizeSlug(state.name) === resolved
  );
};

export const getCitiesByState = (stateId) => {
  const state = getStateById(stateId);
  return cities[state?.id] || [];
};

export const getCityById = (cityId) => {
  for (const stateCities of Object.values(cities)) {
    const city = stateCities.find(c => c.id === cityId);
    if (city) return city;
  }
  return null;
};

export const getAllCities = () => {
  return Object.values(cities).flat();
};
