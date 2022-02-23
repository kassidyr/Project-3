import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import { DELETE_THOUGHT } from "../../utils/mutations";

const ThoughtList = ({ thoughts, title, setThoughts }) => {
  const [deleteThought, { error }] = useMutation(DELETE_THOUGHT);


  async function handleDeleteThought(thoughtId) {
    try {
      const { data } = await deleteThought({
        variables: { thoughtId: thoughtId }
      })

      if (data?.deleteThought && setThoughts !== undefined) {
        setThoughts(thoughts.filter(thought => thought._id !== thoughtId))
      }

    } catch (e) {
      console.log(e)
    }
  }

  if (!thoughts.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{' '}
              thought on {thought.createdAt}
              {Auth.loggedIn() && Auth.getProfile().data.username === thought.username ? <Button onClick={() => { handleDeleteThought(thought._id) }}>Delete</Button> : <></>}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{' '}
                  {thought.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
