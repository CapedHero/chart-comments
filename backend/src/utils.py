from typing import Any
from uuid import UUID


def convert_uuid_to_str(data: dict[str, Any]) -> dict[str, Any]:
    for key, value in data.items():
        if isinstance(value, dict):
            data[key] = convert_uuid_to_str(value)
        elif isinstance(value, list):
            data[key] = [convert_uuid_to_str(item) for item in value]
        elif isinstance(value, UUID):
            data[key] = str(value)

    return data
