export type Slot = {
  time: "Morning" | "Afternoon" | "Evening";
  title: string;
  detail: string;
  cost: number;
};

export type ItineraryDay = {
  day: number;
  city: string;
  date: string;
  weather: string;
  temp: string;
  travelTime: string;
  distance: string;
  hotel: string;
  cost: number;
  slots: Slot[];
};

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    city: "Jaipur",
    date: "12 Nov",
    weather: "Sunny",
    temp: "28°C",
    travelTime: "—",
    distance: "0 km",
    hotel: "Rambagh Haveli Residency",
    cost: 8400,
    slots: [
      {
        time: "Morning",
        title: "Amber Fort & Sheesh Mahal",
        detail: "Reach by 8:00 AM to beat queues. Jeep ride up the ramp included.",
        cost: 1400,
      },
      {
        time: "Afternoon",
        title: "Panna Meena stepwell + lunch at Jal Mahal",
        detail: "Short 10 min drive; Rajasthani thali stop on the lake road.",
        cost: 1100,
      },
      {
        time: "Evening",
        title: "Bapu Bazaar & rooftop dinner",
        detail: "Block-print textiles and juttis, then dinner overlooking Hawa Mahal.",
        cost: 1900,
      },
    ],
  },
  {
    day: 2,
    city: "Jaipur → Udaipur",
    date: "13 Nov",
    weather: "Clear",
    temp: "26°C",
    travelTime: "6h 10m",
    distance: "393 km",
    hotel: "Lake Pichola Boutique Stay",
    cost: 9600,
    slots: [
      {
        time: "Morning",
        title: "Drive out via Ajmer highway",
        detail: "Breakfast packed; toll and fuel estimate included in transport.",
        cost: 3800,
      },
      {
        time: "Afternoon",
        title: "Chittorgarh Fort detour",
        detail: "90 minute stop at the Vijay Stambh — the route optimiser added this.",
        cost: 900,
      },
      {
        time: "Evening",
        title: "Boat ride on Lake Pichola",
        detail: "Sunset slot at 5:30 PM from Rameshwar Ghat.",
        cost: 1500,
      },
    ],
  },
  {
    day: 3,
    city: "Udaipur",
    date: "14 Nov",
    weather: "Partly cloudy",
    temp: "25°C",
    travelTime: "40m local",
    distance: "22 km",
    hotel: "Lake Pichola Boutique Stay",
    cost: 7200,
    slots: [
      {
        time: "Morning",
        title: "City Palace & Crystal Gallery",
        detail: "Audio guide recommended; two hours is enough.",
        cost: 1300,
      },
      {
        time: "Afternoon",
        title: "Saheliyon ki Bari + Bagore ki Haveli",
        detail: "Folk dance show tickets released at 6:00 PM.",
        cost: 800,
      },
      {
        time: "Evening",
        title: "Ambrai Ghat dinner",
        detail: "Book a lakeside table facing the illuminated palace.",
        cost: 2100,
      },
    ],
  },
  {
    day: 4,
    city: "Udaipur → Kumbhalgarh",
    date: "15 Nov",
    weather: "Sunny",
    temp: "27°C",
    travelTime: "2h 15m",
    distance: "84 km",
    hotel: "Aravalli Ridge Retreat",
    cost: 6800,
    slots: [
      {
        time: "Morning",
        title: "Ranakpur Jain Temple",
        detail: "1,444 carved pillars, open to visitors after 12 PM only.",
        cost: 600,
      },
      {
        time: "Afternoon",
        title: "Kumbhalgarh Fort walls",
        detail: "Second longest continuous wall in the world — walk the west section.",
        cost: 700,
      },
      {
        time: "Evening",
        title: "Light & sound show",
        detail: "Hindi show at 6:45 PM, 45 minutes.",
        cost: 500,
      },
    ],
  },
];

export const budgetBreakdown = [
  { name: "Accommodation", value: 28400, color: "var(--color-chart-1)" },
  { name: "Transport", value: 16200, color: "var(--color-chart-2)" },
  { name: "Food", value: 9800, color: "var(--color-chart-3)" },
  { name: "Tickets", value: 6100, color: "var(--color-chart-4)" },
  { name: "Miscellaneous", value: 3500, color: "var(--color-chart-5)" },
];

export const spendByDay = [
  { day: "Day 1", planned: 8400, actual: 7900 },
  { day: "Day 2", planned: 9600, actual: 10200 },
  { day: "Day 3", planned: 7200, actual: 6800 },
  { day: "Day 4", planned: 6800, actual: 6400 },
  { day: "Day 5", planned: 7100, actual: 7300 },
  { day: "Day 6", planned: 6900, actual: 6100 },
];

export const savingsTips = [
  "Shift the Udaipur stay one night earlier — weekday rates drop 22%.",
  "Swap the private cab on Day 2 for the Jaipur–Udaipur AC bus and save ₹2,600.",
  "Book Chittorgarh and Kumbhalgarh on a single ASI composite ticket.",
  "Three of your dinners are within walking distance — drop the evening cab budget.",
];

export type SavedTrip = {
  id: string;
  title: string;
  destination: string;
  dates: string;
  budget: number;
  days: number;
  status: "Upcoming" | "Draft" | "Completed";
  image: string;
};

export const savedTrips: SavedTrip[] = [
  {
    id: "t1",
    title: "Royal Rajasthan Loop",
    destination: "Jaipur · Udaipur · Kumbhalgarh",
    dates: "12 – 18 Nov 2026",
    budget: 64000,
    days: 7,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t2",
    title: "Kerala Slow Escape",
    destination: "Kochi · Munnar · Alleppey",
    dates: "04 – 09 Jan 2027",
    budget: 41500,
    days: 6,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t3",
    title: "Himalayan High Passes",
    destination: "Manali · Spiti · Kaza",
    dates: "20 – 28 Jun 2026",
    budget: 58000,
    days: 9,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "t4",
    title: "Coastal Konkan Drive",
    destination: "Mumbai · Ratnagiri · Goa",
    dates: "02 – 07 Feb 2027",
    budget: 37500,
    days: 6,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=70",
  },
];

export const monthlyTravel = [
  { month: "Jan", trips: 1, km: 820 },
  { month: "Feb", trips: 2, km: 1450 },
  { month: "Mar", trips: 1, km: 640 },
  { month: "Apr", trips: 0, km: 0 },
  { month: "May", trips: 2, km: 1980 },
  { month: "Jun", trips: 3, km: 2610 },
  { month: "Jul", trips: 1, km: 720 },
  { month: "Aug", trips: 2, km: 1340 },
];

export const recentConversations = [
  { id: "c1", title: "Make Rajasthan trip cheaper", snippet: "Cut ₹8,400 by moving two nights…", when: "2h ago" },
  { id: "c2", title: "Replace Goa with Gokarna", snippet: "Swapped and re-optimised the drive…", when: "Yesterday" },
  { id: "c3", title: "Hidden gems near Hampi", snippet: "Anegundi, Sanapur lake and Daroji…", when: "3 days ago" },
];
