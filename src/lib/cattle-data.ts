export type HealthGrade = "A" | "B" | "C";

export interface CattleRecord {
  id: string;
  breed: string;
  gender: "Male" | "Female";
  age: number; // months
  weight: number; // kg
  healthScore: HealthGrade;
  price: number;
  location: { district: string; state: string; distance: number; lat: number; lng: number };
  geohash: string;
  photo: string;
  gallery?: string[];
  lineage: { motherUID: string | null; fatherUID: string | null };
  offspring?: string[];
  txHash: string;
  registeredAt: string;
  ownershipCount: number;
  cvConfidence: number;
  sellerHash: string;
  observations?: string[];
}

// Stable Unsplash photos (cattle / buffalo / cow)
const photos: Record<string, string> = {
  buffalo:
    "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&q=80",
  gir: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
  sahiwal:
    "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80",
  rathi:
    "https://images.unsplash.com/photo-1605260854020-d44f4a6c8fda?auto=format&fit=crop&w=1200&q=80",
  holstein:
    "https://images.unsplash.com/photo-1560884970-d4d0db4d7d2e?auto=format&fit=crop&w=1200&q=80",
  tharparkar:
    "https://images.unsplash.com/photo-1597700951127-4c95b4d92f0d?auto=format&fit=crop&w=1200&q=80",
};

export const cattleData: CattleRecord[] = [
  {
    id: "CV-2024-UP-000123",
    breed: "Murrah Buffalo",
    gender: "Female",
    age: 40,
    weight: 480,
    healthScore: "A",
    price: 85000,
    location: { district: "Varanasi", state: "UP", distance: 34, lat: 25.31, lng: 82.97 },
    geohash: "ttnfv2",
    photo: photos.buffalo,
    lineage: { motherUID: "CV-2022-UP-000045", fatherUID: "CV-2021-UP-000012" },
    offspring: ["CV-2024-UP-000901"],
    txHash: "a3f9c27e91d4b6f80c12a5e7f3b8d92c",
    registeredAt: "2024-09-15",
    ownershipCount: 1,
    cvConfidence: 98.4,
    sellerHash: "e3b0c44298fc1c149afbf4c8996fb924",
    observations: [
      "Strong muscular build, healthy coat",
      "Udder development consistent with high milk yield breed",
      "No visible lesions, lameness, or eye discharge",
      "Body condition score: 3.5 / 5",
    ],
  },
  {
    id: "CV-2024-UP-000456",
    breed: "Gir Cow",
    gender: "Female",
    age: 52,
    weight: 340,
    healthScore: "A",
    price: 65000,
    location: { district: "Mirzapur", state: "UP", distance: 67, lat: 25.14, lng: 82.56 },
    geohash: "ttnfw1",
    photo: photos.gir,
    lineage: { motherUID: "CV-2020-RJ-000012", fatherUID: null },
    txHash: "b7d3e145a2c98f30d712e6c4f1a87b35",
    registeredAt: "2024-08-20",
    ownershipCount: 2,
    cvConfidence: 96.1,
    sellerHash: "f29b1c0a8e7d4651b0c9a83fe27ed4ab",
    observations: ["Pronounced dewlap and hump typical of Gir", "Skin pigmentation healthy"],
  },
  {
    id: "CV-2024-BH-000789",
    breed: "Sahiwal",
    gender: "Female",
    age: 36,
    weight: 390,
    healthScore: "B",
    price: 48000,
    location: { district: "Patna", state: "Bihar", distance: 145, lat: 25.59, lng: 85.13 },
    geohash: "ttngu3",
    photo: photos.sahiwal,
    lineage: { motherUID: null, fatherUID: null },
    txHash: "c2a8f4b1d937e605a4cd72f198b03e6f",
    registeredAt: "2024-10-01",
    ownershipCount: 1,
    cvConfidence: 94.7,
    sellerHash: "7a1c3d4e9f02b568c91d4e72fa3b6dd1",
    observations: ["Mild seasonal coat condition", "Recommended supplement of trace minerals"],
  },
  {
    id: "CV-2024-RJ-000321",
    breed: "Rathi",
    gender: "Male",
    age: 28,
    weight: 520,
    healthScore: "A",
    price: 120000,
    location: { district: "Jaipur", state: "Rajasthan", distance: 312, lat: 26.91, lng: 75.79 },
    geohash: "tszgv2",
    photo: photos.rathi,
    lineage: { motherUID: "CV-2021-RJ-000055", fatherUID: "CV-2019-RJ-000003" },
    txHash: "d9b1c7e524a83f6190ce4d72ab85f013",
    registeredAt: "2024-07-11",
    ownershipCount: 1,
    cvConfidence: 99.1,
    sellerHash: "5d2e1c9b0a4f8761c92a3b4e7d8f0a23",
    observations: ["Excellent draft conformation", "High muscle mass, robust hooves"],
  },
  {
    id: "CV-2024-MP-000654",
    breed: "Holstein Friesian",
    gender: "Female",
    age: 44,
    weight: 560,
    healthScore: "A",
    price: 95000,
    location: { district: "Bhopal", state: "MP", distance: 498, lat: 23.26, lng: 77.41 },
    geohash: "ttnkz1",
    photo: photos.holstein,
    lineage: { motherUID: "CV-2022-MP-000102", fatherUID: "CV-2020-MP-000044" },
    txHash: "e5f2d9a710bc4836f902e1c7ab39ed12",
    registeredAt: "2024-06-30",
    ownershipCount: 3,
    cvConfidence: 97.8,
    sellerHash: "9b4e3c2f1d0a5867c12b8e74af36cd29",
    observations: ["High lactation capacity", "Vaccinated against FMD and brucellosis"],
  },
  {
    id: "CV-2024-UP-000987",
    breed: "Tharparkar",
    gender: "Female",
    age: 60,
    weight: 410,
    healthScore: "B",
    price: 55000,
    location: { district: "Agra", state: "UP", distance: 89, lat: 27.18, lng: 78.01 },
    geohash: "ttnhx4",
    photo: photos.tharparkar,
    lineage: { motherUID: null, fatherUID: "CV-2019-RJ-000018" },
    txHash: "f1c4a2e8b937d605c0a3e72f198b03e6",
    registeredAt: "2024-11-02",
    ownershipCount: 1,
    cvConfidence: 95.3,
    sellerHash: "2e8c0a17b39f4d5610ce2a47b81c5fd0",
    observations: ["Heat-tolerant desert breed", "Good adaptation to arid conditions"],
  },
];

export function getCattle(id: string): CattleRecord | undefined {
  return cattleData.find((c) => c.id === id);
}

export const breeds = [
  "Murrah Buffalo",
  "Gir Cow",
  "Sahiwal",
  "Holstein Friesian",
  "Tharparkar",
  "Rathi",
  "Other",
];

export const states = ["Uttar Pradesh", "Bihar", "Rajasthan", "Madhya Pradesh"];

export function formatINR(n: number): string {
  return "₹ " + n.toLocaleString("en-IN");
}

export function formatAge(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y} yr ${m} mo`;
}
