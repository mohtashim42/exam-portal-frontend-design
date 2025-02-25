"use client";

import { useState, useEffect } from "react";
import { getTeachers, getExams, assignDuty } from "../lib/api";
import { Clock, CheckCircle, AlertCircle, Users } from "lucide-react";

export default function DutyScheduleForm() {
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchExams();
  }, []);

  const fetchTeachers = async () => {
    try {
      const teacherList = await getTeachers();
      setTeachers(teacherList);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      showNotification("Error fetching teachers", "error");
    }
  };

  const fetchExams = async () => {
    try {
      const examList = await getExams();
      setExams(examList);
    } catch (error) {
      console.error("Error fetching exams:", error);
      showNotification("Error fetching exams", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await assignDuty(selectedTeacher, selectedExam);
      showNotification("Duty assigned successfully!", "success");
      setSelectedTeacher("");
      setSelectedExam("");
    } catch (error) {
      console.error("Error assigning duty:", error);
      showNotification("Failed to assign duty", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Clock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Duty Schedule Assignment</h1>
      </div>

      {notification && (
        <div
          className={`alert ${
            notification.type === "error" ? "alert-error" : "alert-success"
          } mb-6`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Select Teacher
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  required
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Select Exam
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  required
                >
                  <option value="">Select an exam</option>
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.subject} - {exam.examDate}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Assigning..." : "Assign Duty"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200 mt-6">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Assignments</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Mathematics</td>
                  <td>2025-01-15</td>
                  <td>
                    <span className="badge badge-success">Assigned</span>
                  </td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Physics</td>
                  <td>2025-01-16</td>
                  <td>
                    <span className="badge badge-success">Assigned</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
