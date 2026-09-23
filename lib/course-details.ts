/**
 * Content for the three course detail pages (/course-details/[slug]).
 *
 * English copy is carried over from the original pages and lightly
 * copy-edited. Every Arabic / Urdu string and the hadith translations live in
 * `course-arabic.json`, which was extracted programmatically from the original
 * source files — never retype them here.
 */
import { courses, type CourseSlug, type CourseSummary } from "@/lib/content";
import arabicJson from "@/lib/course-arabic.json";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type HadithSegment = {
  /** isnad = chain of narration, matn = the saying, note = connector, source = collection. */
  kind: "isnad" | "matn" | "note" | "source";
  lang: "ar" | "ur";
  text: string;
};

export type Hadith = {
  arabic: HadithSegment[];
  english: { narrator: string | null; lines: string[] };
  urdu: string[];
  /** Reference as shown under the translation. */
  reference: string;
};

export type Story = {
  /** Heading with *emphasis* markers. */
  title: string;
  dialogue: { speaker: string | null; quote: string }[];
  citation: string;
  reflection: string;
};

type ArabicJson = Record<
  CourseSlug,
  {
    arabic: HadithSegment[];
    english: { narrator: string | null; lines: string[] };
    urdu: string[];
    source: string;
  }
> & {
  ibnMasud: {
    title: string;
    dialogue: { speaker: string | null; quote: string }[];
    citation: string;
    reflection: string;
  };
};

const arabic = arabicJson as ArabicJson;

export type EssentialIcon = "age" | "qaida" | "certificate" | "sessions";

export type Essential = {
  icon: EssentialIcon;
  label: string;
  /** Short display value shown large on the card. */
  headline: string;
  /** Card copy; wrap the key phrase in *asterisks*. */
  text: string;
};

export type TajweedCurriculum = {
  kind: "tajweed";
  outlineIntro: string;
  topics: string[];
  overview: { lead: string; paragraphs: string[]; levelsIntro: string };
  levels: { title: string; description: string }[];
  sisters: { title: string; text: string };
  learn: { title: string; items: string[] };
};

export type RecitationCurriculum = {
  kind: "recitation";
  title: string;
  lead: string;
  points: { title: string; text: string }[];
};

export type MemorizationCurriculum = {
  kind: "memorization";
  title: string;
  description: string;
  steps: { name: string; meaning: string; paragraphs: string[] }[];
};

export type Curriculum = TajweedCurriculum | RecitationCurriculum | MemorizationCurriculum;

export type CourseDetail = {
  slug: CourseSlug;
  summary: CourseSummary;
  /** Hero title, with *emphasis*. */
  heroTitle: string;
  /** Intro paragraph, split for typographic hierarchy (lede + body = full intro). */
  lede: string;
  body: string;
  meta: { title: string; description: string; keywords: string[] };
  essentials: Essential[];
  curriculum: Curriculum;
  hadith: Hadith;
  story?: Story;
  enrich: {
    title: string;
    description: string;
    cards: { title: string; description: string }[];
  };
};

/* ------------------------------------------------------------------ */
/* Shared copy                                                          */
/* ------------------------------------------------------------------ */

/** The four "Say goodbye to stumbles" cards. Only the certificate line differs per page. */
function essentials(accreditedBy: string): Essential[] {
  return [
    {
      icon: "age",
      label: "Who can join",
      headline: "Ages 4+",
      text: "Age knows no bounds in our diverse student community, welcoming learners from as young as *4 years old*",
    },
    {
      icon: "qaida",
      label: "Prerequisite",
      headline: "Al-Burhan Qaida",
      text: "Should complete the Mastery Phase of our *Al-Burhan Qaida*",
    },
    {
      icon: "certificate",
      label: "Certification",
      headline: "Certified",
      // Kept exactly as each original page states it.
      text: `We provide a *Quran completion certificate* accredited by ${accreditedBy}`,
    },
    {
      icon: "sessions",
      label: "Class format",
      headline: "1:1 & batch",
      text: "Exclusive *one-on-one and batch-wise sessions* for uncompromised development",
    },
  ];
}

