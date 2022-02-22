import React from "react";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import LaunchCard from "../components/LaunchCard";
import { Container } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import { LAUNCHES_QUERY } from "../utils/spacex/queries";
import ThoughtComposer from "../components/ThoughtComposer";
import { ADD_THOUGHT } from "../utils/mutations";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const [thoughts, setThoughts] = React.useState([]);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive (if a user is logged in and has a valid token, userData will hold all of the returned information from our query)
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  //if logged in the loggedIn variable will be true; otherwise it will be false
  const loggedIn = Auth.loggedIn();
  const [launches, setLaunches] = React.useState([]);
  // const [date, setDate] = React.useState("");
  const [addThought, { error }] = useMutation(ADD_THOUGHT);

  React.useMemo(() => {
    if (data && data.thoughts) {
      setThoughts(data.thoughts)
    }
  }, [data])

  React.useEffect(() => {
    fetch("https://api.spacex.land/graphql/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: LAUNCHES_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" }
        // setDate(new Date(data.data.launch_date_unix).toLocaleDateString(undefined, options));
        setLaunches(data.data.launches);
      });
  }, []);

  async function handleAddThought(thoughtText) {
    try {
      const { data } = await addThought({
        variables: { thoughtText: thoughtText }
      })

      setThoughts([data.addThought, ...thoughts])
    } catch (e) {
      console.log(e)
    }
  }
  
  // launch.launch_date_utc

  return (
    <main>
      <br></br>
      <Container className="flex-parent">
        {" "}
        {launches.map((launch) => (
          <LaunchCard
            key={launch.id}
            id={launch.id}
            mission_name={launch.mission_name}
            site_name_long={launch.launch_site.site_name_long}
            rocket_name={launch.rocket.rocket_name}
            article_link={launch.links.article_link}
            flickr_images={launch.links.flickr_images[0]}
          />
        ))}
      </Container>
      <br></br>
      <h2>General Comments</h2>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          <ThoughtComposer postClickedCallback={handleAddThought} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} setThoughts={setThoughts} />
          )}
        </div>
        {/* {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null} */}
      </div>
    </main>
  );
};

export default Home;
