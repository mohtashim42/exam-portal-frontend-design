"use client";

import { useState, useEffect } from "react";
import { getPendingPapers, approvePaper, rejectPaper } from "../lib/api";

export default function PaperApprovalList() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetchPendingPapers();
  }, []);

  const fetchPendingPapers = async () => {
    try {
      const pendingPapers = await getPendingPapers();
      setPapers(pendingPapers);
    } catch (error) {
      console.error("Error fetching pending papers:", error);
    }
  };

  const handleApprove = async (paperId) => {
    try {
      await approvePaper(paperId);
      alert("Paper approved successfully!");
      fetchPendingPapers();
    } catch (error) {
      console.error("Error approving paper:", error);
      alert("Failed to approve paper. Please try again.");
    }
  };

  const handleReject = async (paperId, comment) => {
    try {
      await rejectPaper(paperId, comment);
      alert("Paper rejected successfully!");
      fetchPendingPapers();
    } catch (error) {
      console.error("Error rejecting paper:", error);
      alert("Failed to reject paper. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Submitted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((paper) => (
            <tr key={paper.id}>
              <td>{paper.title}</td>
              <td>{paper.subject}</td>
              <td>{paper.submittedBy}</td>
              <td>
                <button
                  className="btn btn-sm btn-success mr-2"
                  onClick={() => handleApprove(paper.id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => {
                    const comment = prompt("Enter rejection reason:");
                    if (comment) handleReject(paper.id, comment);
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
