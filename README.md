# Globio – German A1 Exam Readiness Checker

A full-stack web application that helps German language learners assess their readiness before booking a Goethe or ÖSD A1 examination.

---

## Problem Statement

Many learners complete A1 lessons and book their examinations without knowing whether they are adequately prepared. Failed attempts waste examination fees and time. This tool gives learners a clear, skill-by-skill readiness indicator so they can make an informed decision before booking.

---

## Features

- 12-question multiple-choice assessment (vocabulary, grammar, reading)
- Skill-by-skill performance breakdown
- Weighted overall readiness score
- Personalised recommendations based on actual mistakes
- Fully responsive on desktop, tablet, and mobile
- No registration, no payment, no data stored

---

## Technology Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18 + Vite + Tailwind CSS          |
| Routing   | React Router v6                         |
| Icons     | Lucide React                            |
| Backend   | Python 3.11 + FastAPI + Pydantic        |
| Server    | Uvicorn                                 |
| Data      | JSON file (no database)                 |
| API       | REST (JSON over HTTP)                   |

---

## Architecture

```
Browser
  │
  │  HTTP (fetch)
  ▼
React SPA (Vite)          FastAPI Backend
┌─────────────────┐       ┌──────────────────────────┐
│ Home            │──────▶│ GET  /api/health          │
│ Assessment      │──────▶│ GET  /api/questions       │
│ Results         │──────▶│ POST /api/submit          │
└─────────────────┘       │                          │
                          │ services/scoring.py       │
                          │ services/recommendations  │
                          │ data/questions.json       │
                          └──────────────────────────┘
```

---

## Project Structure

```
globio-a1-readiness/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── OptionButton.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   └── RecommendationCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Assessment.jsx
│   │   │   ├── Results.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/assessment.py
│   │   ├── services/scoring.py
│   │   ├── services/recommendations.py
│   │   ├── schemas/assessment.py
│   │   └── data/questions.json
│   ├── tests/
│   │   ├── test_scoring.py
│   │   └── test_api.py
│   └── requirements.txt
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- Python 3.11+

### Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at http://localhost:5173 and the backend at http://localhost:8000.

---

## Environment Variables

### frontend/.env

```
VITE_API_BASE_URL=http://localhost:8000
```

### backend/.env

```
ALLOWED_ORIGINS=http://localhost:5173
```

For production, set `VITE_API_BASE_URL` to your deployed backend URL and `ALLOWED_ORIGINS` to your deployed frontend URL.

---

## API Documentation

### GET /api/health

Returns the API health status.

**Response**
```json
{ "status": "healthy" }
```

---

### GET /api/questions

Returns all 12 questions without correct answers or explanations.

**Response** (truncated)
```json
[
  {
    "id": "V01",
    "skill": "vocabulary",
    "topic": "food",
    "question_text": "What does the German word 'der Apfel' mean?",
    "options": { "A": "Orange", "B": "Apple", "C": "Banana", "D": "Bread" },
    "difficulty": "beginner"
  }
]
```

---

### POST /api/submit

Submits all 12 answers and returns scored results.

**Request body**
```json
{
  "answers": [
    { "question_id": "V01", "selected_option": "B" },
    { "question_id": "V02", "selected_option": "C" }
  ]
}
```

**Validation rules**
- Exactly 12 answers required
- Each `question_id` must be a valid ID from the question bank
- No duplicate `question_id` values
- `selected_option` must be one of A, B, C, D

**Response**
```json
{
  "overall_score": 83,
  "readiness_status": "Ready for Further Exam Preparation",
  "total_questions": 12,
  "correct_answers": 10,
  "incorrect_answers": 2,
  "skills": {
    "vocabulary": { "score": 100, "correct": 4, "total": 4, "status": "Strong" },
    "grammar":    { "score": 75,  "correct": 3, "total": 4, "status": "Developing" },
    "reading":    { "score": 75,  "correct": 3, "total": 4, "status": "Developing" }
  },
  "recommendations": [
    {
      "topic": "German Prepositions",
      "reason": "You missed 1 question on this topic.",
      "action": "Study common German prepositions: auf, in, mit, bei, an, and their usage."
    }
  ]
}
```

---

## Scoring Methodology

Scores are calculated entirely on the server. The frontend never sees correct answers.

### Per-skill score

```
skill_score = (correct_answers / total_questions_in_skill) × 100
```

### Overall weighted score

| Skill      | Weight |
|------------|--------|
| Vocabulary | 30%    |
| Grammar    | 30%    |
| Reading    | 40%    |

```
overall_score = (vocabulary_score × 0.30) + (grammar_score × 0.30) + (reading_score × 0.40)
```

### Readiness status thresholds

| Score     | Status                             |
|-----------|------------------------------------|
| 80–100    | Ready for Further Exam Preparation |
| 60–79     | Almost Ready                       |
| 0–59      | Needs More Practice                |

### Skill status thresholds

| Score  | Status            |
|--------|-------------------|
| 80–100 | Strong            |
| 60–79  | Developing        |
| 0–59   | Needs Improvement |

---

## Recommendation Logic

After scoring, the backend identifies which question topics the learner answered incorrectly. It sorts those topics by mistake count (highest first) and returns up to three targeted recommendations, each with a specific action tip. If all answers are correct, a single positive message is returned.

---

## Running Tests

```bash
cd backend
python -m pytest tests/ -v
```

The test suite covers:
- All-correct scoring produces 100%
- All-incorrect scoring produces 0%
- Mixed scores and correct weighting arithmetic
- Readiness and skill status boundary conditions
- API health, questions endpoint, and submission validation

---

## Deployment

### Frontend — Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Set the root directory to `frontend`.
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`
5. Deploy.

### Backend — Render

1. Create a new Web Service in Render.
2. Set the root directory to `backend`.
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `ALLOWED_ORIGINS=https://your-frontend.vercel.app`
6. Deploy.

---

## Known Limitations

- Listening and speaking skills are not tested; they are required for the real A1 exam.
- The question bank is small (12 questions); scores should be interpreted as indicative only.
- No question randomisation in the current version.
- This tool is not affiliated with Goethe-Institut or ÖSD.

---

## Potential Future Improvements

- Expand the question bank to 30–50 questions with random sampling per session.
- Add listening comprehension using audio clips.
- Add a timer option for exam simulation.
- Support multiple languages for instructions (Hindi, Turkish, Arabic).
- Track progress across sessions using local storage.
