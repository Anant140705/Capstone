import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, Sparkles, User } from "lucide-react";
import { PageHeader } from "@/components/travel/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { itinerary } from "@/data/trips";

export const Route = createFileRoute("/app/assistant")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "AI Assistant · AI Trip Buddy" },
      {
        name: "description",
        content:
          "Chat with your travel assistant to cut budgets, swap destinations and regenerate days — the itinerary updates beside the chat.",
      },
      { property: "og:title", content: "AI Assistant · AI Trip Buddy" },
      {
        property: "og:description",
        content: "Conversationally reshape your India itinerary with an AI travel assistant.",
      },
    ],
  }),
  component: Assistant,
});

type Message = { id: number; role: "user" | "ai"; text: string };

const prompts = [
  "Reduce budget by 20%",
  "Replace Udaipur with Jodhpur",
  "Add Goa for 3 days",
  "Find hidden gems nearby",
  "Regenerate Day 2",
];

const replies: Record<string, string> = {
  default:
    "Done. I re-ran the route optimiser and kept your evening slots intact — the timeline on the right reflects the change.",
};

function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "Your Rajasthan loop is ready. I can trim costs, swap cities or rebuild any single day — just say the word.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "ai", text: replies["default"] as string },
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Assistant"
        description="Ask for changes in plain language. Edits apply to the live itinerary."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="surface flex h-[calc(100dvh-220px)] min-h-[520px] flex-col">
          <ScrollArea className="flex-1 p-5">
            <ul className="space-y-4">
              {messages.map((m) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={m.role === "user" ? "flex justify-end" : "flex gap-3"}
                >
                  {m.role === "ai" && (
                    <span className="gradient-primary grid h-8 w-8 shrink-0 place-items-center rounded-xl text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </span>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                        : "max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm"
                    }
                  >
                    {m.text}
                  </div>
                  {m.role === "user" && (
                    <span className="ml-3 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-muted">
                      <User className="h-4 w-4" />
                    </span>
                  )}
                </motion.li>
              ))}
              <AnimatePresence>
                {typing && (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <span className="gradient-primary grid h-8 w-8 place-items-center rounded-xl text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.18 }}
                        />
                      ))}
                    </span>
                  </motion.li>
                )}
              </AnimatePresence>
            </ul>
            <div ref={endRef} />
          </ScrollArea>

          <div className="space-y-3 border-t border-border p-4">
            <ul className="flex flex-wrap gap-2">
              {prompts.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your trip…"
                aria-label="Message the AI assistant"
              />
              <Button type="submit" size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

        <aside className="surface space-y-3 p-5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Itinerary preview</h2>
            <Badge variant="secondary">Live</Badge>
          </div>
          <ol className="space-y-3">
            {itinerary.map((d) => (
              <li key={d.day} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    Day {d.day} · {d.city}
                  </span>
                  <span className="text-muted-foreground">₹{d.cost.toLocaleString("en-IN")}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {d.slots.map((s) => s.title).join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
