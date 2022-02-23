import React, { useState } from 'react'
import "./index.scss"

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
      <textarea className='comment-box' disabled={isPosting} onChange={commentTextChanged} value={commentText} col-12 mb-3 col-lg-8 />
      <br></br>
      <button className="btn d-block comment-btn" disabled={isPosting} onClick={postComment}>Post</button>
    </>
  )
}
