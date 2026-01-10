"use client";

import { Input } from "@/components/ui/input";
import {
  Check,
  Instagram,
  MailIcon,
  MapPin,
  PhoneCall,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const contactData = [
  { label: "+91-34567890", Icon: PhoneCall },
  { label: "deed@gmail.com", Icon: MailIcon },
  { label: "Ahmedabad, Gujarat, India", Icon: MapPin },
];

const socialIcons = [Twitter, Instagram];

const options = ["General query", "Career", "Other"];
export default function ContactPage() {
  return (
    <div className='max-w-[80%] mx-auto'>
      <h2 className='text-2xl md:text-[40px] text-center font-bold mt-8 mb-2'>
        Contact Us
      </h2>
      <p className='text-gray-600 w-2/3 mx-auto text-sm md:text-lg text-center'>
        Any question or remarks? Just write us a message!
      </p>
      {/* box for form */}
      <div className='bg-white border-2 border-secondaryButtonBg flex md:flex-row flex-col gap-7 md:gap-10 mb-20 mt-5 md:mt-12 p-2 rounded-lg'>
        <aside className='bg-secondaryBg basis-[40%] rounded-lg p-6 md:p-10 md:text-left text-center'>
          <h3 className='text-xl md:text-3xl font-bold mb-2'>
            Contact Information
          </h3>
          <p className='text-sm md:text-lg text-gray-500'>
            Say something to start chat!
          </p>
          <div className='mt-3 md:mt-28'>
            {contactData.map(({ label, Icon }, index) => (
              <div
                key={index}
                className='flex md:flex-row flex-col items-center gap-2 md:gap-6 mb-4 md:mb-12'
              >
                <Icon className='w-6 h-6' />
                <p>{label}</p>
              </div>
            ))}
          </div>
          {/* social links */}
          <div className='flex gap-6 mt-14 md:mt-40 justify-center items-center md:justify-normal md:items-start'>
            {socialIcons.map((Icon, index) => (
              <div
                key={index}
                className='flex justify-center border-secondaryButtonBg border-2 text-secondaryButtonBg box-border w-10 h-10 rounded-full hover:bg-secondaryButtonBg p-2 hover:text-primaryBg items-center gap-3 cursor-pointer'
              >
                <Icon className='w-4 h-4' />
              </div>
            ))}
          </div>
        </aside>
        <div className='md:basis-[60%] relative pb-0 p-5 md-p-0'>
          <form action='' className='mt-0 md:mt-12 md:mr-12'>
            {/* first name and last name fields  */}
            <div className='flex md:flex-row flex-col w-full gap-5 md:gap-9'>
              <div className='basis-[49%]'>
                <label htmlFor='firstName' className='text-sm'>
                  First Name
                </label>
                <Input type='text' id='firstName' placeholder='John' />
              </div>
              <div className='basis-[49%]'>
                <label htmlFor='lastName' className='text-sm'>
                  Last Name
                </label>
                <Input type='text' id='lastName' placeholder='Doe' />
              </div>
            </div>
            {/* Email and phone no. fields  */}
            <div className='flex md:flex-row flex-col w-full gap-5 md:gap-9 my-5 md:my-11'>
              <div className='basis-[49%]'>
                <label htmlFor='email' className='text-sm'>
                  Email
                </label>
                <Input
                  className=''
                  type='email'
                  id='email'
                  placeholder='example@gmail.com'
                />
              </div>
              <div className='basis-[49%]'>
                <label htmlFor='phone' className='text-sm'>
                  Phone Number
                </label>
                <Input
                  className=''
                  type='text'
                  id='phone'
                  placeholder='+91-214332432'
                />
              </div>
            </div>
            {/* subject selection  */}
            <div className='gap-4'>
              <p className='text-lg font-semibold'>Select subject?</p>
              <div className='flex flex-wrap mt-3 gap-5 md:gap-0'>
                {options.map((option, i) => (
                  <label
                    key={i}
                    className='cursor-pointer flex items-center gap-2 text-sm md:text-base rounded-lg mr-5 '
                  >
                    <input
                      type='radio'
                      name='choice'
                      value={option}
                      className='hidden peer'
                      defaultChecked={i === 0}
                    />
                    <span className='bg-white w-4 h-4 flex items-center z-30 justify-center rounded-full peer-checked:bg-secondaryButtonBg peer-checked:z-0 p-1 mr-2'>
                      <Check className='text-white w-4 h-4 z-20' />
                    </span>
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className='my-5 md:my-11'>
              <label htmlFor='message'>Message</label>
              <Input
                className='w-full'
                type='text'
                id='message'
                placeholder='Write your message'
              />
            </div>
            <Button
              variant={"PrimarySmallButton"}
              text={"Submit"}
              type='submit'
              className='w-full md:w-auto float-right box-border z-50'
            />
            <img
              src='/media/paperPlane.png'
              alt='image'
              className='relative w-24 h-24  md:w-36 md:h-36 mx-auto md:-bottom-10 md:-right-20 z-10 md:float-right'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
