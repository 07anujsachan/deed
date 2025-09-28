"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";

export default function MentorRegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  // Send OTP Dummy Function
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.email || !formData.password) {
      alert("Please fill all fields before sending OTP.");
      return;
    }
    console.log("OTP sent to:", formData.phone);
    setOtpSent(true);
    alert("OTP Sent! (dummy: 1234)");
  };

  // Verify OTP Dummy Function
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "1234") {
      setVerified(true);
      alert("OTP Verified Successfully!");
      router.push("/mentorform");
    } else {
      alert("Invalid OTP, try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Mentor Register</h2>


        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            // ❌ Don't override inputStyle with px/py (it blocks typing sometimes)
            containerClass="w-full"
            inputClass="!w-full !h-11 !pl-12 !pr-4 !border !rounded-md !text-black"
            buttonClass="!border !bg-white"
            enableSearch
          />
        </div>

        {/* Step 1: Send OTP */}
        {!otpSent && (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        )}

        {/* Step 2: Verify OTP */}
        {otpSent && !verified && (
          <div className="space-y-3">
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
