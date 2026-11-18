from pydantic import BaseModel, field_validator
from typing import List


class AnswerItem(BaseModel):
    question_id: str
    selected_option: str

    @field_validator('selected_option')
    @classmethod
    def validate_option(cls, v):
        if v not in ('A', 'B', 'C', 'D'):
            raise ValueError('selected_option must be A, B, C, or D')
        return v


class SubmissionRequest(BaseModel):
    answers: List[AnswerItem]
