"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, X } from "lucide-react";
import { useRegisterMentorMutation } from "@/features/mentor/mentorApiSlice";
import { useRouter } from "next/navigation";

const LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Gujarati",
  "Urdu",
];

const FIELDS_OF_WORK = [
  "Software Engineering",
  "Data Science / AI",
  "Design / UI-UX",
  "Product Management",
  "Marketing",
  "Finance",
  "Business / Entrepreneurship",
  "Law",
  "Medicine / Healthcare",
  "Civil Services / UPSC",
  "Study Abroad Guidance",
  "Other",
];

// ✅ Predefined social media platforms
const SOCIAL_MEDIA = [
  "LinkedIn",
  "X (Twitter)",
  "Behance",
  "Instagram",
  "Facebook",
  "GitHub",
  "YouTube",
  "Portfolio Website",
];

export default function MentorEnrollmentForm() {
  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      fullName: "",
      profession: "",
      workExperience: "",
      currentlyWorkingIn: "",
      about: "",
      languages: [],
      fieldsOfWork: [],
      otherField: "",
      education: [{ level: "", subject: "", institution: "" }],
      socialLinks: [],
      expertise: [],
      photo: null,
    },
  });
  const [registerMentor, { isLoading, isError, error }] =
    useRegisterMentorMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  const router = useRouter();

  // ✅ Social Links array
  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });
  const expertise = watch("expertise") || [];
  const [expertiseInput, setExpertiseInput] = React.useState("");

  // add expertise on Enter or comma
  const handleExpertiseKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = expertiseInput.trim();
      if (newSkill && !expertise.includes(newSkill)) {
        setValue("expertise", [...expertise, newSkill]); // update form
      }
      setExpertiseInput("");
    }
  };

  // remove expertise chip
  const removeExpertise = (skill) => {
    setValue(
      "expertise",
      expertise.filter((s) => s !== skill)
    );
  };
  const onSubmit = async (data) => {
    // Handle "Other" case
    if (data.fieldsOfWork.includes("Other") && data.otherField) {
      data.fieldsOfWork = data.fieldsOfWork.filter((f) => f !== "Other");
      data.fieldsOfWork.push(data.otherField);
    }

    const photoFile = data.photo?.[0] || null;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "photo") {
        if (photoFile) formData.append("photo", photoFile);
      } else {
        const value = data[key];

        // ✅ If array or object → stringify
        if (Array.isArray(value) || typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          // ✅ If string/number → append directly
          formData.append(key, value);
        }
      }
    });

    const res = await registerMentor(formData);

    if (res?.data?.success) {
      alert("Mentor registered successfully!");
      router.push("/mentordetail");
      reset();
    } else {
      alert("Failed to register mentor");
    }
  };

  const onToggleArrayValue = (field, value) => {
    const current = new Set(watch(field));
    current.has(value) ? current.delete(value) : current.add(value);
    setValue(field, Array.from(current));
  };
  const selectedLanguages = watch("languages");
  const selectedFields = watch("fieldsOfWork");

  // ✅ Local state for new social link
  const [selectedPlatform, setSelectedPlatform] = React.useState("");
  const [socialUrl, setSocialUrl] = React.useState("");

  // const handleAddSocial = () => {
  //   if (!selectedPlatform || !socialUrl) return;
  //   appendSocial({ platform: selectedPlatform, url: socialUrl });
  //   setSelectedPlatform("");
  //   setSocialUrl("");
  // };

  const handleAddSocial = () => {
    if (!selectedPlatform || !socialUrl.trim()) {
      alert("Please select a platform and enter a valid URL");
      return;
    }

    // Duplicate check (optional)
    if (
      socialFields.some(
        (s) => s.platform === selectedPlatform && s.url === socialUrl
      )
    ) {
      alert("This link already exists");
      return;
    }

    appendSocial({ platform: selectedPlatform, url: socialUrl }); // <-- use appendSocial

    setSelectedPlatform("");
    setSocialUrl("");
  };

  return (
    <div className='max-w-3xl mx-auto p-4 sm:p-6 lg:p-8'>
      <div className='mb-6 bg-muted/40 border rounded-2xl p-4 sm:p-6 shadow-sm'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Mentor Enrollment
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          We would like to know{" "}
          <span className='font-medium'>how you can help students,</span> please
          share about your expertise, education, and experience so that students
          can make better career decisions.
        </p>
      </div>

      <Card className='rounded-2xl shadow-md'>
        <CardHeader>
          <CardTitle className='text-xl'>Mentor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Full Name */}
            <div className='space-y-2'>
              <Label htmlFor='fullName'>Full Name</Label>
              <Input
                id='fullName'
                placeholder='e.g., Anuj Sachan'
                {...register("fullName", { required: true })}
              />
            </div>
            {/* Dynamic Education Section */}
            <div className='space-y-4'>
              <Label>Education</Label>
              {fields.map((field, index) => (
                <div key={field.id} className='border rounded-xl p-4 space-y-3'>
                  <div className='space-y-2'>
                    <Label htmlFor={`education.${index}.level`}>Level</Label>
                    <Input
                      id={`education.${index}.level`}
                      placeholder='e.g., Bachelors / Masters'
                      {...register(`education.${index}.level`)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor={`education.${index}.subject`}>
                      Subject / Field
                    </Label>
                    <Input
                      id={`education.${index}.subject`}
                      placeholder='e.g., Computer Science'
                      {...register(`education.${index}.subject`)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor={`education.${index}.institution`}>
                      Institution
                    </Label>
                    <Input
                      id={`education.${index}.institution`}
                      placeholder='e.g., IIT Delhi'
                      {...register(`education.${index}.institution`)}
                    />
                  </div>
                  <Button
                    type='button'
                    variant='destructive'
                    size='sm'
                    onClick={() => remove(index)}
                    className='rounded-xl px-6 bg-red-100 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white'
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                variant='secondary'
                onClick={() =>
                  append({ level: "", subject: "", institution: "" })
                }
              >
                + Add More Education
              </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {/* profession */}
              <div className='space-y-2'>
                <Label htmlFor='profession'>Profession</Label>
                <Input
                  id='profession'
                  placeholder='e.g., Frontend Developer'
                  {...register("profession")}
                />
              </div>
              {/* Work experience */}
              <div className='space-y-2'>
                <Label htmlFor='workExperience'>Work Experience</Label>
                <Input
                  id='workExperience'
                  placeholder='e.g., 5 years'
                  {...register("workExperience")}
                />
              </div>
            </div>
            {/* currently working */}
            <div className='space-y-2'>
              <Label htmlFor='currentlyWorkingIn'>Currently Working In</Label>
              <Input
                id='currentlyWorkingIn'
                placeholder='e.g., TechEcho / DeeD'
                {...register("currentlyWorkingIn")}
              />
            </div>
            {/* About  */}
            <div className='space-y-2'>
              <Label htmlFor='about'>About / Overview</Label>
              <Textarea
                id='about'
                placeholder='About you: describe how you guide, key achievements, focus areas, and areas of expertise.'
                className='min-h-[120px]'
                {...register("about")}
              />
            </div>
            {/* ✅ Expertise Section */}
            <div className='space-y-2'>
              <Label htmlFor='expertise'>Expertise</Label>
              <div className='flex flex-wrap gap-2 border rounded-xl p-2'>
                {/* Chips */}
                {expertise.map((skill, idx) => (
                  <div
                    key={idx}
                    className='flex items-center gap-1 ring-1 ring-green-700 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm'
                  >
                    {skill}
                    <button
                      type='button'
                      onClick={() => removeExpertise(skill)}
                      className='ml-1 text-green-700 hover:text-red-600'
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* Input */}
                <input
                  type='text'
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  onKeyDown={handleExpertiseKeyDown}
                  placeholder='Type and press Enter'
                  className='flex-1 min-w-[120px] outline-none border-none px-2 py-1 text-sm'
                />
              </div>
            </div>
            {/* language */}
            <div className='space-y-3'>
              <Label>Language/s</Label>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {LANGUAGES.map((lang) => (
                  <label
                    key={lang}
                    className='flex items-center gap-2 rounded-xl border p-2'
                  >
                    <Checkbox
                      checked={selectedLanguages?.includes(lang)}
                      onCheckedChange={() =>
                        onToggleArrayValue("languages", lang)
                      }
                      className='data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600'
                    />
                    <span className='text-sm'>{lang}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* fields of work */}
            <div className='space-y-3'>
              <Label>Fields of work</Label>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {FIELDS_OF_WORK.map((field) => (
                  <div key={field} className='flex flex-col gap-2'>
                    <label className='flex items-center gap-2 rounded-xl border p-2'>
                      <Checkbox
                        checked={selectedFields?.includes(field)}
                        onCheckedChange={() =>
                          onToggleArrayValue("fieldsOfWork", field)
                        }
                        className='data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600'
                      />
                      <span className='text-sm'>{field}</span>
                    </label>

                    {/* Agar Other select hai to input dikhaye */}
                    {field === "Other" && selectedFields?.includes("Other") && (
                      <Input
                        placeholder='Enter your custom field'
                        {...register("otherField")}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Social Media Links Section */}

            <div className='space-y-3'>
              <Label>Social Media Links</Label>

              {/* Already added links */}
              <div className='space-y-2'>
                {socialFields.map((item, index) => (
                  <div
                    key={item.id}
                    className='flex flex-col sm:flex-row justify-between items-start sm:items-center border p-2 rounded-lg gap-2'
                  >
                    <span className='text-sm font-medium'>
                      {item.platform}:
                    </span>
                    <a
                      href={item.url}
                      target='_blank'
                      className='text-blue-600 underline text-sm truncate max-w-[200px]'
                    >
                      {item.url}
                    </a>
                    <Button
                      type='button'
                      size='sm'
                      variant='destructive'
                      onClick={() => removeSocial(index)}
                      className='self-end sm:self-auto'
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add new social link */}
              <div className='flex flex-col sm:flex-row gap-2 items-stretch sm:items-center'>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className='border rounded-lg px-3 py-[5px] flex-1'
                >
                  <option value=''>Select Platform</option>
                  {SOCIAL_MEDIA.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder='Enter profile URL'
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  className='flex-1'
                />
                <Button
                  type='button'
                  onClick={handleAddSocial}
                  className='rounded-lg bg-green-600 text-white w-full sm:w-auto'
                >
                  Add
                </Button>
              </div>
            </div>
            {/* Profile Photo Upload */}
            <div className='space-y-2'>
              <Label htmlFor='photo'>Profile Photo</Label>
              <Input
                id='photo'
                type='file'
                accept='image/*'
                {...register("photo")}
              />
              <p className='text-xs text-muted-foreground text-red-500'>
                *Please upload a{" "}
                <span className='font-medium'>professional photo</span>
                (formal attire, clear face, plain background preferred).
              </p>
            </div>
            {isError && (
              <p className='text-xs text-red-500'>{error?.data?.message}</p>
            )}
            {/* submit form button */}
            <div className='pt-2 flex items-center gap-3'>
              <Button
                type='submit'
                className='rounded-xl px-6 hover:bg-green-100 border border-green-600 bg-white text-green-600 '
              >
                {isLoading ? <Loader2 className='animate-spin' /> : "Submit"}
              </Button>
              <Button
                type='button'
                variant='secondary'
                className='rounded-xl hover:bg-red-100 ring-1 ring-red-500 ring-inset text-red-500'
                onClick={() => reset()}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
