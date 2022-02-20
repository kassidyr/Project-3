import React, { useEffect, useState} from "react";
// import {getThoughts as getThoughtsApi } from "../api";

export default function Thought({ user, timestamp, text, LaunchId}) {
  return (
    <>
    <div>Thoughts</div>
      <p>{user}</p>
      <p>{timestamp}</p>
      <p>{text}</p>
      <p>{LaunchId}</p>
    </>
  )
}
