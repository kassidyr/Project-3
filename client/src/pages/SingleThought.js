import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";
import ReactionList from "../components/ReactionList";
import { ADD_REACTION } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import ThoughtComposer from "../components/ThoughtComposer";

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  async function handleAddReaction(reactionText) {
    try {
      const { data } = await addReaction({
        variables: { thoughtId: thoughtId, reactionBody: reactionText }
      })
    } catch (e) {
      console.log(e)
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          commented on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      <ThoughtComposer postClickedCallback={handleAddReaction} />

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
    </div>
  );
};

export default SingleThought;
