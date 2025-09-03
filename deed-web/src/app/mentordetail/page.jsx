"use client";
import React, { useEffect, useState } from "react";

export default function MentorDetailPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("/api/mentors", {
          method: "GET",
        });

        const data = await res.json();
        if (res.ok) {
          setMentors(data.mentors);
        } else {
          console.error("Error fetching mentors:", data.error);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) return <p className='text-center'>Loading mentors...</p>;

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1>{mentors[0].username}</h1>
      <img
        src={mentors[0].photo}
        alt='loading'
        className='w-[300px] h-[300px] rounded-full'
      />
    </div>
  );
}
