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
import { Button } from "../components/UIComponents/PrimarySmallButton";

const contactData = [
  { label: "+91-34567890", Icon: PhoneCall },
  { label: "deed@gmail.com", Icon: MailIcon },
  { label: "Ahmedabad, Gujarat, India", Icon: MapPin },
];

const socialIcons = [Twitter, Instagram];

const options = ["General query", "Career", "Other"];
export default function ContactPage() {
  return (
    <div className='mx-36 '>
      <h2 className='text-[40px] text-center font-bold mt-8'>Contact Us</h2>
      <p className='text-gray-600 text-lg text-center'>
        Any question or remarks? Just write us a message!
      </p>
      {/* box for form */}
      <div className='bg-primaryBg flex gap-10 w-full h-auto mx-auto mb-20 mt-12 p-2 rounded-lg'>
        <aside className='bg-secondaryBg basis-[40%] rounded-lg p-10'>
          <h3 className='text-3xl font-bold mb-2'>Contact Information</h3>
          <p className='text-lg text-gray-500'>Say something to start chat!</p>
          <div className='mt-28'>
            {contactData.map(({ label, Icon }, index) => (
              <div key={index} className='flex items-center gap-6 mb-12'>
                <Icon className='w-6 h-6' />
                <p>{label}</p>
              </div>
            ))}
          </div>
          {/* social links */}
          <div className='flex gap-6 mt-40'>
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
        <div className='basis-[60%]'>
          <form action='' className='mt-12 mr-12'>
            {/* first name and last name fields  */}
            <div className='flex w-full gap-9'>
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
            <div className='flex w-full gap-9 my-11'>
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
              <div className='flex mt-3'>
                {options.map((option, i) => (
                  <label
                    key={i}
                    className='cursor-pointer flex items-center gap-2 rounded-lg mr-5 '
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
            <div className='my-11'>
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
              className='float-right px-10'
            />
          </form>
          <img
            src='/media/paperPlane.png'
            alt='image'
            className='float-right relative -bottom-5 -right-20'
          />
        </div>
      </div>
    </div>
  );
}
