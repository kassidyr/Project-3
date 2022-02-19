import React from "react";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import LaunchCard from "../components/LaunchCard";
import { Container } from "react-bootstrap";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import { LAUNCHES_QUERY } from "../utils/spacex/queries";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive (if a user is logged in and has a valid token, userData will hold all of the returned information from our query)
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];
  //if logged in the loggedIn variable will be true; otherwise it will be false
  const loggedIn = Auth.loggedIn();
  const [launches, setLaunches] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.spacex.land/graphql/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: LAUNCHES_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLaunches(data.data.launches);
      });
  }, []);
  return (
    <main>
      <p>Welcome to Spacebook</p>
      <Container className="flex-parent">
        {" "}
        {/* launch card here  */}
        {launches.map((launch) => (
          <LaunchCard
            key={launch.id}
            id={launch.id}
            mission_name={launch.mission_name}
            site_name_long={launch.launch_site.site_name_long}
            rocket_name={launch.rocket.rocket_name}
            launch_date_utc={launch.launch_date_utc}
            article_link={launch.links.article_link}
            flickr_images={launch.links.flickr_images[0]}
          />
          // <li key={launch.id}>{launch.mission_name}</li>
        ))}
      </Container>
      <a>Space X Launches</a>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Comments" />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
