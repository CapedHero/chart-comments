from uuid import UUID

from pydantic import ConfigDict
from pydantic.dataclasses import dataclass

from src.domain.objects import ChartComment
from src.repos import ChartCommentRepo, ChartRepo
from src.repos import NotFoundError as RepoErrorNotFound
from .exceptions import NotFoundError as ServiceErrorNotFound


@dataclass(config=ConfigDict(arbitrary_types_allowed=True))
class ChartCommentService:
    chart_repo: ChartRepo
    chart_comment_repo: ChartCommentRepo

    def save_chart_comment(
        self,
        chart_id: UUID,
        data_point_label: str,
        comment_author: str,
        comment_text: str,
    ) -> ChartComment:
        try:
            chart = self.chart_repo.get_chart(chart_id)
            chart_comment = self.chart_comment_repo.save_chart_comment(
                chart,
                data_point_label,
                comment_author,
                comment_text,
            )
            return chart_comment
        except RepoErrorNotFound as exc:
            raise ServiceErrorNotFound(str(exc)) from exc
