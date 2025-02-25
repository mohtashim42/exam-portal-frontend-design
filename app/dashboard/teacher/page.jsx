"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  Clipboard,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Book,
  CalendarCheck,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New exam paper review request" },
    { id: 2, text: "Upcoming duty tomorrow" },
    { id: 3, text: "Paper submission deadline approaching" },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("role");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const modules = [
    {
      title: "Submit Exam Paper",
      icon: <FileText className="w-10 h-10" />,
      description: "Create and submit new examination papers",
      link: "/dashboard/teacher/submit-paper",
      color: "primary",
    },
    {
      title: "View Submitted Papers",
      icon: <Eye className="w-10 h-10" />,
      description: "Review your submitted examination papers",
      link: "/dashboard/teacher/review-paper",
      color: "secondary",
    },
    {
      title: "View Assigned Duties",
      icon: <Clipboard className="w-10 h-10" />,
      description: "Check your examination duty schedule",
      link: "/components/DutyScheduleForm",
      color: "accent",
    },
  ];

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-base-200 shadow-xl transition-all duration-300 z-20 
        ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div
            className={`flex items-center gap-3 ${!isSidebarOpen && "hidden"}`}
          >
            <div className="p-2 bg-primary/10 rounded-xl">
              <Book className="text-primary w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Exam Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="btn btn-sm btn-ghost"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {[
            {
              icon: <Home size={20} />,
              label: "Dashboard",
              link: "/dashboard",
            },
            {
              icon: <FileText size={20} />,
              label: "Submit Paper",
              link: "/components/PaperSubmissionForm",
            },
            {
              icon: <Eye size={20} />,
              label: "View Papers",
              link: "/view-papers",
            },
            {
              icon: <CalendarCheck size={20} />,
              label: "Assigned Duties",
              link: "/duties",
            },
            {
              icon: <Bell size={20} />,
              label: "Notifications",
              link: "/notifications",
            },
            { icon: <User size={20} />, label: "Profile", link: "/profile" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-primary/10 transition-colors
                ${!isSidebarOpen && "justify-center"}`}
            >
              {item.icon}
              <span className={`${!isSidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </Link>
          ))}

          <button
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-error/10 text-error w-full
            ${!isSidebarOpen && "justify-center"}`}
          >
            <LogOut size={20} />
            <span className={`${!isSidebarOpen && "hidden"}`}>Sign Out</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Navbar */}
        <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-10">
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
          </div>
          <div className="flex-none gap-4">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <Bell className="h-5 w-5" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    {notifications.length}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow-xl border border-base-200"
              >
                <div className="card-body">
                  <h3 className="font-bold text-lg">Notifications</h3>
                  <div className="divide-y divide-base-200">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="py-3">
                        <p className="text-sm">{notification.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a className="text-error">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link
                href={module.link}
                key={index}
                className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="card-body">
                  <div className={`p-3 bg-${module.color}/10 rounded-xl w-fit`}>
                    {module.icon}
                  </div>
                  <h2 className="card-title mt-4">{module.title}</h2>
                  <p className="text-base-content/60">{module.description}</p>
                  <div className="card-actions justify-end mt-4">
                    <button className={`btn btn-${module.color} btn-sm gap-2`}>
                      Access
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <div className="space-y-4">
                  {[
                    {
                      icon: <FileCheck className="w-5 h-5" />,
                      text: "Submitted Mathematics Final Exam Paper",
                      time: "2 hours ago",
                    },
                    {
                      icon: <CalendarCheck className="w-5 h-5" />,
                      text: "New Duty Assigned: Physics Lab Exam",
                      time: "1 day ago",
                    },
                    {
                      icon: <Eye className="w-5 h-5" />,
                      text: "Reviewed Chemistry Mid-term Paper",
                      time: "2 days ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.text}</p>
                        <p className="text-sm text-base-content/60">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