function enrichCards(surahMemorization: string) {
  return [
    {
      title: "Aqeeda",
      description:
        "Explore the essence of Islamic beliefs and principles, unraveling the depths of faith and spirituality.",
    },
    {
      title: "Seerat",
      description:
        "Immerse yourself in the extraordinary life of Prophet Muhammad (PBUH), discovering his teachings and exemplary character.",
    },
    {
      title: "Fiqh",
      description:
        "Gain a comprehensive understanding of Islamic jurisprudence and its practical applications in daily life.",
    },
    { title: "Surah Memorization", description: surahMemorization },
  ];
}

const enrichTitle = "Enrich your recitation journey with basics of *Aqeeda, Seerat, Fiqh & Surahs*";
const enrichDescription =
  "Our course goes beyond recitation, offering a treasure trove of knowledge and empowering you with a deeper understanding of Islam’s core principles.";

function hadith(slug: CourseSlug, reference: string): Hadith {
  const h = arabic[slug];
  return { arabic: h.arabic, english: h.english, urdu: h.urdu, reference };
}

const summary = (slug: CourseSlug) => courses.find((c) => c.slug === slug)!;

/* ------------------------------------------------------------------ */
/* Courses                                                              */
/* ------------------------------------------------------------------ */

const tajweed: CourseDetail = {
  slug: "simplified-tajweed",
  summary: summary("simplified-tajweed"),
  heroTitle: "Simplified Tajweed *Online*",
  lede: "Reading the Qur’an with Tajweed is an obligatory act (fardh) for every Muslim, as it ensures correct pronunciation — especially crucial during Salah, Dhikr and Qur’anic recitation.",
  body: "Mispronunciation can alter the intended meanings. This course begins with practical Tajweed principles and then progresses to recitation practice. It is ideal for complete beginners who have never recited the Qur’an or studied Tajweed before. Begin your online Tajweed journey from the basics, insha’Allah.",
  meta: {
    title: "Simplified Tajweed Course Online",
    description:
      "Learn Tajweed online from the very basics — correct pronunciation, Makharij and the rules of recitation across three levels, with male and female tutors.",
    keywords: [
      "learn tajweed online",
      "learn Quran with tajweed online",
      "tajweed for kids",
      "learn tajweed rules for kids",
      "tajweed classes for adults",
      "tajweed classes for sisters",
      "tajweed for beginners",
      "tajweed classes online",
      "Arabic online tajweed classes",
      "simplified tajweed course",
    ],
  },
  essentials: essentials("Quran Online India"),
  curriculum: {
    kind: "tajweed",
    outlineIntro:
      "The course focuses on the application of Tajweed rules when reciting the Quran, including but not limited to the following topics:",
    topics: [
      "Etiquettes of Reciting Quran",
      "Introduction to Tajweed",
      "Levels of Errors in Pronunciation",
      "The Arabic Alphabet",
      "Ta’awwuz and Tasmiyah",
      "Joining Letters",
      "Diacritical Accents (Short Vowels)",
      "Stops (Sukun)",
      "Nunation (Tanween)",
      "Long Vowels",
      "Soft Vowels / Diphthongs (Leen)",
      "Doubled Letters (Shadd)",
      "Hamzah and Alif",
      "Rules of the Enabling Hamzah (Hamzat al-Wasl)",
      "Points of Articulation (Makhaarij)",
      "Intensification (Qalqalah)",
      "Rules of Waqf and Continuation",
      "Stopping Signs",
    ],
    overview: {
      lead: "The Tajweed course is dedicated to learning the *theoretical concepts of Tajweed,* including the *practical application of Tajweed rules* when reciting the Quran.",
      paragraphs: [
        "It is a bespoke, self-paced and one-on-one interactive course to meet your needs. The course is taught by both male and female Islamic scholars (including Hafiz, Mujawwid and Qari) who have vast experience in online teaching.",
        "By registering for our online Tajweed classes, you can learn how to read the Holy Quran with Tajweed. There are three levels available:",
      ],
      levelsIntro: "Three levels, one *steady climb*",
    },
    levels: [
      {
        title: "Pronunciation & the basics",
        description:
          "The first level is for students who want to learn how to recite the Holy Quran. They learn to pronounce the letters correctly, along with other basic attributes of the letters, i.e. nasal sounds, idgham, qalb, maddahs and the types of madd.",
      },
      {
        title: "Applying the rules",
        description:
          "The second level improves your recitation by applying the Tajweed rules you learned in the first level: the characteristics that differentiate the letters, and avoiding (sinful) mistakes such as making a long sound where a short vowel sound is required.",
      },
      {
        title: "Waqf & Tarteel",
        description:
          "The final level covers the rules of Waqf (stopping at the end of a verse or in the middle). You will also revise what you learned in the first and second levels and apply it while reciting the Quran, learn some exceptions to the rules, and read the Holy Quran with Tarteel (at a very slow, measured pace).",
      },
    ],
    sisters: {
      title: "Female Quran teachers *for sisters*",
      text: "In this course we cover all aspects of Tajweed. You can join if you’re a beginner, or if you know some Tajweed basics and want to deepen your knowledge. This course is specially designed for sisters and taught online by female Tajweed tutors.",
    },
    learn: {
      title: "What do you *learn?*",
      items: [
        "Makharij of Huruf — the articulation points of the letters",
        "Knowledge of Sifaat",
        "The knowledge and rules of Tajweed",
        "Practising Tajweed (implementation)",
        "Practising with the teacher — she recites and the student repeats after her",
        "A brief explanation of Surahs (optional)",
        "Memorization of short Surahs with Tajweed (recommended)",
        "Study material, handouts and more",
      ],
    },
  },
  hadith: hadith("simplified-tajweed", "Shu‘ab al-Iman"),
  enrich: {
    title: enrichTitle,
    description: enrichDescription,
    cards: enrichCards(
      "We help you memorize 10 surahs from the 15th Juz, a significant milestone in Quran recitation.",
    ),
  },
};

