import json
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routes.assessment import router as assessment_router

load_dotenv()

QUESTIONS_PATH = os.path.join(os.path.dirname(__file__), 'data', 'questions.json')


@asynccontextmanager
async def lifespan(app: FastAPI):
    with open(QUESTIONS_PATH, 'r', encoding='utf-8') as f:
        app.state.questions = json.load(f)
    yield


app = FastAPI(
    title='Globio A1 Readiness API',
    description='Backend API for the Globio German A1 Exam Readiness Checker',
    version='1.0.0',
    lifespan=lifespan,
)

allowed_origins_env = os.getenv('ALLOWED_ORIGINS', '')
if allowed_origins_env:
    origins = [o.strip() for o in allowed_origins_env.split(',')]
else:
    origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(assessment_router, prefix='/api')
