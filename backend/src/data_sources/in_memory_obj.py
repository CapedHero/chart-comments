import json
from typing import Any

from dirs import DATA_DIR


_data = {}


def get_data() -> Any:
    global _data
    return _data


def save_data(data=Any) -> None:
    global _data
    _data = data


def reset_data() -> None:
    global _data
    _data = {}


def load_fake_chart_data() -> None:
    with open(DATA_DIR / "fake-chart.json") as fake_chart_data_file:
        fake_chart_data = json.load(fake_chart_data_file)

    save_data(fake_chart_data)
