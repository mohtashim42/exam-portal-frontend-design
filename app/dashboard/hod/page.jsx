"use client";

import Navigation from "@/app/components/Navigation";
import PaperApprovalList from "@/app/components/PaperApprovalList";
import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  CheckCircle,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Book,
  BarChart3,
  FileCheck,
  ChevronRight,
  Building2,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function HodDashboard() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New paper pending approval" },
    { id: 2, text: "Department meeting scheduled" },
    { id: 3, text: "Faculty performance review due" },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("role");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const modules = [
    {
      title: "Review Papers",
      icon: <FileCheck className="w-10 h-10" />,
      description: "Review and approve examination papers",
      link: "/dashboard/hod/review-papers",
      color: "primary",
      stats: "5 Pending Reviews",
    },
    {
      title: "Department Management",
      icon: <Building2 className="w-10 h-10" />,
      description: "Manage faculty and schedule meetings",
      link: "/dashboard/hod/department",
      color: "secondary",
      stats: "15 Active Faculty",
    },
    {
      title: "Faculty Overview",
      icon: <Users className="w-10 h-10" />,
      description: "Monitor faculty performance and activities",
      link: "/dashboard/hod/faculty",
      color: "accent",
      stats: "3 New Updates",
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
            <span className="font-bold text-lg">HOD Portal</span>
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
              icon: <FileCheck size={20} />,
              label: "Review Papers",
              link: "/dashboard/hod/review-papers",
            },
            {
              icon: <Building2 size={20} />,
              label: "Department",
              link: "/dashboard/hod/department",
            },
            {
              icon: <Users size={20} />,
              label: "Faculty",
              link: "/dashboard/hod/faculty",
            },
            {
              icon: <BarChart3 size={20} />,
              label: "Analytics",
              link: "/dashboard/hod/analytics",
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
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Navbar */}
        <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-10 px-4">
          <div className="flex-1">
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
              Head of Department Dashboard
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
        <div className="p-4 md:p-6 max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {modules.map((module, index) => (
              <Link
                href={module.link}
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200"
              >
                <div className="card-body">
                  <div
                    className={`p-4 bg-${module.color}/10 rounded-2xl w-fit`}
                  >
                    <div className={`text-${module.color}`}>{module.icon}</div>
                  </div>
                  <h2 className="card-title mt-4 text-xl">{module.title}</h2>
                  <p className="text-base-content/70 mt-2">
                    {module.description}
                  </p>
                  <div className="card-actions justify-between items-center mt-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-${module.color}`}
                      ></div>
                      <span
                        className={`text-sm text-${module.color} font-medium`}
                      >
                        {module.stats}
                      </span>
                    </div>
                    <button
                      className={`btn btn-${module.color} btn-sm gap-2 rounded-lg hover:shadow-lg transition-all`}
                    >
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
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body">
                <div className="space-y-6">
                  {[
                    {
                      icon: <FileCheck className="w-5 h-5 text-primary" />,
                      text: "Approved Mathematics Final Exam Paper",
                      time: "2 hours ago",
                      color: "primary",
                    },
                    {
                      icon: <Users className="w-5 h-5 text-secondary" />,
                      text: "Faculty Meeting Scheduled",
                      time: "1 day ago",
                      color: "secondary",
                    },
                    {
                      icon: <Eye className="w-5 h-5 text-accent" />,
                      text: "Reviewed Department Performance Report",
                      time: "2 days ago",
                      color: "accent",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-base-200 transition-all"
                    >
                      <div className={`p-3 bg-${activity.color}/10 rounded-xl`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-base">{activity.text}</p>
                        <p className="text-sm text-base-content/60 mt-1">
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
