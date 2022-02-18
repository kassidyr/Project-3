import React from "react";

export default function Comment({ user, timestamp, text }) {
  return (
    <>
      <p>{user}</p>
      <p>{timestamp}</p>
      <p>{text}</p>
    </>
  )
}