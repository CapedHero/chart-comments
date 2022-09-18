import os

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware


def configure_cors(app: FastAPI):
    front_end_app_url = "http://localhost:3000"

    if os.getenv("BACKEND_ENV") == "dev":
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[front_end_app_url],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
