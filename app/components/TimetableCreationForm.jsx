"use client";

import { useState } from "react";
import { createTimetable } from "../lib/api";

export default function TimetableCreationForm() {
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subject, setSubject] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTimetable({ examDate, startTime, endTime, subject, venue });
      alert("Timetable created successfully!");
      setExamDate("");
      setStartTime("");
      setEndTime("");
      setSubject("");
      setVenue("");
    } catch (error) {
      console.error("Error creating timetable:", error);
      alert("Failed to create timetable. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Exam Date</span>
        </label>
        <input
          type="date"
          className="input input-bordered"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Start Time</span>
        </label>
        <input
          type="time"
          className="input input-bordered"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">End Time</span>
        </label>
        <input
          type="time"
          className="input input-bordered"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Subject</span>
        </label>
        <input
          type="text"
          placeholder="Enter subject"
          className="input input-bordered"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Venue</span>
        </label>
        <input
          type="text"
          placeholder="Enter venue"
          className="input input-bordered"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Create Timetable
        </button>
      </div>
    </form>
  );
}
