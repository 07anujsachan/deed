"use client"
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  const onSubmit = async (data) => {
    // Agar Other selected hai to uska value fieldsOfWork me add kar do
    if (data.fieldsOfWork.includes("Other") && data.otherField) {
      data.fieldsOfWork = data.fieldsOfWork.filter((f) => f !== "Other");
      data.fieldsOfWork.push(data.otherField);
    }
  
    const res = await fetch("/api/mentors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    const result = await res.json();
    if (res.ok) {
      alert("Mentor registered successfully!");
      console.log("Saved mentor:", result.mentor);
      reset();
    } else {
      alert(result.error || "Failed to register mentor");
    }
  };
  

  const selectedLanguages = watch("languages");
  const selectedFields = watch("fieldsOfWork");
  const otherField = watch("otherField");

  const onToggleArrayValue = (field, value) => {
    const current = new Set(watch(field));
    current.has(value) ? current.delete(value) : current.add(value);
    setValue(field, Array.from(current));
  };

 

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
     <div className="mb-6 bg-muted/40 border rounded-2xl p-4 sm:p-6 shadow-sm">
  <h1 className="text-2xl font-semibold tracking-tight">
    Mentor Enrollment
  </h1>
  <p className="mt-2 text-sm text-muted-foreground">
    We would like to know{" "}
    <span className="font-medium">
      how you can help students,
    </span>{" "}
     please share about your expertise, education, and experience so that
    students can make better career decisions.
  </p>
</div>


      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Mentor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="e.g., Anuj Sachan"
                {...register("fullName", { required: true })}
              />
            </div>

            {/* Dynamic Education Section */}
            <div className="space-y-4">
              <Label>Education</Label>
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-xl p-4 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.level`}>Level</Label>
                    <Input
                      id={`education.${index}.level`}
                      placeholder="e.g., Bachelors / Masters"
                      {...register(`education.${index}.level`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.subject`}>
                      Subject / Field
                    </Label>
                    <Input
                      id={`education.${index}.subject`}
                      placeholder="e.g., Computer Science"
                      {...register(`education.${index}.subject`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.institution`}>
                      Institution
                    </Label>
                    <Input
                      id={`education.${index}.institution`}
                      placeholder="e.g., IIT Delhi"
                      {...register(`education.${index}.institution`)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    className="rounded-xl px-6 bg-red-100 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({ level: "", subject: "", institution: "" })
                }
              >
                + Add More Education
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  placeholder="e.g., Frontend Developer"
                  {...register("profession")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workExperience">Work Experience</Label>
                <Input
                  id="workExperience"
                  placeholder="e.g., 5 years"
                  {...register("workExperience")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentlyWorkingIn">Currently Working In</Label>
              <Input
                id="currentlyWorkingIn"
                placeholder="e.g., TechEcho / DeeD"
                {...register("currentlyWorkingIn")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About / Overview</Label>
              <Textarea
                id="about"
              placeholder="About you: describe how you guide, key achievements, focus areas, and areas of expertise."
                className="min-h-[120px]"
                {...register("about")}
              />
            </div>

            <div className="space-y-3">
              <Label>Language/s</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center gap-2 rounded-xl border p-2"
                  >
                    <Checkbox
                      checked={selectedLanguages?.includes(lang)}
                      onCheckedChange={() =>
                        onToggleArrayValue("languages", lang)
                      }
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Fields of work</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FIELDS_OF_WORK.map((field) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 rounded-xl border p-2">
                      <Checkbox
                        checked={selectedFields?.includes(field)}
                        onCheckedChange={() =>
                          onToggleArrayValue("fieldsOfWork", field)
                        }
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <span className="text-sm">{field}</span>
                    </label>

                    {/* Agar Other select hai to input dikhaye */}
                    {field === "Other" && selectedFields?.includes("Other") && (
                      <Input
                        placeholder="Enter your custom field"
                        {...register("otherField")}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button
                type="submit"
                className="rounded-xl px-6 bg-green-100 border border-green-600 hover:bg-green-700 text-green-600 hover:text-white"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="rounded-2xl"
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