const recitation: CourseDetail = {
  slug: "quran-recitation",
  summary: summary("quran-recitation"),
  heroTitle: "Quran Recitation *Online*",
  lede: "Do you aspire to recite the Holy Qur’an with clarity, confidence and beautiful Tajweed? Our comprehensive online Quran recitation course is designed to help you achieve just that.",
  body: "Whether you are a beginner taking your first steps or looking to refine your existing recitation skills, our expert instructors will guide you on a journey to articulate the words of Allah (SWT) correctly and melodiously. This course focuses on the practical application of Tajweed rules, ensuring you can recite with precision and reverence.",
  meta: {
    title: "Quran Recitation Course Online",
    description:
      "Recite the Holy Qur’an with clarity, confidence and beautiful Tajweed. Online Quran recitation classes for beginners and improvers, guided by expert instructors.",
    keywords: [
      "Quran recitation course online",
      "learn Quran recitation online",
      "online Quran reading classes",
      "learn Quranic Arabic online",
      "Quran recitation with tajweed",
      "Quran recitation for beginners",
      "Quran classes for kids and adults",
    ],
  },
  essentials: essentials("Online Taleemul Quran"),
  curriculum: {
    kind: "recitation",
    title: "Learn Quranic Arabic and connect with the Quran on a *deeper level*",
    lead: "The Quran is a book of divine guidance that Muslims believe was revealed to the Prophet Muhammad (peace be upon him) in Arabic. Therefore, learning *Quranic Arabic* is essential for understanding the Quran in its original language and *connecting with its message* on a deeper level.",
    points: [
      {
        title: "How we teach",
        text: "Our Quranic Arabic course is designed to help students of all levels learn the Arabic alphabet, grammar and vocabulary, as well as how to read and recite the Quran with proper pronunciation and intonation. Our experienced teachers use a variety of interactive teaching methods and materials to make learning Arabic fun and engaging.",
      },
      {
        title: "What you gain",
        text: "By learning the Quran online, you will gain a deeper appreciation and understanding of the Quran’s message and themes. You will also be able to recite and understand the Quran with more confidence and clarity, allowing you to connect with its divine guidance on a personal and spiritual level.",
      },
    ],
  },
  hadith: hadith("quran-recitation", "Agreed upon (al-Bukhari & Muslim) · wording of Muslim"),
  story: {
    // "The Prophet (s) once said to ibn Mas’ud," -> "The Prophet (s) once said to *Ibn Mas’ud*"
    title: arabic.ibnMasud.title
      .replace(/,\s*$/, "")
      .replace(/\bibn (\S+)$/, "*Ibn $1*"),
    dialogue: arabic.ibnMasud.dialogue,
    citation: arabic.ibnMasud.citation,
    // Original: "…has an impact on even our Prophet (s) heart … the most softest of hearts…"
    reflection:
      "The hadith above shows that the Qur’an has an impact even on the heart of our Prophet (s). Being the best of mankind, the Prophet (s) possessed the softest of hearts — so much so that these verses brought him to tears.",
  },
  enrich: {
    title: enrichTitle,
    description: enrichDescription,
    cards: enrichCards("We help you memorize 30 juz — a significant milestone in Quran recitation."),
  },
};

