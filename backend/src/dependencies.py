from src.domain.services import ChartCommentService, ChartService
from src.repos import ChartCommentRepo, ChartRepo


def get_chart_service() -> ChartService:
    chart_repo = ChartRepo()
    return ChartService(chart_repo)


def get_chart_comment_service() -> ChartCommentService:
    chart_repo = ChartRepo()
    chart_comment_repo = ChartCommentRepo()
    return ChartCommentService(chart_repo, chart_comment_repo)
