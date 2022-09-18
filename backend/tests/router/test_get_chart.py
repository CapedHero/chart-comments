from starlette.status import HTTP_200_OK, HTTP_404_NOT_FOUND

from tests.values import TEST_UUID


API_PATH_TEMPLATE = "/api/chart/{chart_id}"


def test_returns_200_with_chart_data_if_chart_exists(api_client, fake_chart_data):
    # Arrange
    chart_id = fake_chart_data["id"]
    api_path = API_PATH_TEMPLATE.format(chart_id=chart_id)

    # Act
    response = api_client.get(api_path)

    # Assert
    assert response.json() == fake_chart_data
    assert response.status_code == HTTP_200_OK


def test_returns_404_with_err_msg_if_chart_does_not_exist(api_client, fake_chart_data):
    # Arrange
    non_existing_chart_id = TEST_UUID
    api_path = API_PATH_TEMPLATE.format(chart_id=non_existing_chart_id)

    # Act
    response = api_client.get(api_path)

    # Assert
    assert non_existing_chart_id in response.json()["detail"]
    assert response.status_code == HTTP_404_NOT_FOUND
