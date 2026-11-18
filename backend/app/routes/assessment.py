from fastapi import APIRouter, HTTPException, Request
from typing import List
from ..schemas.assessment import SubmissionRequest
from ..services.scoring import calculate_skill_scores, calculate_overall_score, get_readiness_status
from ..services.recommendations import generate_recommendations

router = APIRouter()


@router.get('/health')
async def health_check():
    return {'status': 'healthy'}


@router.get('/questions')
async def get_questions(request: Request):
    questions = request.app.state.questions
    public_questions = []
    for q in questions:
        pub = {k: v for k, v in q.items() if k not in ('correct_answer', 'explanation')}
        public_questions.append(pub)
    return public_questions


@router.post('/submit')
async def submit_assessment(submission: SubmissionRequest, request: Request):
    questions = request.app.state.questions
    valid_ids = {q['id'] for q in questions}
    answers = submission.answers

    # Validate count
    if len(answers) != len(questions):
        raise HTTPException(status_code=422, detail=f'Expected {len(questions)} answers, got {len(answers)}.')

    # Validate duplicates
    seen_ids = set()
    for a in answers:
        if a.question_id in seen_ids:
            raise HTTPException(status_code=422, detail=f'Duplicate question_id: {a.question_id}')
        seen_ids.add(a.question_id)

    # Validate IDs
    for a in answers:
        if a.question_id not in valid_ids:
            raise HTTPException(status_code=422, detail=f'Invalid question_id: {a.question_id}')

    # Convert to dicts for services
    answers_dicts = [{'question_id': a.question_id, 'selected_option': a.selected_option} for a in answers]

    skill_scores = calculate_skill_scores(answers_dicts, questions)
    overall_score = calculate_overall_score(skill_scores)
    readiness_status = get_readiness_status(overall_score)
    recommendations = generate_recommendations(answers_dicts, questions)

    total_correct = sum(s['correct'] for s in skill_scores.values())
    total_questions = len(questions)

    return {
        'overall_score': overall_score,
        'readiness_status': readiness_status,
        'total_questions': total_questions,
        'correct_answers': total_correct,
        'incorrect_answers': total_questions - total_correct,
        'skills': skill_scores,
        'recommendations': recommendations,
    }
