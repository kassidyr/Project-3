import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_THOUGHT } from '../../utils/mutations';

export default function ThoughtComposer() {
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [addThought, { error }] = useMutation(ADD_THOUGHT);



  const postComment = async () => {
    setIsPosting(true)
    setCommentText("posting...")

    try {
      const { data } = await addThought({
        variables: { thoughtText: commentText}
      })
    } catch (e) {
      console.log(e)
    }

    setIsPosting(false);
    setCommentText("");
  }

  const commentTextChanged = (event) => {
    setCommentText(event.target.value)
  }

  return (
    <>
      <textarea disabled={isPosting} onChange={commentTextChanged} value={commentText} />
      <button  disabled={isPosting} onClick={postComment}>Post</button>
    </>
  )
}
