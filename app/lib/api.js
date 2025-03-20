import { getToken } from "./auth";

const API_URL = "http://localhost:3001/api";

async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
}

// Teacher functions
export async function submitPaper(formData) {
  const token = getToken();
  try {
    // Validate formData
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    // Validate required fields
    const requiredFields = ["title", "subject", "abstract", "department"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate file - changed from 'file' to 'pdfFile'
    const file = formData.get("pdfFile");
    if (!file || !(file instanceof File)) {
      throw new Error("PDF file is required");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    // Debug logging
    console.log("Submitting form data:", {
      fileInfo: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
      fields: {
        title: formData.get("title"),
        subject: formData.get("subject"),
        abstract: formData.get("abstract"),
        department: formData.get("department"),
      },
    });

    const response = await fetch(`${API_URL}/exams/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // Handle non-OK responses
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit paper");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }
    }

    // Handle successful response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error("Paper submission failed:", error.message);
    throw error;
  }
}

export async function getTeacherPapers() {
  return authFetch(`${API_URL}/papers/teacher`);
}

// HOD functions
export async function getPendingPapers() {
  return authFetch(`${API_URL}/papers/pending`);
}

export async function approvePaper(paperId) {
  return authFetch(`${API_URL}/papers/${paperId}/approve`, {
    method: "PUT",
  });
}

export async function rejectPaper(paperId, comment) {
  return authFetch(`${API_URL}/papers/${paperId}/reject`, {
    method: "PUT",
    body: JSON.stringify({ comment }),
  });
}

// Exam Controller functions
export async function createTimetable(timetableData) {
  return authFetch(`${API_URL}/timetables`, {
    method: "POST",
    body: JSON.stringify(timetableData),
  });
}

export async function getTimetables() {
  return authFetch(`${API_URL}/timetables`);
}

export async function getTeachers() {
  return authFetch(`${API_URL}/users/teachers`);
}

export async function getExams() {
  return authFetch(`${API_URL}/exams`);
}

export async function assignDuty(teacherId, examId) {
  return authFetch(`${API_URL}/duties`, {
    method: "POST",
    body: JSON.stringify({ teacherId, examId }),
  });
}

export async function getTeacherDuties() {
  return authFetch(`${API_URL}/duties/teacher`);
}

// Bundle record functions
export async function assignBundle(teacherId, bundleData) {
  return authFetch(`${API_URL}/bundles`, {
    method: "POST",
    body: JSON.stringify({ teacherId, ...bundleData }),
  });
}

export async function getTeacherBundles() {
  return authFetch(`${API_URL}/bundles/teacher`);
}

export async function updateBundleStatus(bundleId, status) {
  return authFetch(`${API_URL}/bundles/${bundleId}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function getTeacherExamPapers() {
  try {
    const response = await fetch(`${API_URL}/exams/papers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch exam papers");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching exam papers:", error);
    throw error;
  }
}

// Fix the getHodPapers function
export async function getHodPapers() {
  try {
    const response = await fetch(`${API_URL}/exams/hod/papers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch papers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching HOD papers:", error);
    throw error;
  }
}

// Review paper (approve/reject)
// Fix the reviewPaper function
export async function reviewPaper(paperId, status, feedback) {
  if (!paperId) {
    throw new Error("Paper ID is required");
  }

  try {
    const response = await fetch(`${API_URL}/exams/review/${paperId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        status: status,
        feedback: feedback,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to ${status} paper`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reviewing paper:", error);
    throw error;
  }
}

export async function approveHodPaper(paperId, feedback) {
  return authFetch(`${API_URL}/exams/hod/papers/${paperId}/approve`, {
    method: "PUT",
    body: JSON.stringify({ feedback }),
  });
}

export async function rejectHodPaper(paperId, feedback) {
  return authFetch(`${API_URL}/exams/hod/papers/${paperId}/reject`, {
    method: "PUT",
    body: JSON.stringify({ feedback }),
  });
}

// Add this new function to handle paper downloads
export async function downloadPaper(paperId) {
  try {
    const response = await fetch(
      `${API_URL}/exams/papers/download/${paperId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download paper");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `paper-${paperId}.pdf`; // You can customize the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}
