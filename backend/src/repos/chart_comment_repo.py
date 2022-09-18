import uuid
from dataclasses import asdict

from src.data_sources.in_memory_obj import save_data
from src.domain.objects import Chart, ChartComment
from src.domain.objects import NotFoundError as DomainErrorNotFound
from .exceptions import NotFoundError as RepoErrorNotFound


class ChartCommentRepo:
    def save_chart_comment(
        self,
        chart: Chart,
        data_point_label: str,
        comment_author: str,
        comment_text: str,
    ) -> ChartComment:
        new_comment_id = uuid.uuid4()

        try:
            data_point = chart.get_data_point(data_point_label)
        except DomainErrorNotFound as exc:
            raise RepoErrorNotFound(
                f'There is no data point with label "{data_point_label}" for chart#{chart.id}.'
            ) from exc

        chart_comment = ChartComment(new_comment_id, comment_author, comment_text)
        data_point.comments.append(chart_comment)

        save_data(asdict(chart))

        return chart_comment
