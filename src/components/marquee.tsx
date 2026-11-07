import { Sparkles } from "lucide-react";

/** Infinite bilingual ribbon. Direction is pinned to LTR so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="marquee-mask overflow-hidden border-y border-line bg-coal py-5"
      dir="ltr"
    >
      <div
        className="flex w-max animate-marquee items-center gap-10 pe-10"
        aria-hidden="true"
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap">
            <Sparkles className="size-4 shrink-0 text-gold" />
            <span className="font-display text-lg text-sand/90">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
