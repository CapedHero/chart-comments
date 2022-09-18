import { ChartComment } from "domain/types";

interface CommentsProps {
  comments: Array<ChartComment>;
}

function Comments(props: CommentsProps) {
  const { comments } = props;

  return (
    <div className="flex flex-col gap-y-5 overflow-auto">
      {comments.map((comment) => (
        <div className="w-full rounded bg-slate-500 px-3 py-2" key={comment.id}>
          <div>@{comment.author}</div>
          <hr className="my-3 h-px border-0 bg-gray-400" />
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
