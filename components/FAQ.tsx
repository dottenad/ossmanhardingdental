"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQ as FAQType } from "@/lib/config";

interface FAQProps {
    faqs: FAQType[];
}

export function FAQ({ faqs }: FAQProps) {
    const [openIndices, setOpenIndices] = useState<Set<number>>(new Set()); // All panels closed by default

    const toggleFAQ = (index: number) => {
        setOpenIndices((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <div
            className="w-full"
            role="region"
            aria-label="Frequently asked questions"
        >
            {faqs.map((faq, index) => {
                const isOpen = openIndices.has(index);
                const isFirstItem = index === 0;
                const previousItemOpen =
                    index > 0 && openIndices.has(index - 1);
                const shouldHaveRoundedTop = isFirstItem || !previousItemOpen;

                // All panels get bottom border (except last)
                // However, if a panel is closed and the next panel is open, don't add bottom border to avoid double border
                // Open panels get top border only if previous panel is closed (to avoid double border)
                // First panel never gets top border, last panel never gets bottom border
                const isLastItem = index === faqs.length - 1;
                const nextItemOpen =
                    index < faqs.length - 1 && openIndices.has(index + 1);
                const shouldHaveBottomBorder =
                    !isLastItem &&
                    !(isOpen && isLastItem) &&
                    !(!isOpen && nextItemOpen);
                const shouldHaveTopBorder =
                    isOpen && !isFirstItem && index > 0 && !previousItemOpen;

                return (
                    <div
                        key={index}
                        className={`${
                            shouldHaveBottomBorder
                                ? "border-b border-gray-200"
                                : ""
                        } ${
                            shouldHaveTopBorder
                                ? "border-t border-gray-200"
                                : ""
                        }`}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    toggleFAQ(index);
                                }
                            }}
                            className={`w-full py-5 px-4 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none focus:ring-0 border-0 ${
                                shouldHaveRoundedTop && !isOpen
                                    ? "rounded-t-lg"
                                    : ""
                            }`}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${index}`}
                            aria-label={`${
                                isOpen ? "Close" : "Open"
                            } question: ${faq.question}`}
                        >
                            <span
                                id={`faq-question-${index}`}
                                className="text-lg font-semibold text-gray-900 pr-4"
                            >
                                {faq.question}
                            </span>
                            <div className="flex-shrink-0">
                                {isOpen ? (
                                    <Minus className="w-6 h-6 text-primary-600 transition-transform" />
                                ) : (
                                    <Plus className="w-6 h-6 text-gray-500 transition-transform" />
                                )}
                            </div>
                        </button>
                        <div
                            id={`faq-answer-${index}`}
                            role="region"
                            aria-labelledby={`faq-question-${index}`}
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                            hidden={!isOpen}
                        >
                            <div className="px-4 pb-5 text-gray-700 leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
