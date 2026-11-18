from typing import List, Dict, Any

SKILL_WEIGHTS = {
    'vocabulary': 0.30,
    'grammar': 0.30,
    'reading': 0.40,
}


def calculate_skill_scores(answers: List[Dict], questions: List[Dict]) -> Dict[str, Dict]:
    """Returns per-skill correct/total counts and percentage score."""
    question_map = {q['id']: q for q in questions}
    skill_data = {
        'vocabulary': {'correct': 0, 'total': 0},
        'grammar': {'correct': 0, 'total': 0},
        'reading': {'correct': 0, 'total': 0},
    }
    for answer in answers:
        qid = answer['question_id']
        q = question_map.get(qid)
        if q is None:
            continue
        skill = q['skill']
        if skill not in skill_data:
            skill_data[skill] = {'correct': 0, 'total': 0}
        skill_data[skill]['total'] += 1
        if answer['selected_option'] == q['correct_answer']:
            skill_data[skill]['correct'] += 1
    result = {}
    for skill, data in skill_data.items():
        total = data['total']
        correct = data['correct']
        score = round((correct / total) * 100) if total > 0 else 0
        result[skill] = {
            'score': score,
            'correct': correct,
            'total': total,
            'status': get_skill_status(score),
        }
    return result


def calculate_overall_score(skill_scores: Dict[str, Dict]) -> int:
    """Weighted: vocabulary 30%, grammar 30%, reading 40%."""
    total = 0.0
    for skill, weight in SKILL_WEIGHTS.items():
        score = skill_scores.get(skill, {}).get('score', 0)
        total += score * weight
    return round(total)


def get_readiness_status(score: int) -> str:
    if score >= 80:
        return 'Ready for Further Exam Preparation'
    elif score >= 60:
        return 'Almost Ready'
    else:
        return 'Needs More Practice'


def get_skill_status(score: int) -> str:
    if score >= 80:
        return 'Strong'
    elif score >= 60:
        return 'Developing'
    else:
        return 'Needs Improvement'
