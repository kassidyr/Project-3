import React, { useState } from 'react'

export default function ThoughtComposer({ postClickedCallback }) {
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);



  const postComment = async () => {
    setIsPosting(true)
    setCommentText("posting...")

    await postClickedCallback(commentText)

    setIsPosting(false);
    setCommentText("");
  }

  const commentTextChanged = (event) => {
    setCommentText(event.target.value)
  }

  return (
    <>
      <textarea disabled={isPosting} onChange={commentTextChanged} value={commentText} col-12 mb-3 col-lg-8 />
      <br></br>
      <button className="btn d-block" disabled={isPosting} onClick={postComment}>Post Comment</button>
    </>
  )
}
