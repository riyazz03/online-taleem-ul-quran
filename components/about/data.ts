/**
 * About page copy. Carried over from the original "About Us" sections
 * (AboutUsCta, AboutUsGuidance, AboutUsFreeTrial) with light edits for
 * grammar and rhythm — no new facts.
 */

export const hero = {
  eyebrow: "About us",
  title: "Connecting you with the *timeless wisdom of Islam*",
  description:
    "Guiding hearts with the wisdom of the Quran, illuminating lives with the light of Islam.",
} as const;

/** Lead sentence of "Our Mission and Purpose" (lit word by word on scroll). */
export const missionLead =
  "Welcome to *Online Taleem ul Quran.* With over *15 years* of experience in Quranic education, we observed a significant gap.";

export const missionChapters = {
  gap: {
    label: "The gap",
    text: "While children often have the opportunity to learn the Quran through part-time madrasas, many adults — particularly housewives and older individuals — find it difficult to access such learning. Their responsibilities, or feelings of shyness due to age, often prevent them from attending mosques or joining traditional classes, even though they have a deep desire to learn the Quran with proper Tajweed.",
  },
  answer: {
    label: "Our answer",
    text: "To address this need, our team launched an online Quran education platform. This initiative is designed to offer flexible, accessible Quran learning for everyone — children, adults, men and women — regardless of their schedules or circumstances.",
  },
  growth: {
    label: "Our growth",
    before: "Alhamdulillah, after successfully running our offline Quran education services, we began offering online classes",
    highlight: "three years ago",
    after: ".",
  },
  aim: "Our aim is to make the words of Allah accessible to hearts around the world, and to help preserve and strengthen faith through proper Quranic learning.",
  journey: {
    label: "Your journey",
    text: "Under the guidance of experienced teachers and adult supervision, students can now learn the Quran at their own pace and convenience. By enrolling with us, you can gain the ability to read the Quran correctly and beautifully, with Tajweed.",
  },
} as const;

export const values = [
  {
    title: "Open to everyone",
    text: "Flexible, accessible Quran learning for children, adults, men and women — whatever your schedule or circumstances.",
    icon: "door",
  },
  {
    title: "Proper Tajweed",
    text: "Gain the ability to read the Quran correctly and beautifully, with proper Tajweed — guided by teachers who correct every mistake with care.",
    icon: "book",
  },
  {
    title: "A safe space for sisters",
    text: "Female teachers for female students, in a safe and comfortable learning environment.",
    icon: "shield",
  },
  {
    title: "Learn at your own pace",
    text: "Under the guidance of experienced teachers and adult supervision, learn at your own pace and convenience.",
    icon: "hourglass",
  },
] as const;

export const milestones = [
  {
    marker: "15+",
    kicker: "15+ years",
    title: "Years of Quranic education",
    text: "Over fifteen years of teaching the Quran showed us a gap: many adults — especially housewives and older learners — longed to learn with proper Tajweed, but could not reach a class.",
  },
  {
    marker: "Offline",
    kicker: "Before we went online",
    title: "Offline Quran education",
    text: "Alhamdulillah, we successfully ran our offline Quran education services before taking our classes online.",
  },
  {
    marker: "Online",
    kicker: "Three years ago",
    title: "Online classes begin",
    text: "Our team launched an online Quran education platform, bringing flexible, accessible learning to children, adults, men and women.",
  },
  {
    marker: "Today",
    kicker: "Today",
    title: "Guided Seekers worldwide",
    text: "Learners around the world now study the Quran with us online, at their own pace — we proudly call them our Guided Seekers.",
    stats: ["Students", "Countries"],
  },
] as const;

export const visit = {
  eyebrow: "Visit us",
  title: "Want to hear more *about us?*",
  description:
    "Drop by to say Salaam and get the answers you seek in a welcoming space. Clear your doubts, gain clarity, and start your journey toward deeper faith today!",
  days: ["Saturday", "Sunday"],
} as const;
