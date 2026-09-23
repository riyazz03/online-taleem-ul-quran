/**
 * Shared marketing content. Copy is carried over from the original site.
 */

export type CourseSlug = "simplified-tajweed" | "quran-recitation" | "quran-memorization";

export type CourseSummary = {
  slug: CourseSlug;
  title: string;
  arabic: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

export const courses: CourseSummary[] = [
  {
    slug: "simplified-tajweed",
    title: "Simplified Tajweed",
    arabic: "تجويد",
    description:
      "Master the art of Tajweed with expert guidance — live, personalised and at your pace.",
    image: "/img/courses/simplified-tajweed.webp",
    imageAlt: "An open Quran resting inside a softly lit circle",
    tags: ["Beginners welcome", "3 levels"],
  },
  {
    slug: "quran-recitation",
    title: "Quran Recitation",
    arabic: "تلاوة",
    description:
      "Unlock the beauty of the Quran — master recitation and comprehension with expert guidance.",
    image: "/img/courses/quran-recitation.webp",
    imageAlt: "A student reciting the Quran from a wooden stand beneath an arch",
    tags: ["All ages", "One-to-one"],
  },
  {
    slug: "quran-memorization",
    title: "Quran Memorization",
    arabic: "حفظ",
    description:
      "Memorize the Quran with expert guidance — step by step, rooted in tradition, rewarded for eternity.",
    image: "/img/courses/quran-memorization.webp",
    imageAlt: "A student seated on the floor, memorizing the Quran",
    tags: ["Hifz", "Sabaq method"],
  },
];

export const benefits = [
  {
    title: "Personalized one-to-one class",
    description:
      "Get individual attention with tailored lessons designed to match your learning pace and goals.",
    icon: "users",
  },
  {
    title: "Pay for what you learn",
    description:
      "A flexible payment model — only pay for the lessons you take, ensuring affordability and value.",
    icon: "wallet",
  },
  {
    title: "Flexible timings",
    description:
      "Schedule your sessions at your convenience and track your learning progress effectively.",
    icon: "clock",
  },
  {
    title: "Monthly exam",
    description:
      "Reinforce your learning with focused, monthly exams tailored to your progress.",
    icon: "award",
  },
] as const;

export const steps = [
  { title: "Schedule a demo with our founder", icon: "calendar" },
  { title: "Assessment of your child", icon: "clipboard" },
  { title: "Fill up the application form", icon: "form" },
  { title: "Get your teacher assigned", icon: "teacher" },
  { title: "Commencement of first class", icon: "sparkles" },
] as const;

export const stats = [
  { value: 300, suffix: "+", label: "Students" },
  { value: 150, suffix: "+", label: "Graduated" },
  { value: 500, suffix: "+", label: "Classes taken" },
  { value: 100, suffix: "+", label: "Demo classes" },
  { value: 15, suffix: "+", label: "Instructors" },
  { value: 10, suffix: "+", label: "Countries" },
  { value: 4, suffix: "+", label: "Years" },
] as const;

export const trialFeatures = [
  "Expert & certified tutors",
  "Affordable & flexible plans",
  "Male & female tutors",
  "Islamic studies & duas",
  "One-to-one classes",
] as const;

export const audiences = [
  {
    title: "Children",
    description:
      "Learners from as young as 4 years old build strong Quran reading and pronunciation skills.",
    icon: "baby",
  },
  {
    title: "Sisters",
    description:
      "Female teachers for female students, in a safe and comfortable learning environment.",
    icon: "heart",
  },
  {
    title: "Adults & beginners",
    description:
      "It is never too late. Start from the Arabic letters and learn at your own pace — no prior knowledge needed.",
    icon: "sprout",
  },
  {
    title: "Non-Arabic speakers",
    description:
      "Clear, patient guidance for students around the world who are new to the Arabic language.",
    icon: "globe",
  },
] as const;

export type Testimonial = { name: string; country: string; review: string };

export const testimonials: Testimonial[] = [
  {
    name: "Yasmeen",
    country: "America",
    review:
      "This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!",
  },
  {
    name: "Hafsa",
    country: "America",
    review:
      "Corrects every mistake, improves Tajweed and Qirah. Excellent teaching — I highly recommend the classes.",
  },
  {
    name: "Jibreel",
    country: "America",
    review:
      "Patient, attentive teaching with consistent correction. Huge improvement in Tajweed and Qirah over two years.",
  },
  {
    name: "Tajamul Hussai",
    country: "America",
    review:
      "Highly structured, supportive learning. Precise feedback and a motivating environment helped me improve significantly.",
  },
  {
    name: "Fahad Abdullah",
    country: "Saudi Arabia",
    review:
      "My son is learning Tajweed with proper names and great interest — Alhamdulillah, very satisfied with the academy.",
  },
  {
    name: "Mutahar",
    country: "Canada",
    review:
      "Teaching made a big impact — recitation improved and connection to the Quran strengthened. Truly appreciated and effective.",
  },
  {
    name: "Mariam",
    country: "America",
    review:
      "Extremely satisfied! Noticeable improvement in recitation, especially rulings. Grateful for such dedicated teaching.",
  },
  {
    name: "Fazal",
    country: "America",
    review:
      "Well-organized classes, kind teachers, and great progress in Hifz. Highly recommended for online Quran learning.",
  },
];

export const faqs = [
  {
    question: "How do online Quran classes work?",
    answer:
      "Our online Quran classes are conducted via live video sessions with expert instructors. You can join from anywhere using a computer, tablet, or smartphone.",
  },
  {
    question: "What age group do you teach?",
    answer:
      "We offer classes for all age groups, from young children to adults. Our curriculum is tailored to suit beginners as well as advanced learners.",
  },
  {
    question: "Do I need any prior knowledge of Arabic to join?",
    answer:
      "No, you don't need any prior knowledge. We offer beginner-friendly classes that start with basic Arabic letters and pronunciation.",
  },
  {
    question: "What if I miss a class?",
    answer:
      "If you miss a class, you can reschedule based on availability. We also offer recorded sessions in some cases for review.",
  },
  {
    question: "How can I book a free demo class?",
    answer:
      "You can book a free demo by clicking the 'Book a free demo' button on our website and filling out the registration form.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, PayPal, and bank transfers, depending on your location.",
  },
  {
    question: "How does online Quran memorization work?",
    answer:
      "Every session is divided into three parts. First, a new lesson: you practise it with your teacher and memorize it by repeating after them many times. Second, the previous lessons of the same juz: you recite and your teacher listens. Third, you recite any juz you have already memorized with your teacher.",
  },
  {
    question: "How do you assign teachers to students?",
    answer:
      "We ensure a comfortable and appropriate learning environment by providing male teachers for male students and female teachers for female students — whether you're attending online or offline classes.",
  },
] as const;
