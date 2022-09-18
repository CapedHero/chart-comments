from typing import Any
from uuid import UUID

from pydantic.dataclasses import dataclass

from .exceptions import NotFoundError, ValidationError


@dataclass
class ChartComment:
    id: UUID
    author: str
    text: str


@dataclass
class ChartDataPoint:
    label: str
    value: float
    comments: list[ChartComment]


@dataclass
class Chart:
    id: UUID
    data_points: list[ChartDataPoint]

    def get_data_point(self, data_point_label: str) -> ChartDataPoint:
        for data_point in self.data_points:
            if data_point.label == data_point_label:
                return data_point
        else:
            raise NotFoundError(
                f'There is no data point with label "{data_point_label}" for chart#{self.id}.'
            )

    @classmethod
    def from_dict(cls, raw_data: dict[str, Any]) -> "Chart":
        try:
            chart_id = raw_data["id"]
            chart_data_points = [
                ChartDataPoint(
                    raw_data_point["label"],
                    raw_data_point["value"],
                    [ChartComment(**raw_comment) for raw_comment in raw_data_point["comments"]],
                )
                for raw_data_point in raw_data["data_points"]
            ]
        except KeyError as exc:
            raise ValidationError(f"Invalid data provided. Missing attribute: {exc}") from exc

        return cls(chart_id, chart_data_points)
