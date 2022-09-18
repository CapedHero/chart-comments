import pytest

from src.data_sources import in_memory_obj
from src.domain.objects import Chart, ChartComment
from src.repos import ChartCommentRepo, NotFoundError
from tests.values import TEST_COMMENT_AUTHOR, TEST_COMMENT_TEXT, TEST_DATA_POINT_LABEL


def test_saves_chart_comment(fake_chart_data):
    # Arrange
    repo = ChartCommentRepo()

    chart = Chart.from_dict(fake_chart_data)

    valid_data_point_label = TEST_DATA_POINT_LABEL
    valid_comment_author = TEST_COMMENT_AUTHOR
    valid_comment_text = TEST_COMMENT_TEXT

    prev_comments_num = len(_get_chart_data_point_comments(valid_data_point_label))

    # Act
    chart_comment = repo.save_chart_comment(
        chart,
        valid_data_point_label,
        valid_comment_author,
        valid_comment_text,
    )

    # Assert
    chart_data_point_comments = _get_chart_data_point_comments(valid_data_point_label)

    assert len(chart_data_point_comments) == prev_comments_num + 1

    assert chart_data_point_comments[-1].author == chart_comment.author == valid_comment_author
    assert chart_data_point_comments[-1].text == chart_comment.text == valid_comment_text


def test_raises_exc_if_data_point_label_does_not_exist(fake_chart_data):
    # Arrange
    repo = ChartCommentRepo()

    chart = Chart.from_dict(fake_chart_data)

    non_existing_data_point_label = "non-existing-data-point-label"
    valid_comment_author = TEST_COMMENT_AUTHOR
    valid_comment_text = TEST_COMMENT_TEXT

    # Assert
    with pytest.raises(NotFoundError):
        # Act
        repo.save_chart_comment(
            chart,
            non_existing_data_point_label,
            valid_comment_author,
            valid_comment_text,
        )


def _get_chart_data_point_comments(data_point_label) -> list[ChartComment]:
    # fmt: off
    return (
        Chart
        .from_dict(in_memory_obj.get_data())
        .get_data_point(data_point_label)
        .comments
    )
    # fmt: on
