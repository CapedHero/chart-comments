import "./index.css";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import BarChart from "./components/BarChart/index";
import { fetchChart } from "./components/BarChart/slice";
import CommentsDrawer from "./components/CommentsDrawer";

function App() {
  const chart = useAppSelector((state) => state.chart.data);
  const isCommentsDrawerShown = useAppSelector((state) => state.commentsDrawer.isShown);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChart());
  }, []);

  return (
    <div className="flex h-screen">
      {chart.dataPoints.length > 0 && (
        <div className="m-auto w-[40rem]">
          <BarChart chart={chart} />
        </div>
      )}

      {isCommentsDrawerShown && <CommentsDrawer />}
    </div>
  );
}

export default App;
