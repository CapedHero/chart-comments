from typing import Any

import pytest
from starlette.testclient import TestClient

from src.data_sources import in_memory_obj
from src.main import app


@pytest.fixture
def api_client() -> TestClient:
    return TestClient(app)


@pytest.fixture
def fake_chart_data() -> dict[str, Any]:
    in_memory_obj.load_fake_chart_data()
    fake_chart_data_ = in_memory_obj.get_data()
    yield fake_chart_data_
    in_memory_obj.reset_data()
