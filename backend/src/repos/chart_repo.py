from uuid import UUID

from src.data_sources import in_memory_obj
from src.domain.objects import Chart
from src.domain.objects.exceptions import ValidationError
from .exceptions import MalformedDataSourceError, NotFoundError


class ChartRepo:
    def get_chart(self, chart_id: UUID) -> Chart:
        raw_chart_data = in_memory_obj.get_data()

        try:
            chart = Chart.from_dict(raw_chart_data)
        except (KeyError, ValidationError) as exc:
            raise MalformedDataSourceError() from exc

        if chart_id != chart.id:
            raise NotFoundError(f"Chart with ID {chart_id} not found.")

        return chart
