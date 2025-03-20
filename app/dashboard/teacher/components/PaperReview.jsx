"use client";

import { useState, useEffect } from "react";
// import { getTeacherExamPapers } from "@/app/lib/api";
import {
  FileText,
  Book,
  MessageSquare,
  Eye,
  AlertCircle,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
} from "lucide-react";

// First, import the downloadPaper function and toast
import { getTeacherExamPapers, downloadPaper } from "@/app/lib/api";
import { toast } from "react-hot-toast";

export default function SubmittedPapersScreen() {
  // Add filter options
  const statusOptions = ["All", "Pending", "Approved", "Rejected"];
  const departmentOptions = [
    "All",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Economics",
  ];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "alphabetical", label: "Alphabetical" },
  ];

  // Existing state declarations
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [expandedPaperId, setExpandedPaperId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchExamPapers();
  }, []);

  // Add handleDownload function inside the component
  const handleDownload = async (paperId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      setIsLoading(true);
      await downloadPaper(paperId);
      toast.success("Paper downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download paper");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExamPapers = async () => {
    try {
      setIsLoading(true);
      const response = await getTeacherExamPapers();

      if (response.success) {
        setStats(response.stats);
        setPapers(response.papers);
        setFilteredPapers(response.papers);
      } else {
        throw new Error("Failed to fetch papers");
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch exam papers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update filter logic based on API response structure
  useEffect(() => {
    if (!Array.isArray(papers)) return;

    let filtered = [...papers];

    try {
      if (searchTerm) {
        filtered = filtered.filter(
          (paper) =>
            paper?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper?.department?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (paper) => paper?.status?.toLowerCase() === statusFilter
        );
      }

      if (departmentFilter !== "all") {
        filtered = filtered.filter(
          (paper) => paper?.department?.toLowerCase() === departmentFilter
        );
      }

      filtered.sort((a, b) => {
        if (sortBy === "newest") {
          return (
            new Date(b?.submittedDate || 0) - new Date(a?.submittedDate || 0)
          );
        }
        return (
          new Date(a?.submittedDate || 0) - new Date(b?.submittedDate || 0)
        );
      });

      setFilteredPapers(filtered);
    } catch (err) {
      console.error("Error filtering papers:", err);
      setFilteredPapers([]);
    }
  }, [papers, searchTerm, statusFilter, departmentFilter, sortBy]);

  // Update the papers list rendering
  const renderPaperCard = (paper) => (
    <div
      key={paper.id}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">{paper.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              paper.status === "pending"
                ? "bg-yellow-900/50 text-yellow-300"
                : paper.status === "approved"
                ? "bg-green-900/50 text-green-300"
                : "bg-red-900/50 text-red-300"
            }`}
          >
            {paper.status}
          </span>
        </div>

        <div className="mt-2 text-gray-400 text-sm">
          <p>Department: {paper.department}</p>
          <p>Submitted: {new Date(paper.submittedDate).toLocaleDateString()}</p>
        </div>

        {paper.pdfFile && (
          <div className="mt-3 flex items-center gap-2">
            <FileText size={16} className="text-purple-400" />
            <span className="text-sm text-gray-300">
              {paper.pdfFile.filename}
            </span>
            <span className="text-xs text-gray-500">
              ({paper.pdfFile.size} bytes)
            </span>
          </div>
        )}

        {paper.feedback && (
          <div className="mt-3 p-3 bg-gray-700/30 rounded-lg">
            <p className="text-sm text-gray-300">{paper.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error">
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedPaperId(expandedPaperId === id ? null : id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={16} className="text-green-400" />;
      case "Rejected":
        return <XCircle size={16} className="text-red-400" />;
      case "Pending":
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg text-purple-400"></div>
          <p className="text-purple-300">Loading your submitted papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with original purple gradient */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden">
          {/* Background decoration elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 opacity-10 rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10 flex items-start md:items-center justify-between flex-col md:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="bg-purple-800/50 p-2 rounded-lg">
                  <Eye size={28} className="text-purple-200" />
                </div>
                Academic Papers Review Dashboard
              </h2>
              <p className="text-purple-100 mt-3 max-w-2xl">
                Track the status of your submitted papers and review feedback
                from the department. Use the filters below to organize your
                submissions.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3 bg-purple-800/30 px-4 py-2 rounded-lg">
              <div className="text-right">
                <div className="text-purple-200 font-semibold">
                  {papers.length} Papers
                </div>
                <div className="text-purple-300 text-sm">
                  {papers.filter((p) => p.status === "Approved").length}{" "}
                  Approved •
                  {papers.filter((p) => p.status === "Pending").length} Pending
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-600/50 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-purple-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search papers by title or abstract..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
                  <Filter size={16} className="text-purple-400" />
                  <select
                    className="bg-transparent text-white focus:outline-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
                  <Book size={16} className="text-purple-400" />
                  <select
                    className="bg-transparent text-white focus:outline-none"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
                  <Clock size={16} className="text-purple-400" />
                  <select
                    className="bg-transparent text-white focus:outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-gray-400">
            Showing {filteredPapers.length} of {papers.length} papers
          </div>
        </div>

        {/* Papers List */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          {filteredPapers.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <AlertCircle size={48} className="mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">
                No matching papers found
              </h3>
              <p className="text-gray-400 mt-2">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-200 hover:border-purple-600"
              >
                <div
                  className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(paper.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        paper.status === "Approved"
                          ? "bg-green-900/30 text-green-400"
                          : paper.status === "Rejected"
                          ? "bg-red-900/30 text-red-400"
                          : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {getStatusIcon(paper.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="text-gray-400">{paper.subject}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">
                          Submitted:{" "}
                          {new Date(paper.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        paper.status === "Approved"
                          ? "bg-green-900/50 text-green-300"
                          : paper.status === "Rejected"
                          ? "bg-red-900/50 text-red-300"
                          : "bg-yellow-900/50 text-yellow-300"
                      }`}
                    >
                      {paper.status}
                    </span>
                    {expandedPaperId === paper.id ? (
                      <ChevronUp size={20} className="text-purple-400" />
                    ) : (
                      <ChevronDown size={20} className="text-purple-400" />
                    )}
                  </div>
                </div>

                {expandedPaperId === paper.id && (
                  <div className="p-6 border-t border-gray-700 bg-gray-800/70">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 flex items-center gap-2 mb-2">
                          <MessageSquare
                            size={16}
                            className="text-purple-400"
                          />{" "}
                          Abstract
                        </h4>
                        <p className="text-white text-sm leading-relaxed">
                          {paper.abstract}
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-md font-semibold text-purple-300 flex items-center gap-2 mb-2">
                            <Upload size={16} className="text-purple-400" /> Submitted File
                          </h4>
                          <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                            <FileText size={18} className="text-purple-400" />
                            <div className="flex-1">
                              <span className="text-white text-sm">
                                {paper.pdfFile?.filename || paper.fileName || "Document.pdf"}
                              </span>
                              <span className="text-gray-400 text-xs ml-2">
                                {paper.pdfFile?.size
                                  ? `(${(paper.pdfFile.size / 1024 / 1024).toFixed(2)} MB)`
                                  : paper.fileSize
                                  ? `(${paper.fileSize})`
                                  : ""}
                              </span>
                            </div>
                            <button
                              onClick={(e) => handleDownload(paper.id, e)}
                              className="ml-auto p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-colors"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="animate-spin">
                                  <Clock size={16} className="text-purple-400" />
                                </div>
                              ) : (
                                <Download size={16} className="text-purple-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-md font-semibold text-purple-300 flex items-center gap-2 mb-2">
                            <AlertCircle
                              size={16}
                              className="text-purple-400"
                            />{" "}
                            Reviewer Feedback
                          </h4>
                          <div
                            className={`p-4 rounded-lg ${
                              paper.status === "Approved"
                                ? "bg-green-900/20 border border-green-900"
                                : paper.status === "Rejected"
                                ? "bg-red-900/20 border border-red-900"
                                : "bg-yellow-900/20 border border-yellow-900"
                            }`}
                          >
                            {paper.feedback ? (
                              <p className="text-white text-sm">
                                {paper.feedback}
                              </p>
                            ) : (
                              <p className="text-gray-400 text-sm italic">
                                No feedback provided yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
