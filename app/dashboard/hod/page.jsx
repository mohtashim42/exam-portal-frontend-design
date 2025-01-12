"use client";

import Navigation from "@/app/components/Navigation";
import PaperApprovalList from "@/app/components/PaperApprovalList";
import { useState, useEffect } from "react";

export default function HodDashboard() {
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
      <Navigation userRole="hod" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">HOD Dashboard</h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Papers Pending Approval</h2>
            <PaperApprovalList />
          </div>
        </div>
      </div>
    </div>
  );
}
