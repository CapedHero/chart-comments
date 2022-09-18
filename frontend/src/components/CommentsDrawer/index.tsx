import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { commentsDrawerActions } from "./slice";
import AddCommentForm from "./subcomponents/AddCommentForm";
import Comments from "./subcomponents/Comments";
import CrossIcon from "./subcomponents/CrossIcon";

function CommentsDrawer() {
  const comments = useAppSelector((state) => state.commentsDrawer.comments);

  const dispatch = useAppDispatch();

  const handleCrossIconClick = useCallback(() => {
    return dispatch(commentsDrawerActions.hide());
  }, []);

  return (
    <div
      className="
        fixed right-0
        flex h-screen w-96 flex-col
        justify-between gap-y-4
        bg-slate-600 px-4
        py-3 text-white
        shadow-[0_35px_60px_-15px_rgba(0,0,0,0.75)]
      "
    >
      <h2 className="text-xl font-semibold">Comments</h2>

      <CrossIcon onClick={handleCrossIconClick} />

      <div className="flex grow flex-col justify-between gap-y-4 overflow-hidden">
        <Comments comments={comments} />
        <AddCommentForm />
      </div>
    </div>
  );
}

export default CommentsDrawer;
