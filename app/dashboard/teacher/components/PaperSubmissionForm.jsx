"use client";

import { useState } from "react";
import {
  FileText,
  Book,
  MessageSquare,
  Upload,
  Check,
  AlertCircle,
} from "lucide-react";
// import { submitPaper } from "../lib/api";

export default function PaperSubmissionForm() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setFileError("Please upload a PDF file only");
        setFile(null);
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB limit
        setFileError("File size must be less than 10MB");
        setFile(null);
        return;
      }

      setFileError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would handle the file upload
      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("subject", subject);
      // formData.append("content", content);
      // if (file) formData.append("file", file);

      // await submitPaper(formData);

      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setTimeout(() => {
        setTitle("");
        setSubject("");
        setContent("");
        setFile(null);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting paper:", error);
      alert("Failed to submit paper. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <FileText className="mr-2" />
            Academic Paper Submission
          </h2>
          <p className="text-purple-100 mt-2">
            Please complete all fields and upload your paper in PDF format
          </p>
        </div>

        <div className="p-8">
          {submitSuccess ? (
            <div className="bg-green-900 p-8 rounded-lg text-center my-8">
              <Check size={64} className="mx-auto text-green-400 mb-4" />
              <h3 className="text-2xl font-semibold text-green-300">
                Paper Submitted Successfully!
              </h3>
              <p className="text-green-400 mt-2">
                Your paper has been received and will be reviewed soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Paper Title */}
              <div className="form-control">
                <label className="block mb-2">
                  <span className="text-purple-300 font-medium flex items-center gap-2">
                    <FileText size={18} className="text-purple-400" /> Paper
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your paper title"
                  className="w-full bg-gray-700 border-2 border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 rounded-lg p-3 text-white transition-all duration-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="block mb-2">
                  <span className="text-purple-300 font-medium flex items-center gap-2">
                    <Book size={18} className="text-purple-400" /> Subject Area
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science, Mathematics, Physics"
                  className="w-full bg-gray-700 border-2 border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 rounded-lg p-3 text-white transition-all duration-200"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              {/* Paper Content */}
              <div className="form-control">
                <label className="block mb-2">
                  <span className="text-purple-300 font-medium flex items-center gap-2">
                    <MessageSquare size={18} className="text-purple-400" />{" "}
                    Abstract
                  </span>
                </label>
                <textarea
                  placeholder="Provide a brief abstract of your paper"
                  className="w-full bg-gray-700 border-2 border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 rounded-lg p-3 h-40 text-white transition-all duration-200"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* File Upload Section */}
              <div className="form-control">
                <label className="block mb-2">
                  <span className="text-purple-300 font-medium flex items-center gap-2">
                    <Upload size={18} className="text-purple-400" /> Upload
                    Paper (PDF)
                  </span>
                </label>

                <div className="bg-gray-750 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-lg p-10 text-center transition-all">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-3"
                  >
                    <Upload size={40} className="text-purple-400" />
                    <span className="text-purple-200 font-medium text-lg">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-sm text-purple-400">
                      PDF only (max 10MB)
                    </span>
                  </label>

                  {file && (
                    <div className="mt-6 bg-gray-700 p-4 rounded-md flex items-center gap-3">
                      <FileText size={20} className="text-purple-400" />
                      <span className="text-purple-200 font-medium truncate">
                        {file.name}
                      </span>
                      <span className="text-purple-400 text-sm">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}

                  {fileError && (
                    <div className="mt-4 text-red-400 flex items-center gap-2">
                      <AlertCircle size={18} />
                      <span>{fileError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting || !!fileError}
                  className={`w-full ${
                    isSubmitting
                      ? "bg-purple-800"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  } text-white py-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText size={20} />
                      Submit Paper
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-sm mt-6">
                  By submitting, you agree to our terms and conditions for paper
                  submissions
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
