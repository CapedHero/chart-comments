from uuid import UUID

import pytest

from src.domain.objects import Chart
from src.repos import ChartRepo
from src.repos.exceptions import MalformedDataSourceError
from tests.values import TEST_UUID


def test_returns_fake_chart(fake_chart_data):
    # Arrange
    repo = ChartRepo()
    chart_id = UUID(fake_chart_data["id"])

    # Act
    chart = repo.get_chart(chart_id)

    # Assert
    assert chart == Chart.from_dict(fake_chart_data)


def test_raises_exc_if_data_is_malformed():
    # Arrange
    repo = ChartRepo()
    dummy_chart_id = TEST_UUID

    # Assert
    with pytest.raises(MalformedDataSourceError):
        # Act
        repo.get_chart(dummy_chart_id)
