from dataclasses import asdict

import pytest

from src.domain.objects import Chart
from src.domain.objects.exceptions import NotFoundError
from src.utils import convert_uuid_to_str


def test_data_structure(fake_chart_data):
    # Act
    chart = Chart.from_dict(fake_chart_data)

    # Assert
    serialized_chart = convert_uuid_to_str(asdict(chart))
    assert serialized_chart == fake_chart_data


class TestGetDataPoint:
    def test_returns_correct_data_point(self, fake_chart_data):
        # Arrange
        chart = Chart.from_dict(fake_chart_data)
        data_point_label = "bar"

        # Act
        data_point = chart.get_data_point(data_point_label)

        # Assert
        assert data_point.label == data_point_label
        # Remember that data source == data/fake-chart.json
        assert data_point.value == 200
        assert len(data_point.comments) == 2

    def test_raises_exc_if_data_point_does_not_exist(self, fake_chart_data):
        # Arrange
        chart = Chart.from_dict(fake_chart_data)
        non_existing_datapoint = "non_existing_datapoint"

        # Assert
        with pytest.raises(NotFoundError):
            # Act
            chart.get_data_point(non_existing_datapoint)
