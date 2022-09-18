import os

from loguru import logger

from src.data_sources import in_memory_obj


def bootstrap() -> None:
    backend_env = os.getenv("BACKEND_ENV")

    if backend_env not in {"dev", "test"}:
        raise RuntimeError(
            'This app is NOT production ready! BACKEND_ENV must be set to "dev" or "test".'
        )

    if backend_env == "dev":
        in_memory_obj.load_fake_chart_data()
        logger.info("Loaded fake chart data.")
