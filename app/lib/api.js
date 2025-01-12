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
export async function submitPaper(paperData) {
  return authFetch(`${API_URL}/papers`, {
    method: "POST",
    body: JSON.stringify(paperData),
  });
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
