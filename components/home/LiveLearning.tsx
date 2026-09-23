import Image from "next/image";
import { CalendarClock, Mic, MonitorSmartphone, NotebookPen } from "lucide-react";
import { LiveClassCard } from "@/components/art/LiveClassCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { Parallax } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const points = [
  {
    icon: MonitorSmartphone,
    title: "Live video lessons",
    text: "Join from a computer, tablet or smartphone — from home, wherever you are in the world.",
  },
  {
    icon: Mic,
    title: "Corrected as you recite",
    text: "Your teacher listens closely and corrects every mistake, letter by letter, until it feels natural.",
  },
  {
    icon: NotebookPen,
    title: "Monthly exams",
    text: "Short, focused exams every month keep your progress measurable and on track.",
  },
  {
    icon: CalendarClock,
    title: "Reschedule when life happens",
    text: "Missed a class? Reschedule based on availability — with recordings for review in some cases.",
  },
];

/** "Inside a live class" — what learning online with us actually looks like. */
export function LiveLearning() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal y={50} className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem] shadow-lift">
            <Parallax offset={24} className="absolute -inset-y-8 inset-x-0">
              <Image
                src="/img/photos/boy-laptop.webp"
                alt="A student attending a live online Quran lesson on his laptop"
                fill
                sizes="(min-width: 1024px) 40rem, 92vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-10 right-3 w-[62%] max-w-[17rem] sm:-right-6 sm:w-[48%]">
            <div className="animate-float-slow">
              <LiveClassCard />
            </div>
          </div>
        </Reveal>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Inside a class"
            title="A real teacher, *live*, in every lesson"
            description="No recorded courses to watch alone. Every class is a live, personal session with a qualified tutor who knows your name, your level and your goals."
          />
          <Stagger as="ul" className="grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {points.map(({ icon: Icon, title, text }) => (
              <StaggerItem as="li" key={title} className="flex flex-col gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-brand-950">{title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <ButtonLink href="/contact-us">Try a free live class</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
