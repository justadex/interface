import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSData from "./data/faqs.json";

export default function FAQS() {
  return (
    <section className="py-12" id="socials">
      <div className="flex flex-col gap-12 justify-start py-12 xl:py-24 items-center w-full">
        <h3 className="text-center shadow-md text-2xl xl:text-3xl font-medium border-b-2 border-accent">
          FAQ{"'"}s
        </h3>
        <Accordion className="flex flex-col gap-4 w-full" type="single">
          {FAQSData.map((faq, f) => {
            return (
              <AccordionItem
                className="border-2 px-6 py-2 rounded border-offwhite/10"
                key={f}
                value={f.toString()}
              >
                <AccordionTrigger className="hover:no-underline text-lg font-bold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
