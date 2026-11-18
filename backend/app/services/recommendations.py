from typing import List, Dict

TOPIC_RECOMMENDATIONS = {
    'food': 'Practise common German food vocabulary and nouns used in everyday shopping.',
    'greetings': 'Revise common German greetings and time-of-day expressions.',
    'places': 'Learn vocabulary for common places like school, hospital, and market.',
    'daily_activities': 'Study verbs for everyday actions like eating, drinking, sleeping, and working.',
    'articles': 'Practise der, die, das with common German nouns. Use flashcards to memorise noun genders.',
    'verb_conjugation': 'Revise basic German verb conjugation for ich, du, er/sie, wir forms.',
    'pronouns': 'Review German personal pronouns: ich, du, er, sie, es, wir, ihr, sie/Sie.',
    'prepositions': 'Study common German prepositions: auf, in, mit, bei, an, and their usage.',
    'text_comprehension': 'Read short German A1 texts daily. Practise identifying key facts like names, ages, times, and places.',
}

TOPIC_DISPLAY_NAMES = {
    'food': 'German Food Vocabulary',
    'greetings': 'German Greetings',
    'places': 'Places and Locations',
    'daily_activities': 'Daily Activities',
    'articles': 'German Articles (der/die/das)',
    'verb_conjugation': 'Verb Conjugation',
    'pronouns': 'Personal Pronouns',
    'prepositions': 'German Prepositions',
    'text_comprehension': 'Reading Comprehension',
}


def generate_recommendations(answers: List[Dict], questions: List[Dict]) -> List[Dict]:
    """Generate 2-3 specific recommendations based on actual mistakes."""
    question_map = {q['id']: q for q in questions}
    wrong_topics = {}
    all_correct = True
    for answer in answers:
        qid = answer['question_id']
        q = question_map.get(qid)
        if q is None:
            continue
        if answer['selected_option'] != q['correct_answer']:
            all_correct = False
            topic = q['topic']
            skill = q['skill']
            if topic not in wrong_topics:
                wrong_topics[topic] = {'skill': skill, 'count': 0}
            wrong_topics[topic]['count'] += 1
    if all_correct:
        return [{
            'topic': 'All Skills',
            'reason': 'You answered all questions correctly!',
            'action': 'Continue practising all skills to maintain your excellent preparation level.',
        }]
    # Sort by count descending, take at most 3
    sorted_topics = sorted(wrong_topics.items(), key=lambda x: x[1]['count'], reverse=True)
    recommendations = []
    for topic, data in sorted_topics[:3]:
        display_name = TOPIC_DISPLAY_NAMES.get(topic, topic.replace('_', ' ').title())
        action = TOPIC_RECOMMENDATIONS.get(topic, f'Practise {display_name} topics.')
        count = data['count']
        reason = f"You missed {count} question{'s' if count > 1 else ''} on this topic."
        recommendations.append({
            'topic': display_name,
            'reason': reason,
            'action': action,
        })
    return recommendations
