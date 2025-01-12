"use client";

import { useState, useEffect } from "react";

import PaperSubmissionForm from "@/app/components/PaperSubmissionForm";
import Navigation from "@/app/components/Navigation";

export default function TeacherDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("role");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navigation userRole="teacher" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Submit Exam Paper</h2>
              <PaperSubmissionForm />
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Your Submitted Papers</h2>
              {/* Add a component to display submitted papers */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
