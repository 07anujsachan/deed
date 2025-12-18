"use client";
import { useState } from "react";
import Home from "./Home/Home";
import Footer from "./components/Footer";

export default function Page() {
  const [theme, setTheme] = useState("light");
  return (
    <div className=''>
      <Home />
    </div>
  );
}
