"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  question: string;
  answer: string;
}

// Un solo elemento abierto a la vez (punto 21 del plan).
export function Accordion({
  items,
  onOpen,
}: {
  items: AccordionItem[];
  onOpen?: (question: string) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-brand-border border-y border-brand-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => {
                const next = isOpen ? null : i;
                setOpenIndex(next);
                if (next !== null) onOpen?.(item.question);
              }}
            >
              <span className="text-base font-semibold text-brand-ink">{item.question}</span>
              <span
                className={cn(
                  "shrink-0 text-xl text-brand-purple transition-transform duration-200 ease-out",
                  isOpen && "rotate-45",
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-base leading-relaxed text-brand-gray">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
