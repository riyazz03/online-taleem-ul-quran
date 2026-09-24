import { CalendarClock, Mic, MonitorSmartphone, NotebookPen } from "lucide-react";
import { VirtualClassroom } from "@/components/art/VirtualClassroom";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
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
    <section className="relative overflow-hidden section-y">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal y={50} className="order-2 mx-auto w-full min-w-0 max-w-xl lg:order-1 lg:max-w-none">
          <div className="relative isolate">
            <div aria-hidden className="absolute inset-x-[6%] -bottom-6 top-[12%] -z-10 rounded-full bg-brand-300/35 blur-3xl" />
            <div aria-hidden className="absolute -left-10 -top-8 -z-10 size-48 rounded-full bg-gold-100 blur-3xl" />
            <VirtualClassroom />
          </div>
        </Reveal>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Inside a class"
            title="A real teacher, *live*, in every lesson"
            description="No recorded courses to watch alone. Every class is a live session with a qualified tutor — one-to-one or in a small batch — who knows your level and your goals."
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
