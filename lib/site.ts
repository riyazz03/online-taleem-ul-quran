export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NODE_ENV === "production"
      ? "https://online-taleem-ul-quran-riyaz12.vercel.app"
      : "http://localhost:3100");

const whatsappGreeting =
  "Assalamu alaikum! I would like to know more about your Quran classes.";

export const site = {
  name: "Online Taleem ul Quran",
  shortName: "Taleem ul Quran",
  tagline: "Expert-led lessons, flexible schedules, lifelong learning.",
  description:
    "Learn the Holy Quran online with qualified male and female tutors. Live one-to-one Tajweed, Quran recitation and Quran memorization (Hifz) classes for children and adults, with flexible weekday and weekend timings.",
  email: "onlinetaleemulquranvlr@gmail.com",
  phones: [
    { display: "+91 90870 78760", tel: "+919087078760", wa: "919087078760" },
    { display: "+91 93607 71659", tel: "+919360771659", wa: "919360771659" },
  ],
  whatsappUrl: `https://wa.me/919087078760?text=${encodeURIComponent(whatsappGreeting)}`,
  address: {
    lines: [
      "Madarasa-E-Siddiquia, Masjid-E-Qadeem Campus",
      "No. 30, Old Mosque Street, Rahmathpala",
      "Vellore – 632001",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Masjid-E-Qadeem%2C%20Old%20Mosque%20Street%2C%20Vellore%20632001",
  },
  // Add profile URLs here to show the icons in the footer.
  socials: {
    facebook: "",
    x: "",
    instagram: "",
    youtube: "",
  },
  credit: { name: "Crayont", href: "mailto:crayontofficial@gmail.com" },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-course", label: "Courses" },
  { href: "/about-us", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
] as const;
