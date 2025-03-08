"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  Building2,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Download,
} from "lucide-react";

export default function TeacherDutySchedules() {
  const [duties, setDuties] = useState([
    {
      id: 1,
      examName: "Advanced Database Systems",
      course: "B.Tech Computer Science",
      subject: "Database Management",
      room: "Block A - Room 101",
      date: "2024-03-20",
      startTime: "09:00",
      endTime: "12:00",
      status: "upcoming",
      department: "Computer Science",
      totalStudents: 45,
      instructions: "Please arrive 30 minutes before exam start time",
    },
    {
      id: 2,
      examName: "Digital Signal Processing",
      course: "B.Tech Electronics",
      subject: "Signal Processing",
      room: "Block B - Room 205",
      date: "2024-03-22",
      startTime: "14:00",
      endTime: "17:00",
      status: "upcoming",
      department: "Electronics Engineering",
      totalStudents: 35,
      instructions: "Collect answer sheets from exam office",
    },
    {
      id: 3,
      examName: "Machine Learning Fundamentals",
      course: "M.Tech AI",
      subject: "Machine Learning",
      room: "Block C - Room 303",
      date: "2024-03-18",
      startTime: "10:00",
      endTime: "13:00",
      status: "completed",
      department: "Computer Science",
      totalStudents: 30,
      instructions: "Submit reports after examination",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDuty, setSelectedDuty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredDuties = duties.filter((duty) => {
    const matchesSearch = duty.examName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || duty.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (duty) => {
    setSelectedDuty(duty);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          My Invigilation Duties
        </h1>
        <p className="text-blue-100">View and manage your assigned examination duties</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Duties</h3>
                <p className="text-2xl font-bold text-primary">{duties.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Upcoming</h3>
                <p className="text-2xl font-bold text-success">
                  {duties.filter(d => d.status === "upcoming").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <MapPin className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Today's Duties</h3>
                <p className="text-2xl font-bold text-warning">
                  {duties.filter(d => new Date(d.date).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Completed</h3>
                <p className="text-2xl font-bold text-secondary">
                  {duties.filter(d => d.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by exam name..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered w-full md:w-64"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Duties List */}
      <div className="space-y-4">
        {filteredDuties.map((duty) => (
          <div
            key={duty.id}
            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all"
          >
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{duty.examName}</h3>
                    <span className={`badge ${
                      duty.status === "upcoming" ? "badge-primary" : "badge-success"
                    } badge-sm`}>
                      {duty.status}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 mt-1">{duty.course}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-base-content/60">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(duty.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-base-content/60">
                      <Clock className="w-4 h-4" />
                      {duty.startTime} - {duty.endTime}
                    </div>
                    <div className="flex items-center gap-2 text-base-content/60">
                      <MapPin className="w-4 h-4" />
                      {duty.room}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewDetails(duty)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Duty Details Modal */}
      {showModal && selectedDuty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Duty Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Exam Information</h4>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Course:</span> {selectedDuty.course}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Subject:</span> {selectedDuty.subject}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Department:</span> {selectedDuty.department}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Venue Details</h4>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Room:</span> {selectedDuty.room}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Total Students:</span> {selectedDuty.totalStudents}
                  </p>
                </div>
              </div>
              <div className="bg-base-200 p-4 rounded-lg mt-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  Important Instructions
                </h4>
                <p className="text-sm mt-2">{selectedDuty.instructions}</p>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
