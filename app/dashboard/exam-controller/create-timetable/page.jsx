"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Building2,
  Plus,
  Trash2,
  Save,
  BookOpen,
  GraduationCap,
  MapPin,
  AlertCircle,
} from "lucide-react";

export default function CreateTimetable() {
  const [examSchedule, setExamSchedule] = useState([
    {
      course: "",
      subject: "",
      department: "",
      date: "",
      startTime: "",
      endTime: "",
      room: "",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddExam = () => {
    setExamSchedule([
      ...examSchedule,
      {
        course: "",
        subject: "",
        department: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
      },
    ]);
  };

  const handleRemoveExam = (index) => {
    const updatedSchedule = examSchedule.filter((_, i) => i !== index);
    setExamSchedule(updatedSchedule);
  };

  const handleExamChange = (index, field, value) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[index][field] = value;
    setExamSchedule(updatedSchedule);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call implementation here
      console.log("Submitting exam schedule:", examSchedule);
      alert("Timetable created successfully!");
    } catch (error) {
      console.error("Error creating timetable:", error);
      alert("Failed to create timetable. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          Create Examination Timetable
        </h1>
        <p className="text-indigo-100">
          Schedule multiple examinations with detailed information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {examSchedule.map((exam, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all"
          >
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Exam {index + 1}
                </h3>
                {examSchedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExam(index)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Course
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., B.Tech"
                    className="input input-bordered"
                    value={exam.course}
                    onChange={(e) =>
                      handleExamChange(index, "course", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Subject
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Data Structures"
                    className="input input-bordered"
                    value={exam.subject}
                    onChange={(e) =>
                      handleExamChange(index, "subject", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Department
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
                    className="input input-bordered"
                    value={exam.department}
                    onChange={(e) =>
                      handleExamChange(index, "department", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> Date
                    </span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={exam.date}
                    onChange={(e) =>
                      handleExamChange(index, "date", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Time Slot
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      className="input input-bordered flex-1"
                      value={exam.startTime}
                      onChange={(e) =>
                        handleExamChange(index, "startTime", e.target.value)
                      }
                      required
                    />
                    <input
                      type="time"
                      className="input input-bordered flex-1"
                      value={exam.endTime}
                      onChange={(e) =>
                        handleExamChange(index, "endTime", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Room
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Room 101"
                    className="input input-bordered"
                    value={exam.room}
                    onChange={(e) =>
                      handleExamChange(index, "room", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-4 justify-between">
          <button
            type="button"
            onClick={handleAddExam}
            className="btn btn-outline btn-primary"
          >
            <Plus className="w-4 h-4" /> Add Another Exam
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Save className="w-4 h-4" />
            )}
            Create Timetable
          </button>
        </div>
      </form>

      <div className="mt-6 card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Important Notes</h3>
              <ul className="list-disc list-inside text-base-content/70 mt-2 space-y-1">
                <li>Ensure no time slot conflicts for the same department</li>
                <li>Check room availability before scheduling</li>
                <li>Maintain minimum gap between exams</li>
                <li>Consider department-specific requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}