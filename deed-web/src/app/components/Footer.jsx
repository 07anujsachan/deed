"use client";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white rounded-t-3xl shadow-md py-10 px-8 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img
                src="/media/logo.png"
                alt="Deed Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deed</h1>
              <p className="text-gray-600 text-sm">Decide your education</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Subscribe to our newsletter
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center flex-grow ring-1 ring-inset ring-gray-300 rounded-lg px-3 py-2">
                <Mail size={20} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="ml-2 w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/4 flex flex-col items-start  gap-4 text-start">
          <h2 className="text-lg font-semibold text-gray-900">
            Stay connected with us
          </h2>
          <div className="flex gap-4">
            <a href="#" className="text-pink-500">
              <img
                src="/icons/social/instagram.png"
                alt="Instagram"
                className="w-10 h-10"
              />
            </a>
            <a href="#" className="text-blue-600">
              <img
                src="/icons/social/facebook.png"
                alt="Facebook"
                className="w-10 h-10"
              />
            </a>
            <a href="#" className="text-red-600">
              <img
                src="/icons/social/youtube.png"
                alt="YouTube"
                className="w-10 h-10"
              />
            </a>
            <a href="#" className="text-black">
              <img src="/icons/social/x.png" alt="X" className="w-10 h-10" />
            </a>
            <a href="#" className="text-blue-700">
              <img
                src="/icons/social/linkedin.png"
                alt="LinkedIn"
                className="w-10 h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
