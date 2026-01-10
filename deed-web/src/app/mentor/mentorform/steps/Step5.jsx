"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormStepCard from "../../components/FormStepCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Trash2, Loader, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../components/ui/Section";
import { Button } from "@/components/ui/PrimarySmallButton";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, resetForm } from "@/redux/mentor/mentorSlice";
import { useSaveStep5Mutation } from "@/redux/mentor/mentorApi";
import { AlertCircle } from "lucide-react";

export default function Step5() {
  const router = useRouter();

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const storedFormData = useSelector((state) => state.mentor.formData);

  const [form, setForm] = useState({
    about: storedFormData?.about || "",
    agreements: storedFormData?.agreements || {
      respectful: false,
      consent: false,
    },
  });

  // Sync to Redux
  useEffect(() => {
    dispatch(updateFormData(form));
  }, [form, dispatch]);

  /* ---------- PHOTO HANDLERS ---------- */

  const handlePhotoUpload = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert("File must be below 2MB");

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    setTimeout(() => {
      setPhoto(file);
      setUploading(false);
    }, 1200); // mimic upload
  };

  const deletePhoto = () => {
    setPhoto(null);
    setPreview(null);
    setShowDeleteModal(false);
  };

  const [saveStep5, { error: saveError, isLoading }] = useSaveStep5Mutation();

  const handleSubmit = async () => {
    if (!form.agreements.respectful || !form.agreements.consent) return;

    const payload = new FormData();
    if (photo) payload.append("photo", photo);
    payload.append("about", form.about);
    payload.append("agreements", JSON.stringify(form.agreements));

    try {
      await saveStep5(payload).unwrap();
      dispatch(resetForm());
      localStorage.removeItem("mentor_form_data");
      router.push("/mentor/thank-you");
    } catch (error) {
      console.error("Step 5 save failed", error);
    }
  };

  return (
    <FormStepCard
      title='Verification & Consent'
      onPrev={() => router.push("/mentor/mentorform/step-4")}
      onNext={handleSubmit}
      nextLabel='Submit'
      isLoading={isLoading}
    >
      {/* ERROR MESSAGE */}
      {saveError && (
        <div className='bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-4 text-sm'>
          <AlertCircle size={16} />
          <span>
            {saveError?.data?.message ||
              "Something went wrong. Please try again."}
          </span>
        </div>
      )}
      {/* PROFILE PHOTO */}
      <Section title='Upload a profile photo (optional)'>
        <div className='flex items-center gap-4'>
          {/* IMAGE UPLOAD BOX */}
          <label className='relative w-32 h-32 rounded-[32px] overflow-hidden bg-white cursor-pointer group'>
            {/* IMAGE */}
            {preview && (
              <img
                src={preview}
                alt='Profile'
                className='w-full h-full object-fill'
              />
            )}

            {/* OVERLAY */}
            <div
              className={`
    absolute top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    flex items-center justify-center
    w-10 h-10 rounded-xl border border-[#2D8545]
    bg-[#e4ffeb] p-1
    ${preview ? "opacity-0" : "opacity-100"}
  `}
            >
              <Upload className='text-[#2D8545]' size={20} />
            </div>

            {/* LOADING */}
            {uploading && (
              <div
                className='absolute inset-0 bg-white flex items-center justify-center z-10 w-10 h-10 top-1/2 left-1/2 p-1
    -translate-x-1/2 -translate-y-1/2 rounded-xl'
              >
                <Loader className='animate-spin text-gray-500' size={20} />
              </div>
            )}

            {/* FILE INPUT */}
            <input
              type='file'
              accept='image/*'
              hidden
              onChange={(e) => handlePhotoUpload(e.target.files[0])}
            />

            {/* TRASH ICON */}
            {preview && !uploading && (
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}
                className='
    absolute top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    bg-white rounded-xl p-1
    shadow z-20 w-10 h-10 flex justify-center items-center  
  '
              >
                <Trash size={20} className='text-gray-500' />
              </button>
            )}
          </label>

          {/* TEXT INFO */}
          <div>
            <p className='text-sm font-semibold text-black'>
              {preview ? "Update profile picture" : "Upload profile picture"}
            </p>
            <p className='text-xs text-gray-500'>JPG, PNG · Max 2MB</p>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section title={`Let us know a little about yourself`}>
        <Input
          placeholder='Students would like to read and know about you'
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />
      </Section>

      {/* AGREEMENTS */}
      <Section title={`Agreements`}>
        <label className='flex items-center gap-3 cursor-pointer mb-12'>
          <Checkbox
            checked={form.agreements.respectful}
            onCheckedChange={(v) =>
              setForm({
                ...form,
                agreements: { ...form.agreements, respectful: v },
              })
            }
          />
          <span className='text-sm'>
            I agree to maintain respectful and ethical communication with
            students.
          </span>
        </label>

        <label className='flex items-center gap-3 cursor-pointer'>
          <Checkbox
            checked={form.agreements.consent}
            onCheckedChange={(v) =>
              setForm({
                ...form,
                agreements: { ...form.agreements, consent: v },
              })
            }
          />
          <span className='text-sm'>
            I consent to Deed reviewing my application and contacting me
            regarding mentorship opportunities.
          </span>
        </label>
      </Section>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className='fixed inset-0 z-50 bg-black/30 flex items-center justify-center w-full space-y-4 max-w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ top: "-10%" }}
          >
            <motion.div
              className='bg-white rounded-2xl p-6 w-[90%] max-w-lg'
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <h3 className='font-semibold text-xl mb-2'>
                Delete profile picture
              </h3>
              <p className='text-base text-gray-600 mb-8'>
                Are you sure you want to delete the profile picture?
              </p>

              <div className='flex justify-between gap-3'>
                <Button
                  text={"Yes"}
                  onClick={deletePhoto}
                  variant={"SecondarySmallOutlinedButton"}
                  type='button'
                  className='w-full'
                />

                <Button
                  onClick={() => setShowDeleteModal(false)}
                  variant={"SecondarySmallButton"}
                  text={"Cancel"}
                  type='button'
                  className='w-full'
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormStepCard>
  );
}
