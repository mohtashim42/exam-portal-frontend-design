"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Users,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  Building2,
  ChevronRight,
  UserCheck,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function ExamControllerDashboard() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New paper submission requires review" },
    { id: 2, text: "Duty allocation pending for next week" },
    { id: 3, text: "Answer sheet bundle ready for processing" },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const adminModules = [
    {
      title: "Create Exam Timetable",
      icon: <CalendarDays className="w-10 h-10" />,
      description: "Schedule and manage examination timetables",
      link: "/dashboard/exam-controller/create-timetable",
      color: "primary",
      stats: "2 Pending Schedules",
    },
    {
      title: "Assign Invigilation Duties",
      icon: <UserCheck className="w-10 h-10" />,
      description: "Allocate and manage examination duties",
      link: "/dashboard/exam-controller/assign-duties",
      color: "secondary",
      stats: "15 Teachers Available",
    },
    {
      title: "Department Management",
      icon: <Building2 className="w-10 h-10" />,
      description: "Manage departments and resources",
      link: "/departments",
      color: "info",
      stats: "8 Active Departments",
    },
    {
      title: "User Management",
      icon: <Users className="w-10 h-10" />,
      description: "Manage user accounts and permissions",
      link: "/users",
      color: "success",
      stats: "120 Active Users",
    },
    {
      title: "Reports & Analytics",
      icon: <BarChart3 className="w-10 h-10" />,
      description: "Generate and view system reports",
      link: "/reports",
      color: "warning",
      stats: "12 New Reports",
    },
  ];

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", link: "/dashboard" },
    {
      icon: <CalendarDays size={20} />,
      label: "Timetables",
      link: "/timetables",
    },
    { icon: <UserCheck size={20} />, label: "Duties", link: "/duties" },
    {
      icon: <Building2 size={20} />,
      label: "Departments",
      link: "/departments",
    },
    { icon: <Users size={20} />, label: "Users", link: "/users" },
    { icon: <BarChart3 size={20} />, label: "Reports", link: "/reports" },
    { icon: <Settings size={20} />, label: "Settings", link: "/settings" },
  ];

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
              <Settings className="text-primary w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Exam Control</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="btn btn-sm btn-ghost"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
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
              Exam Controller Dashboard
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
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Active Exams", value: "12", change: "+2" },
              { label: "Pending Papers", value: "45", change: "-5" },
              { label: "Active Users", value: "120", change: "+10" },
              { label: "Departments", value: "8", change: "0" },
            ].map((stat, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl border border-base-200"
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-base-content/60 text-sm">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div
                      className={`badge ${
                        stat.change.startsWith("+")
                          ? "badge-success"
                          : stat.change === "0"
                          ? "badge-ghost"
                          : "badge-error"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module, index) => (
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
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                      {module.stats}
                    </span>
                    <button className={`btn btn-${module.color} btn-sm gsap-2`}>
                      Manage
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <div className="space-y-4">
                  {[
                    {
                      icon: <CalendarDays className="w-5 h-5" />,
                      text: "Final Exam Timetable Published",
                      time: "1 hour ago",
                    },
                    {
                      icon: <UserCheck className="w-5 h-5" />,
                      text: "Invigilation Duties Assigned",
                      time: "3 hours ago",
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      text: "New Teacher Account Created",
                      time: "1 day ago",
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
