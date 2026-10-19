import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  Route as RouteIcon,
  Wallet,
  Gem,
  MessagesSquare,
  BedDouble,
  Star,
  ArrowRight,
  Sun,
  Moon,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import heroImage from "@/assets/udaipur-hero.jpg";
import { useTheme } from "@/hooks/use-theme";
import { IndiaMap } from "@/components/travel/IndiaMap";
import { Logo } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GoWander — Plan Your Perfect Journey Across India" },
      {
        name: "description",
        content:
          "Generate personalized itineraries, optimize travel routes, discover hidden gems and estimate budgets for trips across India with AI.",
      },
      { property: "og:title", content: "GoWander — AI travel planner for India" },
      {
        property: "og:description",
        content:
          "Personalized itineraries, optimized routes, hotel picks, budgets and hidden gems across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: RouteIcon,
    title: "Route optimisation",
    text: "The planner sequences cities by drive time, not by guesswork — fewer backtracks, more daylight.",
  },
  {
    icon: Sparkles,
    title: "AI itineraries",
    text: "Morning, afternoon and evening blocks with realistic travel buffers and opening hours.",
  },
  {
    icon: Wallet,
    title: "Budget estimates",
    text: "Per-day costs across stay, transport, food and tickets, with savings suggestions.",
  },
  {
    icon: Gem,
    title: "Hidden gems",
    text: "Anegundi over Hampi's main strip, Dawki over Shillong's queues. Places locals actually name.",
  },
  {
    icon: BedDouble,
    title: "Stay matching",
    text: "Hotels ranked by distance to your planned activities rather than by commission.",
  },
  {
    icon: MessagesSquare,
    title: "Conversational edits",
    text: "“Cut ₹10,000” or “swap Day 3 for Jodhpur” — the whole plan re-flows instantly.",
  },
];

const steps = [
  { n: "01", t: "Tell us the shape of the trip", d: "Cities, days, budget, travellers, interests." },
  { n: "02", t: "AI drafts and optimises", d: "Destinations, routes, hotels and costs in under a minute." },
  { n: "03", t: "Refine by conversation", d: "Adjust anything in plain language, then export or share." },
];

const testimonials = [
  {
    name: "Nikhil Menon",
    role: "Product designer, Bengaluru",
    text: "Planned a nine-day Spiti circuit in one sitting. The drive-time estimates were the first ones I've seen that matched reality.",
  },
  {
    name: "Sara Qureshi",
    role: "Doctor, Hyderabad",
    text: "I asked it to cut ₹15,000 from a Kerala trip and it rebuilt the stays without touching the parts I cared about.",
  },
  {
    name: "Devika Rao",
    role: "Founder, Pune",
    text: "The hidden gems section is the reason I keep coming back. Anegundi was the best day of our Hampi trip.",
  },
];

const faqs = [
  {
    q: "Does GoWander book hotels or tickets?",
    a: "No. We deliberately stay out of booking. The platform plans the trip — routes, days, stays, costs — and you book wherever you prefer.",
  },
  {
    q: "How accurate are the budget estimates?",
    a: "Estimates use seasonal averages per city and travel class. They land within about 10–15% for most domestic trips and update as you edit the plan.",
  },
  {
    q: "Can I edit a generated itinerary?",
    a: "Every day, slot and stay is editable, either directly in the timeline or by asking the AI assistant to change it.",
  },
  {
    q: "Does it cover the whole country?",
    a: "Yes — from Ladakh to the Andamans, including the Northeast, which most planners skip entirely.",
  },
];

function Landing() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#preview" className="text-muted-foreground hover:text-foreground">Product</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button className="h-9 w-9" variant="ghost" size="icon" onClick={toggle} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button asChild variant="ghost" size="sm" className="h-9"><Link to="/login">Log in</Link></Button>
            <Button asChild size="sm" className="h-9"><Link to="/signup">Get started <ArrowUpRight /></Link></Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[560px] overflow-hidden bg-photo-overlay text-photo-foreground sm:min-h-[620px]">
          <img src={heroImage} alt="Lake Pichola and Udaipur’s marble palaces in morning light" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-photo-overlay/50" />
          <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between gap-10 px-5 py-12 sm:min-h-[620px] sm:py-14 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto flex min-h-[390px] w-full max-w-2xl flex-col items-center space-y-6 text-center sm:min-h-[460px]">
              <p className="flex items-center gap-2 text-sm font-medium text-photo-muted"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> A little less planning. A lot more India.</p>
              <div className="space-y-3">
                <h1 className="font-mugle text-4xl font-normal leading-tight sm:text-6xl">GoWander</h1>
                <p className="text-2xl font-medium leading-snug sm:text-3xl">Your next great Indian journey.</p>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-photo-muted sm:text-base">From lakeside mornings to mountain detours. Find your places, shape your days, and bring it all together in one trip.</p>
              <div className="mt-auto flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild size="lg" className="h-12"><Link to="/app/planner">Plan my trip <ArrowRight /></Link></Button>
                <Button asChild variant="outline" size="lg" className="h-12 border-photo-foreground/40 bg-photo-foreground/10 text-photo-foreground backdrop-blur-sm hover:bg-photo-foreground/20 hover:text-photo-foreground"><Link to="/app/explore">Explore India <ArrowUpRight /></Link></Button>
              </div>
            </motion.div>
            <div className="flex flex-wrap items-end justify-between gap-5 border-t border-photo-foreground/25 pt-5">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-photo-muted sm:text-sm">
                <span className="flex items-center gap-2"><RouteIcon className="h-4 w-4" /> Your route</span>
                <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Your budget</span>
                <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Your kind of trip</span>
              </div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /><span>Udaipur, Rajasthan</span></div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Every detail. One beautiful journey.
            </h2>
            <p className="mt-3 text-muted-foreground">
              A thoughtful route, the right stays, and room for the unexpected.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                className="group border-t border-border py-6 pr-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y border-border bg-card/60">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="space-y-2"
                >
                  <span className="text-sm font-semibold text-primary">{s.n}</span>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section id="preview" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Inside the product</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { title: "Explore", body: "Map plus filters", to: "/app/explore" as const },
              { title: "Itinerary", body: "Day-by-day timeline", to: "/app/itinerary" as const },
              { title: "Budget", body: "Spend analytics", to: "/app/budget" as const },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="surface hover-lift overflow-hidden"
              >
                <div className="aurora h-44 border-b border-border p-4">
                  <div className="h-full w-full">
                    <IndiaMap showRoutes={i !== 2} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="truncate text-sm text-muted-foreground">{s.body}</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={s.to}>Open</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-border bg-card/60">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Stories from the road
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.figure
                  key={t.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="surface space-y-4 p-6"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber text-amber" />
                    ))}
                  </div>
                  <blockquote className="text-sm">{t.text}</blockquote>
                  <figcaption className="text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary-soft">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-16 text-center">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Where will India take you next?
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Start with a city and a number of days. The AI does the rest.
            </p>
            <Button asChild size="lg">
              <Link to="/app/planner">
                Plan my trip <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Logo />
          <p>© 2026 GoWander. Planning, not booking.</p>
        </div>
      </footer>
    </div>
  );
}
