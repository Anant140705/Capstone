export type Hotel = {
  id: string;
  name: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  amenities: string[];
  tags: ("Budget" | "Luxury" | "Family" | "Business" | "Couples")[];
  image: string;
};

export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "Rambagh Haveli Residency",
    city: "Jaipur",
    price: 6400,
    rating: 4.8,
    reviews: 1240,
    distance: "1.2 km from Hawa Mahal",
    amenities: ["Pool", "Breakfast", "Wi-Fi", "Spa"],
    tags: ["Luxury", "Couples"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "h2",
    name: "Lake Pichola Boutique Stay",
    city: "Udaipur",
    price: 4900,
    rating: 4.7,
    reviews: 860,
    distance: "300 m from Gangaur Ghat",
    amenities: ["Lake view", "Rooftop", "Wi-Fi"],
    tags: ["Couples", "Luxury"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "h3",
    name: "Anjuna Surf Hostel",
    city: "Goa",
    price: 1200,
    rating: 4.4,
    reviews: 2130,
    distance: "700 m from Anjuna Beach",
    amenities: ["Wi-Fi", "Cafe", "Bike rental"],
    tags: ["Budget"],
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "h4",
    name: "Marine Drive Business Suites",
    city: "Mumbai",
    price: 8200,
    rating: 4.6,
    reviews: 1780,
    distance: "By Nariman Point",
    amenities: ["Workspace", "Gym", "Airport pickup"],
    tags: ["Business", "Luxury"],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "h5",
    name: "Tea County Family Resort",
    city: "Munnar",
    price: 3400,
    rating: 4.5,
    reviews: 940,
    distance: "5 km from Mattupetty Dam",
    amenities: ["Garden", "Kids play", "Breakfast"],
    tags: ["Family", "Budget"],
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "h6",
    name: "Hampi Boulder Camp",
    city: "Hampi",
    price: 2100,
    rating: 4.3,
    reviews: 520,
    distance: "2 km from Virupaksha Temple",
    amenities: ["Tents", "Bonfire", "Bicycles"],
    tags: ["Budget", "Family"],
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=70",
  },
];
