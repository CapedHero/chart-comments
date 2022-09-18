import logging
import sys

from loguru import logger


def configure_logging():
    class InterceptHandler(logging.Handler):
        # The purpose of this handler is to intercept standard logging messages
        # towards Loguru sinks.
        #
        # Code source:
        # https://github.com/Delgan/loguru#entirely-compatible-with-standard-logging

        def emit(self, record):
            # Get corresponding Loguru level if it exists.
            try:
                level = logger.level(record.levelname).name
            except ValueError:
                level = record.levelno

            # Find caller from where originated the logged message.
            frame, depth = sys._getframe(6), 6
            while frame and frame.f_code.co_filename == logging.__file__:
                frame = frame.f_back
                depth += 1

            logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())

    # Configure loguru
    logger.remove()
    levels = {
        "google.auth.transport": "INFO",
        "urllib3": "INFO",
    }
    logger.add(sys.stderr, filter=levels)

    # Configure Python logging
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)

    # Configure uvicorn logging
    logging.getLogger("uvicorn.access").handlers = [InterceptHandler()]
    for _log in ["uvicorn", "uvicorn.error", "fastapi"]:
        _logger = logging.getLogger(_log)
        _logger.handlers = [InterceptHandler()]
