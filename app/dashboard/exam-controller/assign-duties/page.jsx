"use client";

import { useState, useEffect } from "react";
import {
  UserCheck,
  Search,
  Filter,
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function AssignDuties() {
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ];

  const mockTeachers = [
    {
      id: 1,
      name: "Dr. John Smith",
      department: "Computer Science",
      expertise: "Database Systems",
      assignedDuties: 2,
    },
    {
      id: 2,
      name: "Prof. Sarah Wilson",
      department: "Computer Science",
      expertise: "Artificial Intelligence",
      assignedDuties: 1,
    },
  ];

  const mockExams = [
    {
      id: 1,
      subject: "Database Management",
      date: "2024-03-20",
      startTime: "09:00",
      endTime: "12:00",
      room: "Room 101",
      department: "Computer Science",
      assigned: false,
    },
    {
      id: 2,
      subject: "Machine Learning",
      date: "2024-03-22",
      startTime: "14:00",
      endTime: "17:00",
      room: "Room 205",
      department: "Computer Science",
      assigned: true,
    },
  ];

  useEffect(() => {
    // Simulating API call
    setTeachers(mockTeachers);
    setExams(mockExams);
  }, []);

  const handleAssignDuty = async (teacherId, examId) => {
    setLoading(true);
    try {
      // API call implementation here
      console.log(`Assigning exam ${examId} to teacher ${teacherId}`);
      alert("Duty assigned successfully!");
    } catch (error) {
      console.error("Error assigning duty:", error);
      alert("Failed to assign duty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      (!selectedDepartment || teacher.department === selectedDepartment) &&
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6" />
          Assign Invigilation Duties
        </h1>
        <p className="text-blue-100">
          Manage and assign examination duties to teachers
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Available Teachers</h3>
                <p className="text-2xl font-bold text-primary">
                  {teachers.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <CalendarDays className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pending Exams</h3>
                <p className="text-2xl font-bold text-secondary">
                  {exams.filter((e) => !e.assigned).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Assigned Duties</h3>
                <p className="text-2xl font-bold text-success">
                  {exams.filter((e) => e.assigned).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered w-full md:w-64"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="card bg-base-100 shadow-xl border border-base-200"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{teacher.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2 text-base-content/60">
                      <Building2 className="w-4 h-4" />
                      {teacher.department}
                    </div>
                    <div className="flex items-center gap-2 text-base-content/60">
                      <UserCheck className="w-4 h-4" />
                      {teacher.assignedDuties} duties assigned
                    </div>
                  </div>
                </div>
                <div className="badge badge-primary">{teacher.expertise}</div>
              </div>

              <div className="divider">Available Exams</div>

              <div className="space-y-4">
                {exams
                  .filter(
                    (exam) =>
                      !exam.assigned && exam.department === teacher.department
                  )
                  .map((exam) => (
                    <div
                      key={exam.id}
                      className="flex flex-wrap justify-between items-center gap-4 p-3 bg-base-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{exam.subject}</p>
                        <div className="flex flex-wrap gap-4 mt-1 text-sm text-base-content/60">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(exam.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exam.startTime} - {exam.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exam.room}
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAssignDuty(teacher.id, exam.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="loading loading-spinner loading-sm" />
                        ) : (
                          "Assign"
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="mt-6 card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Assignment Guidelines</h3>
              <ul className="list-disc list-inside text-base-content/70 mt-2 space-y-1">
                <li>Ensure fair distribution of duties among teachers</li>
                <li>Consider teacher expertise and department</li>
                <li>Avoid scheduling conflicts</li>
                <li>Maintain minimum rest period between duties</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