const memorization: CourseDetail = {
  slug: "quran-memorization",
  summary: summary("quran-memorization"),
  heroTitle: "Quran Memorization *Online*",
  lede: "Are you yearning for a deeper connection with Allah (SWT) and a closer understanding of His divine word?",
  body: "Our Quran memorization course offers a transformative journey, guiding you step by step towards memorizing the sacred verses of the Holy Qur’an. This isn’t just about committing words to memory — it’s about enriching your spiritual life, strengthening your faith, and reaping countless rewards in this life and the Hereafter.",
  meta: {
    title: "Quran Memorization Course Online",
    description:
      "Memorize the Holy Qur’an online, step by step, with the time-tested Sabaq, Sabaq Para and Purana Sabaq method — guided by expert teachers.",
    keywords: [
      "Quran memorization course online",
      "online Hifz classes",
      "Hifz program online",
      "memorize Quran online",
      "Quran memorization for kids",
      "Sabaq Sabaq Para Purana Sabaq",
    ],
  },
  essentials: essentials("Quran Online India"),
  curriculum: {
    kind: "memorization",
    title: "Our approach has stood *the test of time*",
    description: "Preserved through generations, rooted in tradition.",
    steps: [
      {
        name: "Sabaq",
        meaning: "New lesson",
        paragraphs: [
          "Sabaq means the new lesson. The teacher listens to the student recite the verses of the Holy Quran and practises them with the correct pronunciation and accent first; the student then memorizes them by repeating them many times.",
          "The instructor will help you with tips and tricks to memorize lessons during and after the class as well. The student has to fully memorize this lesson before the next class.",
        ],
      },
      {
        name: "Sabaq Para",
        meaning: "Revision",
        paragraphs: [
          "Sabaq Para means revision of the previous lessons of the same juz that the student has memorized in recent classes. The student recites and the teacher listens.",
          "Each student recites the Sabaq Para lessons in every class after the new lesson, so that he or she memorizes the last lessons very well.",
        ],
      },
      {
        name: "Purana Sabaq",
        meaning: "Old lesson",
        paragraphs: [
          "Purana Sabaq means the revision of any juz the student has already memorized. In each class, the student recites at least half a juz and the teacher listens.",
          "It gives the student and teacher a kind of satisfaction and assurance that the student is memorizing more and more without forgetting the previous lessons.",
        ],
      },
    ],
  },
  hadith: hadith("quran-memorization", arabic["quran-memorization"].source),
  enrich: {
    title: enrichTitle,
    description: enrichDescription,
    cards: enrichCards("We help you memorize the entire Quran — a lifelong journey of faith and devotion."),
  },
};

export const courseDetails: Record<CourseSlug, CourseDetail> = {
  "simplified-tajweed": tajweed,
  "quran-recitation": recitation,
  "quran-memorization": memorization,
};

export const courseSlugs = Object.keys(courseDetails) as CourseSlug[];

export function getCourseDetail(slug: string): CourseDetail | undefined {
  return (courseDetails as Record<string, CourseDetail | undefined>)[slug];
}
