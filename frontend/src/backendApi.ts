import axios, { AxiosResponse } from "axios";

const ONE_MINUTE = 60 * 1000; // In milliseconds

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: ONE_MINUTE,
  withCredentials: true,
});

interface fetchChartResponseBody {
  id: string;
  data_points: Array<{
    label: string;
    value: number;
    comments: Array<{
      author: string;
      id: string;
      text: string;
    }>;
  }>;
}

function fetchChart(): Promise<AxiosResponse<fetchChartResponseBody>> {
  return axiosInstance.get("/api/chart/4da423ac-c8e2-4c1b-be57-57e53a4834a5");
}

function addChartComment(
  dataPointLabel: string,
  commentAuthor: string,
  commentText: string
): Promise<AxiosResponse<{ id: string; author: string; text: string }>> {
  return axiosInstance.post("/api/chart/4da423ac-c8e2-4c1b-be57-57e53a4834a5/comments", {
    data_point_label: dataPointLabel,
    comment_author: commentAuthor,
    comment_text: commentText,
  });
}

const backendAPI = { fetchChart, addChartComment };

export { backendAPI };
