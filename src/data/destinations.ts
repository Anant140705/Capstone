export type Destination = {
  id: string;
  name: string;
  state: string;
  category: "Heritage" | "Beach" | "Mountain" | "Spiritual" | "Wildlife" | "City";
  rating: number;
  bestTime: string;
  entryFee: string;
  duration: string;
  budgetBand: "Budget" | "Moderate" | "Premium";
  description: string;
  image: string;
  /** normalized 0-100 coordinates on the stylised India map */
  x: number;
  y: number;
  hiddenGem?: boolean;
};

export const destinations: Destination[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    rating: 4.8,
    bestTime: "Oct – Mar",
    entryFee: "₹200",
    duration: "2–3 days",
    budgetBand: "Moderate",
    description:
      "The Pink City pairs Amber Fort ramparts with bazaars, stepwells and rooftop dining under the Aravallis.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=70",
    x: 33,
    y: 33,
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    category: "Heritage",
    rating: 4.9,
    bestTime: "Sep – Mar",
    entryFee: "₹300",
    duration: "2 days",
    budgetBand: "Premium",
    description:
      "Lake palaces, marble ghats and slow sunset boat rides make Udaipur India's most romantic city break.",
    image:
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=900&q=70",
    x: 28,
    y: 41,
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    category: "Beach",
    rating: 4.7,
    bestTime: "Nov – Feb",
    entryFee: "Free",
    duration: "4 days",
    budgetBand: "Moderate",
    description:
      "Portuguese quarters, cliff cafés and quiet south-coast sands — good for both nightlife and slow mornings.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=70",
    x: 27,
    y: 66,
  },
  {
    id: "leh",
    name: "Leh – Ladakh",
    state: "Ladakh",
    category: "Mountain",
    rating: 4.9,
    bestTime: "Jun – Sep",
    entryFee: "₹400 permits",
    duration: "6–7 days",
    budgetBand: "Premium",
    description:
      "High-altitude desert, Pangong blue and monastery ridgelines. Plan two acclimatisation days before driving.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=70",
    x: 34,
    y: 10,
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Spiritual",
    rating: 4.6,
    bestTime: "Oct – Mar",
    entryFee: "Free",
    duration: "2 days",
    budgetBand: "Budget",
    description:
      "Dawn boat rides along the ghats, Ganga aarti at Dashashwamedh and the oldest lanes in the country.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=70",
    x: 55,
    y: 39,
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    category: "Mountain",
    rating: 4.7,
    bestTime: "Sep – Mar",
    entryFee: "₹150",
    duration: "3 days",
    budgetBand: "Budget",
    description:
      "Tea terraces in the Western Ghats with cloud-level viewpoints and Eravikulam's Nilgiri tahr trails.",
    image:
      "https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?auto=format&fit=crop&w=900&q=70",
    x: 34,
    y: 85,
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    category: "Heritage",
    rating: 4.8,
    bestTime: "Nov – Feb",
    entryFee: "₹40",
    duration: "2 days",
    budgetBand: "Budget",
    description:
      "Boulder fields and Vijayanagara ruins — cycle between temples at sunrise, climb Matanga at dusk.",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010248c1e60?auto=format&fit=crop&w=900&q=70",
    x: 35,
    y: 71,
    hiddenGem: true,
  },
  {
    id: "meghalaya",
    name: "Shillong & Cherrapunji",
    state: "Meghalaya",
    category: "Mountain",
    rating: 4.7,
    bestTime: "Oct – Apr",
    entryFee: "₹100",
    duration: "5 days",
    budgetBand: "Moderate",
    description:
      "Living root bridges, Nohkalikai falls and the clearest river water in the country at Dawki.",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=70",
    x: 79,
    y: 38,
    hiddenGem: true,
  },
  {
    id: "ranthambore",
    name: "Ranthambore",
    state: "Rajasthan",
    category: "Wildlife",
    rating: 4.5,
    bestTime: "Oct – Apr",
    entryFee: "₹1,200 safari",
    duration: "2 days",
    budgetBand: "Moderate",
    description:
      "One of the best tiger-sighting probabilities in India, wrapped around a tenth-century fort.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=70",
    x: 36,
    y: 39,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    category: "City",
    rating: 4.5,
    bestTime: "Nov – Feb",
    entryFee: "Free",
    duration: "2 days",
    budgetBand: "Premium",
    description:
      "Art-deco waterfronts, Kala Ghoda galleries, Irani cafés and the ferry out to Elephanta caves.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=70",
    x: 28,
    y: 57,
  },
  {
    id: "andaman",
    name: "Havelock Island",
    state: "Andaman",
    category: "Beach",
    rating: 4.9,
    bestTime: "Nov – Apr",
    entryFee: "₹50",
    duration: "5 days",
    budgetBand: "Premium",
    description:
      "Radhanagar's white sand and shallow reefs — the best beginner scuba water in the country.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=70",
    x: 82,
    y: 78,
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    category: "Mountain",
    rating: 4.8,
    bestTime: "May – Oct",
    entryFee: "Free",
    duration: "7 days",
    budgetBand: "Moderate",
    description:
      "Cold desert villages, Key monastery and Chandratal lake — a slow circuit best done by shared cab.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=70",
    x: 38,
    y: 17,
    hiddenGem: true,
  },
];

export const states = [...new Set(destinations.map((d) => d.state))].sort();
export const categories = [
  "Heritage",
  "Beach",
  "Mountain",
  "Spiritual",
  "Wildlife",
  "City",
] as const;

export const routeLines: { from: string; to: string }[] = [
  { from: "jaipur", to: "udaipur" },
  { from: "udaipur", to: "mumbai" },
  { from: "mumbai", to: "goa" },
  { from: "goa", to: "hampi" },
  { from: "hampi", to: "munnar" },
];
