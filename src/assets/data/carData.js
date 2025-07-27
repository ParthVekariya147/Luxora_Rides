// import all images from assets/images directory
import img01 from "../all-images/cars-img/rolls-royce.jpg";
import img02 from "../all-images/cars-img/Tesla-Model-Y.jpg";
import img03 from "../all-images/cars-img/bmw-offer.png";
import img04 from "../all-images/cars-img/renault_kiger.jpg";
import img05 from "../all-images/cars-img/MG_M9_EV.jpg";
import img06 from "../all-images/cars-img/audi.png";
import img07 from "../all-images/cars-img/mahindra-xev-9e.jpg";
import img08 from "../all-images/cars-img/ferrari_amalfi.jpg";
import img09 from "../all-images/cars-img/MG_cyberster_EV.jpg";


const carData = [
  {
    id: 1,
    brand: "Rolls-Royce",
    rating: 200,
    carName: "Rolls-Royce Droptail",
    imgUrl: img01,
    model: "Droptail Coachbuilt Roadster",
    price: 26000,
    speed: "250 km/h",
    gps: "Bespoke Rolls-Royce infotainment with handcrafted dashboard interface",
    seatType: "Two-seat leather lounge with exotic wood & carbon detailing",
    automatic: "8-speed ZF",
    description:
      "The Rolls-Royce Droptail is a hyper-exclusive coachbuilt roadster limited to only 4 units globally. Inspired by luxury yachts and 1930s roadsters, it combines modern elegance with timeless craftsmanship. It features a 6.75L twin-turbocharged V12 engine, removable carbon-fiber roof, custom Audemars Piguet timepiece, and unmatched personalization. Every Droptail is individually commissioned, making it the pinnacle of luxury motoring.",
  },

  {
    id: 2,
    brand: "Tesla",
    rating: 150,
    carName: "Tesla Model Y",
    imgUrl: img02,
    model: "Model Y (2025)",
    price: 20000,
    speed: "217–250 km/h",
    gps: "15-inch touchscreen with Tesla Navigation, voice control, and live traffic updates",
    seatType: "Vegan leather, heated front/rear seats, 5 or optional 7-seater",
    automatic: "dual-motor AWD",
    description:
      "The Tesla Model Y is a fully electric mid-size SUV now available in India as of July 2025. It offers up to 533 km range (WLTP), Autopilot with optional Full Self Driving (FSD), and over-the-air software updates. Known for its minimalistic interior and 15″ touchscreen, the Model Y blends performance, tech, and practicality. Imported initially from Giga Shanghai, it represents Tesla’s entry into the Indian EV market.",
  },

  {
    id: 3,
    brand: "BMW",
    rating: 132,
    carName: "BMW 520i",
    imgUrl: img03,
    model: "G60‑Model‑2025",
    price: 24000,
    speed: "230km/h",
    gps: "GPS Navigation",
    seatType: "Leather, Heated Front Seats",
    automatic: "8‑Speed ZF ",
    description:
      "The 2025 BMW 520i (Luxury Line) is part of the eighth-gen G60 5 Series, offering an efficient 2.0 L TwinPower Turbo inline‑4 producing ~208 PS and 330 Nm, mated to an 8‑speed automatic gearbox. It provides a premium cabin with adaptive LED lighting, advanced driver assistance, and a tech‑rich curved display setup.",
  },

  {
    id: 4,
    brand: "Renault",
    rating: 108,
    carName: "Renault Kiger Facelift",
    imgUrl: img04,
    model: "Kiger Facelift",
    price: 19000,
    speed: " 0–100 km/h in 13 s",
    gps: "8-inch touchscreen with wireless Apple CarPlay & Android Auto",
    seatType: "Dual-tone fabric with contrast stitching",
    automatic: "AMT & CVT",
    description:
      "The 2025 Renault Kiger Facelift is a refreshed sub-4 meter SUV featuring a redesigned front bumper, updated LED lighting, new alloy wheels, and a more refined interior. It offers both 1.0L naturally aspirated and turbo petrol engines with manual, AMT, and CVT transmission options. Equipped with wireless smartphone connectivity, cruise control, and up to 4 airbags, it balances affordability with style and utility for city and highway use.",
  },

  {
    id: 5,
    brand: "MG",
    rating: 140,
    carName: "MG M9 EV",
    imgUrl: img05,
    model: "M9 Electric MPV",
    price: 25000,
    speed: "0–100 km/h in ~8.5 s",
    gps: "iSmart Navigation with 12.3\" infotainment display",
    seatType: "Ottoman leather seats with massage, ventilation & heating",
    automatic: "transmission (FWD)",
    description:
      "The MG M9 EV is a full-size luxury electric MPV featuring a 90 kWh battery with up to 548 km range. It offers 6- to 8-seater configurations, Level‑2 ADAS, dual sunroofs, triple-zone climate, JBL sound, V2L charging, and ultra-premium ottoman seats with 8 massage modes. Locally assembled in India, it combines limousine-grade comfort with green tech for families or business transport.",
  },

  {
    id: 6,
    brand: "Audi",
    rating: 135,
    carName: "Audi Q6 e-tron",
    imgUrl: img06,
    model: "Q6 e‑tron (2025)",
    price:30000,
    speed: "209 km/h",
    gps: "MMI Navigation with 14.5\" OLED touchscreen",
    seatType: "Leather/Vegan leather, Heated & Ventilated front, 3‑zone climate",
    automatic: "direct drive (EV)",
    description:
      "The 2025 Audi Q6 e‑tron is a premium mid‑size electric SUV built on the new PPE platform (shared with Porsche Macan EV). Available in RWD single‑motor, AWD “quattro”, and high‑performance SQ6 trim. Features include curved dual displays, passenger touchscreen, AR HUD, and rapid 270 kW charging.",
  },

  {
  id: 7,
  brand: "Mahindra",
  rating: 170,
  carName: "Mahindra XEV 9e",
  imgUrl: img07, 
  model: "XEV 9e Coupe Electric SUV",
  price: 26000, 
  speed: "200 km/h",
  gps: "5G-connected Mahindra AdrenoX infotainment with Level 2 ADAS integration",
  seatType: "Vegan leather seats with ambient lighting and panoramic sunroof",
  automatic: "automatic with regenerative braking",
  description:
    "The Mahindra XEV 9e is a premium electric coupe SUV built on Mahindra’s all-new INGLO EV platform. Combining bold styling with advanced technology, the XEV 9e offers a range of up to 610 km on a single charge and features dual-screen infotainment, Level 2 ADAS, fast charging support, and sustainable interiors. Its coupe-like profile and futuristic cabin make it one of the most stylish and feature-rich EVs in the Indian market."
  },

  {
    id: 8,
    brand: "Ferrari",
    rating: 160,
    carName: "Ferrari 12Cilindri",
    imgUrl: img08,
    model: "12Cilindri / Amalfi V12 GT (2025)",
    price: 32000,
    speed: "0–100 km/h in 2.9 s, Top speed 340 km/h",
    gps: "Ferrari Infotainment with integrated navigation & dual displays",
    seatType: "Leather sports seats with memory, ventilation & electronic adjustment",
    automatic: "8-speed dual-clutch F1",
    description:
      "The Ferrari 12Cilindri is a striking new front-engine V12 grand tourer inspired by classic Ferrari GTs. It features a 6.5L naturally aspirated V12 delivering 830 hp and 678 Nm of torque, achieving 0–100 km/h in 2.9 seconds. With its low-slung coupe profile, active aerodynamics, and a high-tech cabin with dual screens, it blends timeless Ferrari emotion with modern performance. It replaces the Ferrari 812 Superfast.",
  },

  {
    id: 9,
    brand: "MG",
    rating: 145,
    carName: "MG Cyberster",
    imgUrl: img09,
    model: "Cyberster EV Roadster (2025)",
    price: 19000,
    speed: "0–100 km/h in 3.2 s",
    gps: "iSmart Navigation with triple-screen layout",
    seatType: "Electric sports seats with leather upholstery",
    automatic: "Dual-motor AWD",
    description:
      "The MG Cyberster is a fully electric 2-seater roadster with a futuristic design, scissor doors, and dual electric motors producing 503 bhp and 725 Nm. It features a 77 kWh battery, rapid acceleration, triple curved displays, and Level‑2 ADAS. MG’s bold EV represents a blend of classic roadster spirit and cutting-edge EV tech.",
  },
];

export default carData;
