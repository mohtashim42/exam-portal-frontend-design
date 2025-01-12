"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";

export default function SubmitExam() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/exams/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({ title, subject, department, fileUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Exam paper submitted successfully");
        setTitle("");
        setSubject("");
        setDepartment("");
        setFileUrl("");
      } else {
        alert(data.msg || "Failed to submit exam paper");
      }
    } catch (error) {
      console.error("Submit exam error:", error);
      alert("An error occurred while submitting the exam paper");
    }
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Submit Exam Paper</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="input input-bordered w-full"
              id="title"
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className="input input-bordered w-full"
              id="subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <input
              className="input input-bordered w-full"
              id="department"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fileUrl"
            >
              File URL
            </label>
            <input
              className="input input-bordered w-full"
              id="fileUrl"
              type="url"
              placeholder="https://example.com/exam_paper.pdf"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn btn-primary" type="submit">
              Submit Exam Paper
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
