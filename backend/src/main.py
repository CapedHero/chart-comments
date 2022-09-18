from fastapi import FastAPI

from src.bootstrap import bootstrap
from src.cors import configure_cors
from src.router import router
from src.settings.logging_ import configure_logging


configure_logging()

bootstrap()

app = FastAPI()
app.include_router(router)
configure_cors(app)
