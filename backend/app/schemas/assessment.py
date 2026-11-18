from typing import Literal, List
from pydantic import BaseModel


class AnswerItem(BaseModel):
    question_id: str
    selected_option: Literal["A", "B", "C", "D"]


class SubmissionRequest(BaseModel):
    answers: List[AnswerItem]
