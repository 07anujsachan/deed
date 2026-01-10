"use client";

import { sectionVariants } from "@/app/components/UIComponents/motionVariants";
import { Button } from "@/components/ui/PrimarySmallButton";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.section
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      exit='exit'
      viewport={{ once: true, amount: 0.3 }}
      className='text-center px-3 md:px-8'
    >
      <div className='w-full relative'>
        <div className='relative w-full h-[40vh] md:h-auto overflow-hidden'>
          <img
            src='/media/thanks.png'
            alt='Thank you illustration'
            className='w-full h-full object-cover md:object-contain'
          />
          <div className='absolute inset-0 flex items-center justify-center p-4'>
            <h2 className='bg-black/50 text-white text-xl sm:text-2xl md:text-4xl py-4 md:py-6 px-6 md:px-10 font-semibold rounded-2xl md:rounded-[32px] md:leading-relaxed text-center'>
              Thank you for signing up <br className='hidden sm:block' /> as a
              mentor!
            </h2>
          </div>
        </div>

        <div className='-mt-8 md:-mt-24 bg-white px-6 py-8 md:py-10 rounded-[24px] md:rounded-[32px] w-[90%] md:w-[80%] mx-auto flex flex-col md:flex-row gap-6 relative z-10 shadow-xl border border-gray-100'>
          <p className='w-full md:basis-2/3 text-center md:text-left text-base md:text-lg'>
            We appreciate your time and willingness to guide students. Our team
            will review your details and get back to you soon with the next
            steps. We usually take 2-3 days to respond, we would request you to
            please visit the website again in 2-3 days.
          </p>
          <div className='md:basis-1/3 basis-full flex justify-center items-center'>
            <Button
              variant='SecondarySmallButton'
              text='Go back to Homepage'
              href='/'
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
