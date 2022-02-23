import React, { useEffect, useState} from "react";
// import {getThoughts as getThoughtsApi } from "../api";


export default function Thought({ user, timestamp, text, LaunchId}) {
  return (
    <>
    <div className="thoughts">Thoughts</div>
      <p>{user}</p>
      <p className="thought-time">{timestamp}</p>
      <p>{text}</p>
      <p>{LaunchId}</p>
    </>
  )
}
