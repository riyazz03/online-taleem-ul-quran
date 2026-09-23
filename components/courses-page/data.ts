/**
 * Copy for the Our Courses page. Every fact is taken from the original
 * course pages (app/course-details/*) and the unused "Don't enroll" section
 * of the original site — nothing here is new information.
 */
import type { CourseSlug } from "@/lib/content";

export type CourseComparison = {
  slug: CourseSlug;
  /** Short name for the mobile course switcher. */
  short: string;
  bestFor: string;
  goal: string;
  method: string;
  topics: string[];
};

export const comparison: CourseComparison[] = [
  {
    slug: "simplified-tajweed",
    short: "Tajweed",
    bestFor:
      "Complete beginners who have never recited the Qur'an or studied Tajweed — and anyone who knows the basics but wants to go deeper.",
    goal:
      "Pronounce every letter correctly — essential in Salah, Dhikr and recitation, where a mispronunciation can alter the meaning.",
    method:
      "Practical Tajweed principles first, then recitation practice: your teacher recites and you repeat after. Bespoke, self-paced and taught over three levels.",
    topics: [
      "Makharij (articulation points)",
      "Sifaat of the letters",
      "Rules of Tajweed",
      "Waqf & stopping signs",
      "Reading with Tarteel",
    ],
  },
  {
    slug: "quran-recitation",
    short: "Recitation",
    bestFor:
      "Beginners taking their first steps, and students who want to refine the recitation they already have.",
    goal:
      "Recite the Holy Qur'an with clarity, confidence and beautiful Tajweed — articulating the words of Allah (SWT) correctly and melodiously.",
    method:
      "Focused on the practical application of Tajweed rules, with interactive teaching methods and materials that keep every lesson engaging.",
    topics: [
      "The Arabic alphabet",
      "Grammar & vocabulary",
      "Pronunciation & intonation",
      "Tajweed in practice",
    ],
  },
  {
    slug: "quran-memorization",
    short: "Memorization",
    bestFor:
      "Anyone yearning for a deeper connection with Allah (SWT) and a closer understanding of His divine word.",
    goal:
      "Memorize the Holy Qur'an step by step — enriching your spiritual life, strengthening your faith and reaping its rewards in this life and the Hereafter.",
    method:
      "A traditional approach preserved through generations: each class pairs a new lesson with revision of recent and earlier lessons, plus your teacher's tips and tricks.",
    topics: [
      "Sabaq — the new lesson",
      "Sabaq Para — recent revision",
      "Purana Sabaq — earlier juz",
      "At least half a juz revised each class",
    ],
  },
];

/** Facts that the three original course pages share. */
export const sharedFeatures = [
  {
    icon: "baby",
    title: "From 4 years old",
    text: "Age knows no bounds — we welcome learners from as young as four.",
  },
  {
    icon: "users",
    title: "One-to-one & batch-wise",
    text: "Exclusive sessions for uncompromised development.",
  },
  {
    icon: "heart",
    title: "Male & female teachers",
    text: "Male teachers for male students and female teachers for female students.",
  },
  {
    icon: "cap",
    title: "Al-Burhan Qaida first",
    text: "Students should complete the Mastery Phase of our Al-Burhan Qaida.",
  },
  {
    icon: "book",
    title: "Beyond recitation",
    text: "Basics of Aqeeda, Seerat, Fiqh & Surahs are part of the journey.",
  },
  {
    icon: "award",
    title: "Completion certificate",
    text: "We provide a Quran completion certificate.",
  },
] as const;

/** The original "Don't enroll with us" points, re-framed positively. */
export const fitPoints = [
  {
    title: "You value *proper recitation* over speed",
    text: "We focus on reciting the Quran with correct Tajweed, ensuring proper pronunciation, reflection, and understanding of its meanings.",
  },
  {
    title: "You're open to *modern teaching methods*",
    text: "Our approach blends traditional Islamic teachings with effective modern learning techniques to enhance comprehension and retention.",
  },
  {
    title: "You can dedicate *consistent practice time*",
    text: "Regular practice is essential for mastering Quranic recitation. If you or your child can commit to consistent learning, our program is the right fit.",
  },
  {
    title: "You're ready for a *long-term learning journey*",
    text: "Quranic learning is a continuous process that requires dedication and patience. We emphasize building a strong foundation for lifelong understanding and recitation.",
  },
] as const;
