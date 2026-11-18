import pytest
import json
import os
from fastapi.testclient import TestClient
from app.main import app

QUESTIONS_PATH = os.path.join(os.path.dirname(__file__), '..', 'app', 'data', 'questions.json')

with open(QUESTIONS_PATH, 'r', encoding='utf-8') as f:
    ALL_QUESTIONS = json.load(f)

ALL_CORRECT_ANSWERS = [
    {'question_id': q['id'], 'selected_option': q['correct_answer']}
    for q in ALL_QUESTIONS
]


@pytest.fixture(scope='module')
def client():
    with TestClient(app) as c:
        yield c


def test_health(client):
    resp = client.get('/api/health')
    assert resp.status_code == 200
    assert resp.json() == {'status': 'healthy'}


def test_get_questions(client):
    resp = client.get('/api/questions')
    assert resp.status_code == 200
    questions = resp.json()
    assert len(questions) == 12
    for q in questions:
        assert 'correct_answer' not in q
        assert 'explanation' not in q
        assert 'id' in q
        assert 'question_text' in q


def test_submit_all_correct(client):
    resp = client.post('/api/submit', json={'answers': ALL_CORRECT_ANSWERS})
    assert resp.status_code == 200
    data = resp.json()
    assert data['overall_score'] == 100
    assert data['correct_answers'] == 12


def test_submit_missing_answers(client):
    # Only send 11 answers
    resp = client.post('/api/submit', json={'answers': ALL_CORRECT_ANSWERS[:11]})
    assert resp.status_code == 422


def test_submit_invalid_question_id(client):
    bad_answers = ALL_CORRECT_ANSWERS[:11] + [{'question_id': 'INVALID', 'selected_option': 'A'}]
    resp = client.post('/api/submit', json={'answers': bad_answers})
    assert resp.status_code == 422


def test_submit_duplicate_ids(client):
    dup_answers = ALL_CORRECT_ANSWERS[:11] + [ALL_CORRECT_ANSWERS[0]]
    resp = client.post('/api/submit', json={'answers': dup_answers})
    assert resp.status_code == 422


def test_submit_invalid_option(client):
    bad_answers = ALL_CORRECT_ANSWERS[:11] + [{'question_id': ALL_QUESTIONS[11]['id'], 'selected_option': 'E'}]
    resp = client.post('/api/submit', json={'answers': bad_answers})
    assert resp.status_code == 422
