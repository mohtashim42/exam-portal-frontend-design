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
import { toast } from "react-hot-toast";
import {
  getHodPapers,
  approveHodPaper,
  rejectHodPaper,
  downloadPaper,
} from "@/app/lib/api";

const ReviewPapers = () => {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchPapers();
  }, []);

  // Update the fetchPapers function
  const fetchPapers = async () => {
    try {
      setIsLoading(true);
      const response = await getHodPapers();
      console.log("API Response:", response); // Debug log

      if (response && Array.isArray(response.papers)) {
        setPapers(response.papers);
      } else {
        console.error("Invalid response format:", response);
        setPapers([]);
      }
    } catch (error) {
      console.error("Error fetching papers:", error);
      toast.error(error.message || "Failed to fetch papers");
      setPapers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (paperId, status) => {
    if (!paperId) {
      toast.error("Invalid paper ID");
      return;
    }

    if (!feedback.trim()) {
      toast.error(`Please provide feedback before ${status}`);
      return;
    }

    try {
      setIsLoading(true);
      let result;

      if (status.toLowerCase() === "approved") {
        result = await approveHodPaper(paperId, feedback);
      } else if (status.toLowerCase() === "rejected") {
        result = await rejectHodPaper(paperId, feedback);
      }

      if (result) {
        toast.success(`Paper ${status} successfully`);
        await fetchPapers(); // Refresh the papers list
        setFeedback("");
        setExpandedPaper(null);
      }
    } catch (error) {
      console.error("Review error:", error);
      toast.error(error.message || `Failed to ${status} paper`);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPapers = papers
    .filter((paper) => {
      const matchesSearch =
        (paper?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (paper?.submittedBy?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || paper?.status === filterStatus;
      const matchesDepartment =
        filterDepartment === "all" || paper?.department === filterDepartment;
      return matchesSearch && matchesStatus && matchesDepartment;
    })
    .sort(
      (a, b) =>
        new Date(b?.submittedDate || 0) - new Date(a?.submittedDate || 0)
    );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }
  // Add handleDownload function at the top of the component
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Paper Reviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/60">Total Papers</p>
            <p className="text-2xl font-bold text-white">{papers.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/60">Pending Review</p>
            <p className="text-2xl font-bold text-white">
              {papers.filter((p) => p.status === "pending").length}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/60">Approved Papers</p>
            <p className="text-2xl font-bold text-white">
              {papers.filter((p) => p.status === "approved").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search papers..."
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          className="select select-bordered w-full"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          {[...new Set(papers.map((p) => p?.department).filter(Boolean))].map(
            (dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            )
          )}
        </select>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-lg">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold">No papers found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredPapers.map((paper) => (
            <div
              key={paper._id}
              className="bg-base-100 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <FileText className="text-primary" />
                      {paper.title}
                    </h2>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="text-primary" />
                        <span>{paper.submittedBy?.name || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary" />
                        <span>
                          {paper.submittedDate
                            ? new Date(paper.submittedDate).toLocaleDateString()
                            : "No date"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="text-primary" />
                        <span>{paper.subject || "No subject"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary" />
                        <span>{paper.department || "No department"}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`badge ${
                      paper.status === "pending"
                        ? "badge-warning"
                        : paper.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    } badge-lg`}
                  >
                    {paper.status
                      ? paper.status.charAt(0).toUpperCase() +
                        paper.status.slice(1)
                      : "Unknown"}
                  </span>
                </div>

                {expandedPaper === paper._id && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-base-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Abstract</h3>
                      <p className="text-sm">
                        {paper.abstract || "No abstract available"}
                      </p>
                    </div>

                    {paper.pdfFile && (
                      <div className="flex items-center justify-between bg-base-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="text-primary" />
                          <div>
                            <p className="font-medium">
                              {paper.pdfFile.filename || "Paper Document"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {paper.pdfFile.size
                                ? `${(paper.pdfFile.size / 1024 / 1024).toFixed(
                                    2
                                  )} MB`
                                : "Size unknown"}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleDownload(paper.id, e)}
                          className="ml-auto p-4 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-colors"
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
                    )}

                    {paper.status === "pending" && (
                      <div className="bg-base-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Review Paper</h3>
                        <textarea
                          className="textarea textarea-bordered w-full mb-3"
                          placeholder="Enter your feedback..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReview(paper._id, "approved")}
                            className="btn btn-success flex-1 gap-2"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReview(paper._id, "rejected")}
                            className="btn btn-error flex-1 gap-2"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </div>
                      </div>
                    )}

                    {paper.feedback && (
                      <div className="bg-base-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">
                          Previous Feedback
                        </h3>
                        <p className="text-sm">{paper.feedback}</p>
                        {paper.reviewedAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            Reviewed on:{" "}
                            {new Date(paper.reviewedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() =>
                      setExpandedPaper(
                        expandedPaper === paper._id ? null : paper._id
                      )
                    }
                  >
                    {expandedPaper === paper._id ? (
                      <>
                        <ChevronUp size={16} />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        Show More
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPapers;
