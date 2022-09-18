from uuid import UUID

from pydantic import ConfigDict
from pydantic.dataclasses import dataclass

from src.domain.objects import Chart
from src.repos import ChartRepo
from src.repos import NotFoundError as RepoErrorNotFound
from .exceptions import NotFoundError as ServiceErrorNotFound


@dataclass(config=ConfigDict(arbitrary_types_allowed=True))
class ChartService:
    chart_repo: ChartRepo

    def get_chart(self, chart_id: UUID) -> Chart:
        try:
            chart = self.chart_repo.get_chart(chart_id)
            return chart
        except RepoErrorNotFound as exc:
            raise ServiceErrorNotFound(str(exc)) from exc
