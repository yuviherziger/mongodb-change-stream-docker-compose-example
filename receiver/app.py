import json
import logging
from typing import Any

from fastapi import Body, FastAPI

logging.basicConfig(
    level=logging.INFO, format="%(message)s", datefmt="%d/%m/%Y %H:%M:%S.%f %z"
)

logger = logging.getLogger(__name__)

app = FastAPI()


@app.get("/")
def hello():
    return {"healthy": True}


@app.post("/handle-event")
def handle_event(payload: Any = Body(None)):
    logger.info("Received message: %s", json.dumps(payload))
    return {"success": True}
