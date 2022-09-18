from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from starlette.status import HTTP_404_NOT_FOUND

from src.dependencies import get_chart_comment_service, get_chart_service
from src.domain.objects import Chart, ChartComment
from src.domain.services import NotFoundError


router = APIRouter()


@router.get("/api/chart/{chart_id}", response_model=Chart)
def get_chart(chart_id: UUID, chart_service=Depends(get_chart_service)):
    try:
        chart = chart_service.get_chart(chart_id)
        return chart
    except NotFoundError as exc:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=str(exc))


class CreateChartCommentRequestBody(BaseModel):
    data_point_label: str
    comment_author: str
    comment_text: str


@router.post("/api/chart/{chart_id}/comments", response_model=ChartComment)
def create_chart_comment(
    chart_id: UUID,
    request_body: CreateChartCommentRequestBody,
    chart_comment_service=Depends(get_chart_comment_service),
):
    try:
        chart_comment = chart_comment_service.save_chart_comment(
            chart_id,
            request_body.data_point_label,
            request_body.comment_author,
            request_body.comment_text,
        )
        return chart_comment
    except NotFoundError as exc:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=str(exc))
