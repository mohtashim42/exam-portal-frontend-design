"use client";

import { useState, useEffect } from "react";

import Navigation from "@/app/components/Navigation";
import TimetableCreationForm from "@/app/components/TimetableCreationForm";
import DutyScheduleForm from "@/app/components/DutyScheduleForm";

export default function ExamControllerDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navigation userRole="exam-controller" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Exam Controller Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Create Timetable</h2>
              <TimetableCreationForm />
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Manage Duty Schedules</h2>
              <DutyScheduleForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
