import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What's the approval criteria to be a mentor?",
    answer: (
      <>
        <p className="mb-3">
          At ADPList, we vet through every single mentor application and that
          can take up to 2 weeks sometimes. We have an approval rate of ~30%,
          yes — we ensure quality and passionate mentors in the community.
        </p>
        <p className="mb-2">Our criteria for approval are:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Relevant experience in the industry (5+ years)</li>
          <li>
            Past experience in a role involving mentoring / leading junior to
            mid-level professionals
          </li>
          <li>Passionate about mentoring and knowledge sharing</li>
          <li>Strong belief in diversity and inclusion</li>
        </ul>
      </>
    ),
  },
  {
    question: "I'm new, how does ADPList work for mentors?",
    answer:
      "Once approved, mentors can create their profile, set availability, and start accepting mentoring sessions from learners across the community.",
  },
  {
    question: "What's the approval criteria to be a mentor?",
    answer:
      "We look for experienced professionals who are passionate about helping others grow through mentorship.",
  },
  {
    question: "Why reviews matter for mentors?",
    answer:
      "Reviews help build trust, credibility, and ensure high-quality mentorship experiences for everyone in the community.",
  },
  {
    question: 'Can mentors also be "mentees"?',
    answer:
      "Yes, mentors are encouraged to continue learning and can book sessions with other mentors as mentees.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white mx-6 my-12 md:my-24 rounded-[40px] p-6 md:p-16">
      <div className="flex md:flex-row flex-col justify-between gap-12">
        
        {/* LEFT CONTENT */}
        <div className="basis-1/3">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Some common questions
          </h2>
          <p className="text-gray-600 text-lg">
            Some questions asked by the members of our community
          </p>
        </div>

        {/* RIGHT FAQ LIST */}
        <div className="divide-y basis-2/3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className="py-5">
                
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-start text-left"
                >
                  <span className="text-xl font-semibold">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-light"
                  >
                    {isOpen ? "−" : "+"}
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 text-gray-600 text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
