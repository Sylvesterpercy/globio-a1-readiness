const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/api/questions`);
  if (!res.ok) {
    throw new Error(`Failed to fetch questions: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function submitAssessment(answers) {
  const payload = {
    answers: Object.entries(answers).map(([question_id, selected_option]) => ({
      question_id,
      selected_option,
    })),
  };
  const res = await fetch(`${BASE_URL}/api/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Submission failed: ${res.status}`);
  }
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/api/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}
