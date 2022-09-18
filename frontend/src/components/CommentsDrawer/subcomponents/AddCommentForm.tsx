import React, { useCallback, useState } from "react";
import { useAppDispatch } from "store/hooks";

import { addChartComment } from "../slice";

function AddCommentForm() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useAppDispatch();

  const handleAuthorChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  }, []);

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent, data: { author: string; text: string }) => {
      event.preventDefault();

      const { author, text } = data;

      dispatch(addChartComment({ commentAuthor: author, commentText: text }));

      setAuthor("");
      setText("");
    },
    []
  );

  return (
    <form onSubmit={(event) => handleSubmit(event, { author, text })}>
      <hr className="my-3 h-px border-0 bg-gray-400" />

      <label htmlFor="addCommentFormUsernameField" className="mb-2 ml-1 block text-gray-300">
        Username
      </label>
      <input
        autoComplete="off"
        type="text"
        id="addCommentFormUsernameField"
        className="
          mx-1
          block
          w-[calc(100%_-_6px)] rounded-lg border
          border-gray-600 bg-slate-500
          p-2.5
          text-white
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500
        "
        value={author}
        onChange={handleAuthorChange}
        required
      />

      <label htmlFor="addCommentFormCommentField" className="mt-3 mb-2 ml-1 block text-gray-300">
        Comment
      </label>
      <textarea
        id="addCommentFormCommentField"
        rows={4}
        className="
          mx-1
          block
          w-[calc(100%_-_6px)] rounded-lg border
          border-gray-600 bg-slate-500
          p-2.5
          text-white
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500
        "
        value={text}
        onChange={handleTextChange}
        required
      />

      <button
        type="submit"
        className="
          mt-4
          mb-2
          ml-1
          rounded-lg bg-blue-400
          px-5 py-2.5 text-white
          hover:bg-blue-600
          focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500
        "
      >
        Add Comment
      </button>
    </form>
  );
}

export default AddCommentForm;
