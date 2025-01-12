"use client";

import { useState, useEffect } from "react";
import { getTeachers, getExams, assignDuty } from "../lib/api";

export default function DutyScheduleForm() {
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

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
    }
  };

  const fetchExams = async () => {
    try {
      const examList = await getExams();
      setExams(examList);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignDuty(selectedTeacher, selectedExam);
      alert("Duty assigned successfully!");
      setSelectedTeacher("");
      setSelectedExam("");
    } catch (error) {
      console.error("Error assigning duty:", error);
      alert("Failed to assign duty. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Select Teacher</span>
        </label>
        <select
          className="select select-bordered"
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
          <span className="label-text">Select Exam</span>
        </label>
        <select
          className="select select-bordered"
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
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Assign Duty
        </button>
      </div>
    </form>
  );
}
