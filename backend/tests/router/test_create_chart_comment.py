import pytest
from starlette.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY

from src.data_sources import in_memory_obj
from src.domain.objects import Chart, ChartComment
from tests.values import TEST_COMMENT_AUTHOR, TEST_COMMENT_TEXT, TEST_DATA_POINT_LABEL, TEST_UUID


API_PATH_TEMPLATE = "/api/chart/{chart_id}/comments"


@pytest.fixture
def valid_request_body():
    return {
        "data_point_label": TEST_DATA_POINT_LABEL,
        "comment_author": TEST_COMMENT_AUTHOR,
        "comment_text": TEST_COMMENT_TEXT,
    }


class TestHappyPath:
    def test_returns_200_with_chart_comment(self, api_client, fake_chart_data, valid_request_body):
        # Arrange
        chart_id = fake_chart_data["id"]
        api_path = API_PATH_TEMPLATE.format(chart_id=chart_id)

        # Act
        response = api_client.post(api_path, json=valid_request_body)

        # Assert
        response_body = response.json()

        assert "id" in response_body
        assert response_body["author"] == valid_request_body["comment_author"]
        assert response_body["text"] == valid_request_body["comment_text"]

        assert response.status_code == HTTP_200_OK

    def test_updates_data_source(self, api_client, fake_chart_data, valid_request_body):
        # Arrange
        chart_id = fake_chart_data["id"]
        api_path = API_PATH_TEMPLATE.format(chart_id=chart_id)
        data_point_label = valid_request_body["data_point_label"]
        prev_comments_num = len(self._get_chart_data_point_comments(data_point_label))

        # Act
        api_client.post(api_path, json=valid_request_body)

        # Assert
        chart_data_point_comments = self._get_chart_data_point_comments(data_point_label)
        assert len(chart_data_point_comments) == prev_comments_num + 1
        assert chart_data_point_comments[-1].author == valid_request_body["comment_author"]
        assert chart_data_point_comments[-1].text == valid_request_body["comment_text"]

    def _get_chart_data_point_comments(self, data_point_label) -> list[ChartComment]:
        chart = Chart.from_dict(in_memory_obj.get_data())
        data_point = chart.get_data_point(data_point_label)
        return data_point.comments


class TestInvalidRequestBody:
    @pytest.mark.parametrize(
        "required_field_name",
        ["data_point_label", "comment_author", "comment_text"],
    )
    def test_returns_422_with_error_details_for_missing_field(
        self,
        required_field_name,
        api_client,
        fake_chart_data,
        valid_request_body,
    ):
        # Arrange
        dummy_chart_id = TEST_UUID
        api_path = API_PATH_TEMPLATE.format(chart_id=dummy_chart_id)
        invalid_request_body = valid_request_body.copy()
        del invalid_request_body[required_field_name]

        # Act
        response = api_client.post(api_path, json=invalid_request_body)

        # Assert
        assert response.status_code == HTTP_422_UNPROCESSABLE_ENTITY
        assert "detail" in response.json()


class TestChartDoesNotExist:
    def test_returns_404_with_error_msg(self, api_client, fake_chart_data, valid_request_body):
        # Arrange
        non_existing_chart_id = TEST_UUID
        api_path = API_PATH_TEMPLATE.format(chart_id=non_existing_chart_id)

        # Act
        response = api_client.post(api_path, json=valid_request_body)

        # Assert
        assert non_existing_chart_id in response.json()["detail"]
        assert response.status_code == HTTP_404_NOT_FOUND
