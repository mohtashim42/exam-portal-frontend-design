"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  Calendar,
  User,
  Download,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";

export default function ReviewPapers() {
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Advanced Database Systems",
      subject: "Computer Science",
      department: "Information Technology",
      submittedBy: "Dr. Sarah Johnson",
      submittedDate: "2024-03-15",
      abstract:
        "This paper covers advanced concepts in database management systems, including distributed databases, query optimization, and transaction management.",
      status: "pending",
      fileName: "advanced_db_exam.pdf",
      fileSize: "2.8 MB",
    },
    {
      id: 2,
      title: "Digital Signal Processing",
      subject: "Electronics",
      department: "Electrical Engineering",
      submittedBy: "Prof. Michael Chen",
      submittedDate: "2024-03-14",
      abstract:
        "Comprehensive examination of digital signal processing techniques, including Fourier analysis and filter design.",
      status: "pending",
      fileName: "dsp_final.pdf",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      subject: "Artificial Intelligence",
      department: "Computer Science",
      submittedBy: "Dr. Emily Williams",
      submittedDate: "2024-03-13",
      abstract:
        "Assessment covering core machine learning concepts, algorithms, and practical applications.",
      status: "pending",
      fileName: "ml_exam.pdf",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [feedback, setFeedback] = useState("");
  // Get unique departments for filter
  const departments = [
    "all",
    ...new Set(papers.map((paper) => paper.department)),
  ];
  const handleApprove = async (paperId) => {
    if (!feedback.trim()) {
      alert("Please provide feedback before approving");
      return;
    }
    // Implementation for paper approval
    console.log("Approving paper:", paperId, "with feedback:", feedback);
  };
  const handleReject = async (paperId) => {
    if (!feedback.trim()) {
      alert("Please provide feedback before rejecting");
      return;
    }
    // Implementation for paper rejection
    console.log("Rejecting paper:", paperId, "with feedback:", feedback);
  };
  const filteredPapers = papers
    .filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || paper.status === filterStatus;
      const matchesDepartment =
        filterDepartment === "all" || paper.department === filterDepartment;
      return matchesSearch && matchesStatus && matchesDepartment;
    })
    .sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.submittedDate) - new Date(a.submittedDate)
        : new Date(a.submittedDate) - new Date(b.submittedDate)
    );
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white">
          Paper Review Dashboard
        </h1>
        <p className="text-purple-100">Review and approve examination papers</p>
      </div>
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search papers by title or author..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-full"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          className="select select-bordered w-full"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept.charAt(0).toUpperCase() + dept.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {/* Papers List */}
      <div className="space-y-4">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="card-title text-primary flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {paper.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-base-content/70">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {paper.submittedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {paper.submittedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {paper.fileSize}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="badge badge-primary">{paper.subject}</div>
                  <div className="badge badge-secondary">
                    {paper.department}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="flex items-center gap-2 text-primary hover:underline"
                  onClick={() =>
                    setExpandedPaper(
                      expandedPaper === paper.id ? null : paper.id
                    )
                  }
                >
                  {expandedPaper === paper.id ? <ChevronUp /> : <ChevronDown />}
                  {expandedPaper === paper.id ? "Show Less" : "Show More"}
                </button>
                {expandedPaper === paper.id && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-base-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Abstract</h3>
                      <p className="text-base-content/70">{paper.abstract}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="btn btn-outline btn-primary gap-2">
                        <Download size={16} />
                        Download Paper
                      </button>
                    </div>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Enter your feedback here..."
                        className="textarea textarea-bordered w-full h-32"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => handleApprove(paper.id)}
                          className="btn btn-success gap-2"
                        >
                          <CheckCircle size={16} />
                          Approve Paper
                        </button>
                        <button
                          onClick={() => handleReject(paper.id)}
                          className="btn btn-error gap-2"
                        >
                          <XCircle size={16} />
                          Reject Paper
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
