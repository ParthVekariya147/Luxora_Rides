// import all images from assets/images directory
import img01 from "../all-images/cars-img/bmw-offer.png";
import img02 from "../all-images/cars-img/mahindra-SUVs.jpg";
import img03 from "../all-images/cars-img/audi.png";
import img04 from "../all-images/cars-img/Tata-Punch.jpg";
import img05 from "../all-images/cars-img/porsche-macan.jpg";
import img06 from "../all-images/cars-img/lexus-nx.jpg";
import img07 from "../all-images/cars-img/mahindra-xev-9e.jpg";
import img08 from "../all-images/cars-img/renault_kiger.jpg";
import img09 from "../all-images/cars-img/MG_M9_EV.jpg";
import img10 from "../all-images/cars-img/ferrari_amalfi.jpg";
import img11 from "../all-images/cars-img/MG_cyberster_EV.jpg";
import img12 from "../all-images/cars-img/Renault_Kwid.jpg";
import img13 from "../all-images/cars-img/volvo_xc40.jpg";
import img14 from "../all-images/cars-img/jaguar-f-pace.jpg";
import img15 from "../all-images/cars-img/honda-elevate.jpg";

const carData = [
  
   {
  id: 1,
  brand: "BMW",
  rating: 145,
  carName: "BMW XM",
  imgUrl: img01, // Replace with your imported image path
  model: "G09‑Model‑2025",
  price: 32000,
  speed: "250 km/h",
  gps: "BMW iDrive 8.5 with GPS Navigation",
  seatType: "M Lounge Seating, Leather Upholstery",
  automatic: "8‑Speed M Steptronic",
  description:
    "The 2025 BMW XM is a high-performance plug-in hybrid SUV combining M division engineering with electrification. It features a 4.4L TwinPower Turbo V8 paired with an electric motor, producing a combined 653 hp and 800 Nm of torque. The XM offers a bold design, a luxurious cabin with M Lounge seating, and advanced tech including curved displays and BMW iDrive 8.5.",
},

  {
    id: 2,
    brand: "Mahindra",
    rating: 170,
    carName: "XUV400 EV",
    imgUrl: img02, // Replace with actual image import or path
    model: "XUV400 EL Pro",
    price: 29000, // Approximate daily rent in INR
    speed: "160 km/h",
    gps: "Built-in GPS with Mahindra AdrenoX interface",
    seatType: "Premium leatherette with contrast stitching",
    automatic: "Single-speed automatic (EV)",
    description:
      "The Mahindra XUV400 is a feature-rich electric SUV designed for modern urban and highway travel. Powered by a 39.4 kWh battery, it offers a certified range of up to 456 km and can go from 0 to 100 km/h in 8.3 seconds. It supports fast charging, advanced connectivity, dual-tone styling, and a spacious cabin, making it a solid choice in the Indian EV market.",
  },
  {
    id: 3,
    brand: "Audi",
    rating: 135,
    carName: "Audi Q6 e-tron",
    imgUrl: img03,
    model: "Q6 e‑tron (2025)",
    price: 30000,
    speed: "209 km/h",
    gps: 'MMI Navigation with 14.5" OLED touchscreen',
    seatType:
      "Leather/Vegan leather, Heated & Ventilated front, 3‑zone climate",
    automatic: "direct drive (EV)",
    description:
      "The 2025 Audi Q6 e‑tron is a premium mid‑size electric SUV built on the new PPE platform (shared with Porsche Macan EV). Available in RWD single‑motor, AWD “quattro”, and high‑performance SQ6 trim. Features include curved dual displays, passenger touchscreen, AR HUD, and rapid 270 kW charging.",
  },

  {
    id: 4,
    brand: "Tata",
    rating: 155,
    carName: "Tata Punch",
    imgUrl: img04, // Replace with actual image import or path
    model: "Creative Flagship Dual Tone",
    price: 32000, // Approximate daily rent in INR
    speed: "150 km/h",
    gps: "Harman touchscreen infotainment with navigation support",
    seatType: "Fabric upholstery with dual-tone finish",
    automatic: "5-speed AMT (Automated Manual Transmission)",
    description:
      "The Tata Punch is a compact SUV with a bold stance and top-tier safety, earning a 5-star Global NCAP rating. It features a 1.2L Revotron petrol engine, high ground clearance, smart infotainment, and city-friendly agility. The Punch blends performance and practicality, making it ideal for urban and occasional off-road use.",
  },
  {
    id: 5,
    brand: "Porsche",
    rating: 205,
    carName: "Porsche Macan",
    imgUrl: img05,
    model: "Macan 2.0 Turbo Petrol AWD",
    price: 57000,
    speed: "232 km/h",
    gps: "Porsche Communication Management (PCM) with Navigation Plus",
    seatType: "Leather sport seats with 14-way electric adjustment",
    automatic: "7-speed PDK automatic transmission",
    description:
      "The Porsche Macan is a high-performance luxury SUV known for its sporty handling and premium comfort. It features a 2.0L turbocharged petrol engine with AWD, sharp driving dynamics, and a refined cabin. With options like adaptive air suspension, Bose surround sound, and a fully digital cockpit, the Macan brings the essence of Porsche to the SUV segment.",
  },
  
  {
    id: 6,
    brand: "Lexus",
    rating: 190,
    carName: "Lexus NX 350h",
    imgUrl: img06,
    model: "NX 350h Luxury AWD",
    price: 52000,
    speed: "200 km/h",
    gps: "Lexus Premium Navigation with 14-inch touchscreen",
    seatType: "Ventilated leather seats with memory function",
    automatic: "E-CVT Automatic (Hybrid)",
    description:
      "The Lexus NX 350h is a refined hybrid luxury SUV that blends power, efficiency, and advanced tech. It features a 2.5L petrol engine paired with an electric motor for smooth AWD performance. Notable highlights include a panoramic sunroof, Mark Levinson sound system, wireless Apple CarPlay, and Lexus Safety System+. A perfect mix of eco-friendliness and elegance.",
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
      "The Mahindra XEV 9e is a premium electric coupe SUV built on Mahindra’s all-new INGLO EV platform. Combining bold styling with advanced technology, the XEV 9e offers a range of up to 610 km on a single charge and features dual-screen infotainment, Level 2 ADAS, fast charging support, and sustainable interiors. Its coupe-like profile and futuristic cabin make it one of the most stylish and feature-rich EVs in the Indian market.",
  },

  {
    id: 8,
    brand: "Renault",
    rating: 108,
    carName: "Renault Kiger Facelift",
    imgUrl: img08,
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
    id: 9,
    brand: "MG",
    rating: 140,
    carName: "MG M9 EV",
    imgUrl: img09,
    model: "M9 Electric MPV",
    price: 25000,
    speed: "0–100 km/h in ~8.5 s",
    gps: 'iSmart Navigation with 12.3" infotainment display',
    seatType: "Ottoman leather seats with massage, ventilation & heating",
    automatic: "transmission (FWD)",
    description:
      "The MG M9 EV is a full-size luxury electric MPV featuring a 90 kWh battery with up to 548 km range. It offers 6- to 8-seater configurations, Level‑2 ADAS, dual sunroofs, triple-zone climate, JBL sound, V2L charging, and ultra-premium ottoman seats with 8 massage modes. Locally assembled in India, it combines limousine-grade comfort with green tech for families or business transport.",
  },

  {
    id: 10,
    brand: "Ferrari",
    rating: 160,
    carName: "Ferrari 12Cilindri",
    imgUrl: img10,
    model: "12Cilindri / Amalfi V12 GT (2025)",
    price: 42000,
    speed: "0–100 km/h in 2.9 s, Top speed 340 km/h",
    gps: "Ferrari Infotainment with integrated navigation & dual displays",
    seatType:
      "Leather sports seats with memory, ventilation & electronic adjustment",
    automatic: "8-speed dual-clutch F1",
    description:
      "The Ferrari 12Cilindri is a striking new front-engine V12 grand tourer inspired by classic Ferrari GTs. It features a 6.5L naturally aspirated V12 delivering 830 hp and 678 Nm of torque, achieving 0–100 km/h in 2.9 seconds. With its low-slung coupe profile, active aerodynamics, and a high-tech cabin with dual screens, it blends timeless Ferrari emotion with modern performance. It replaces the Ferrari 812 Superfast.",
  },

  {
    id: 11,
    brand: "MG",
    rating: 145,
    carName: "MG Cyberster",
    imgUrl: img11,
    model: "Cyberster EV Roadster (2025)",
    price: 45000,
    speed: "0–100 km/h in 3.2 s",
    gps: "iSmart Navigation with triple-screen layout",
    seatType: "Electric sports seats with leather upholstery",
    automatic: "Dual-motor AWD",
    description:
      "The MG Cyberster is a fully electric 2-seater roadster with a futuristic design, scissor doors, and dual electric motors producing 503 bhp and 725 Nm. It features a 77 kWh battery, rapid acceleration, triple curved displays, and Level‑2 ADAS. MG’s bold EV represents a blend of classic roadster spirit and cutting-edge EV tech.",
  },

  {
    id: 12,
    brand: "Renault",
    rating: 112,
    carName: "Renault Kwid",
    imgUrl: img12,
    model: "Climber 1.0 AMT Dual Tone",
    price: 28000,
    speed: "150 km/h",
    gps: "In-built GPS with 8-inch touchscreen MediaNAV",
    seatType: "Fabric seat upholstery with orange accents",
    automatic: "5-speed AMT (Automatic Manual Transmission)",
    description:
      "The Renault Kwid is a compact hatchback known for its SUV-inspired design and affordability. It features a 1.0L engine with AMT transmission, a digital instrument cluster, touchscreen infotainment, and excellent fuel economy. It's a great choice for city commutes and first-time drivers looking for style and efficiency in a budget-friendly package.",
  },

  {
    id: 13,
    brand: "Volvo",
    rating: 185,
    carName: "Volvo XC40 Recharge",
    imgUrl: img13,
    model: "XC40 Recharge Twin AWD",
    price: 45000,
    speed: "180 km/h",
    gps: "Integrated Google Maps with Android Automotive OS",
    seatType: "Nappa leather upholstery with powered front seats",
    automatic: "Single-speed automatic (EV)",
    description:
      "The Volvo XC40 Recharge is a luxury electric SUV combining Scandinavian design with cutting-edge EV performance. It comes with a dual-motor setup delivering 408 hp, a 78 kWh battery, and an estimated range of up to 418 km. Features include a panoramic sunroof, premium audio system, ADAS safety tech, and seamless Google integration. Ideal for premium EV enthusiasts.",
  },


  {
    id: 14,
    brand: "Jaguar",
    rating: 195,
    carName: "Jaguar F-Pace",
    imgUrl: img14,
    model: "F-Pace R-Dynamic S 2.0 Petrol AWD",
    price: 50000,
    speed: "217 km/h",
    gps: "Pivi Pro with 11.4-inch HD touchscreen and connected navigation",
    seatType: "Windsor leather performance seats with heating and memory",
    automatic: "8-speed automatic transmission",
    description:
      "The Jaguar F-Pace is a performance-focused luxury SUV offering dynamic handling and elegant styling. Powered by a 2.0L turbocharged petrol engine with AWD, it delivers a sporty yet refined drive. With features like adaptive dynamics, a panoramic roof, Meridian sound system, and AI-driven infotainment, the F-Pace ensures a thrilling and comfortable journey.",
  },

  {
    id: 15,
    brand: "Honda",
    rating: 140,
    carName: "Honda Elevate",
    imgUrl: img15,
    model: "Elevate ZX CVT",
    price: 25000,
    speed: "170 km/h",
    gps: "Honda Connect with built-in navigation and remote control features",
    seatType: "Leather upholstery with driver seat height adjustment",
    automatic: "7-speed CVT automatic transmission",
    description:
      "The Honda Elevate is a stylish and practical compact SUV tailored for Indian roads. Powered by a 1.5L i-VTEC petrol engine, it offers smooth performance with a CVT option. Key features include a 10.25-inch infotainment system, wireless Apple CarPlay & Android Auto, ADAS safety tech, and a bold, SUV-like stance. It’s ideal for daily commutes and weekend getaways.",
  },
];

export default carData;
