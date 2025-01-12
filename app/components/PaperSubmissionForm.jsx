"use client";

import { useState } from "react";
import { submitPaper } from "../lib/api";

export default function PaperSubmissionForm() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitPaper({ title, subject, content });
      alert("Paper submitted successfully!");
      setTitle("");
      setSubject("");
      setContent("");
    } catch (error) {
      console.error("Error submitting paper:", error);
      alert("Failed to submit paper. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Paper Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter paper title"
          className="input input-bordered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          <span className="label-text">Paper Content</span>
        </label>
        <textarea
          placeholder="Enter paper content"
          className="textarea textarea-bordered h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Submit Paper
        </button>
      </div>
    </form>
  );
}
