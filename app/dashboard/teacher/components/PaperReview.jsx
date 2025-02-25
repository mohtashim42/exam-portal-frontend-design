"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Book,
  MessageSquare,
  Upload,
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
} from "lucide-react";

export default function SubmittedPapersScreen() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [expandedPaperId, setExpandedPaperId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Simulate an API GET call to fetch submitted papers
  useEffect(() => {
    const fetchSubmittedPapers = async () => {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Sample data: Replace with your actual API response
      const samplePapers = [
        {
          id: 1,
          title: "A Study on Quantum Computing",
          subject: "Computer Science",
          abstract:
            "This paper explores the fundamentals of quantum computing and its potential applications. We analyze the current state of quantum computing research and discuss potential breakthroughs in the near future. The study covers quantum bits, quantum gates, and quantum algorithms that could revolutionize computing as we know it.",
          fileName: "quantum_computing.pdf",
          fileSize: "2.45 MB",
          status: "Approved",
          submittedDate: "2024-02-10",
          feedback: "Excellent work! Minor revisions needed in the conclusion.",
        },
        {
          id: 2,
          title: "Advancements in AI",
          subject: "Information Technology",
          abstract:
            "An in-depth look at the latest advancements in artificial intelligence and machine learning. This paper reviews recent developments in neural networks, deep learning, and natural language processing. We also explore ethical considerations in AI development and implementation.",
          fileName: "ai_advancements.pdf",
          fileSize: "3.12 MB",
          status: "Pending",
          submittedDate: "2024-02-18",
          feedback: "",
        },
        {
          id: 3,
          title: "Renewable Energy Solutions",
          subject: "Environmental Science",
          abstract:
            "A comprehensive overview of renewable energy solutions and their impact on sustainability. This research examines solar, wind, hydro, and geothermal energy sources, comparing their efficiency, cost, and environmental impact. We propose a framework for transitioning to renewable energy on a global scale.",
          fileName: "renewable_energy.pdf",
          fileSize: "1.78 MB",
          status: "Rejected",
          submittedDate: "2024-01-25",
          feedback: "The paper lacks sufficient data analysis and references.",
        },
        {
          id: 4,
          title: "Blockchain Applications in Healthcare",
          subject: "Information Technology",
          abstract:
            "This paper examines the potential applications of blockchain technology in healthcare systems. We analyze how blockchain can improve medical record management, supply chain integrity for pharmaceuticals, and patient data security.",
          fileName: "blockchain_healthcare.pdf",
          fileSize: "2.89 MB",
          status: "Approved",
          submittedDate: "2024-02-05",
          feedback:
            "Well-researched and innovative. Approved with minor edits.",
        },
        {
          id: 5,
          title: "Climate Change Impact on Marine Ecosystems",
          subject: "Environmental Science",
          abstract:
            "A detailed study on the effects of climate change on marine ecosystems. This research documents changes in ocean temperature, acidity, and sea levels, and their impact on coral reefs, marine biodiversity, and coastal communities.",
          fileName: "climate_marine.pdf",
          fileSize: "4.12 MB",
          status: "Pending",
          submittedDate: "2024-02-22",
          feedback: "",
        },
      ];
      setPapers(samplePapers);
      setFilteredPapers(samplePapers);
      setIsLoading(false);
    };

    fetchSubmittedPapers();
  }, []);

  // Get unique subjects for filter
  const subjects = ["All", ...new Set(papers.map((paper) => paper.subject))];

  // Filter papers based on search term and status filter
  useEffect(() => {
    let results = papers;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      results = results.filter((paper) => paper.status === statusFilter);
    }

    // Filter by subject
    if (subjectFilter !== "All") {
      results = results.filter((paper) => paper.subject === subjectFilter);
    }

    // Sort papers
    if (sortBy === "newest") {
      results = [...results].sort(
        (a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)
      );
    } else if (sortBy === "oldest") {
      results = [...results].sort(
        (a, b) => new Date(a.submittedDate) - new Date(b.submittedDate)
      );
    } else if (sortBy === "alphabetical") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredPapers(results);
  }, [searchTerm, statusFilter, subjectFilter, sortBy, papers]);

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
                    <option value="All">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
                  <Book size={16} className="text-purple-400" />
                  <select
                    className="bg-transparent text-white focus:outline-none"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
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
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">Alphabetical</option>
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
                            <Upload size={16} className="text-purple-400" />{" "}
                            Submitted File
                          </h4>
                          <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                            <FileText size={18} className="text-purple-400" />
                            <span className="text-white text-sm">
                              {paper.fileName}
                            </span>
                            <span className="text-gray-400 text-xs">
                              ({paper.fileSize})
                            </span>
                            <button className="ml-auto p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-colors">
                              <Download size={16} className="text-purple-400" />
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
