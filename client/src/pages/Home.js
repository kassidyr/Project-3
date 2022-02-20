import React from "react";
import ThoughtList from "../components/ThoughtList";
import LaunchCard from "../components/LaunchCard";
import { Container } from "react-bootstrap";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import { LAUNCHES_QUERY } from "../utils/spacex/queries";
import ThoughtComposer from "../components/ThoughtComposer";
import { ADD_THOUGHT } from "../utils/mutations";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const [thoughts, setThoughts] = React.useState([]);
  const [launches, setLaunches] = React.useState([]);
  const [addThought, { error }] = useMutation(ADD_THOUGHT);

  if (!loading && !thoughts.length) {
    setThoughts(data?.thoughts)
  }

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

  return (
    <main>
      <p>
        Welcome to Spacebook
      </p>
      <Container className="flex-parent"> {/* launch card here  */}
        {launches.map((launch) => (
          <LaunchCard key={launch.id} id={launch.id}
            mission_name={launch.mission_name} site_name_long={launch.launch_site.site_name_long}
            rocket_name={launch.rocket.rocket_name} launch_date_utc={launch.launch_date_utc} article_link={launch.links.article_link} flickr_images={launch.links.flickr_images[0]} />
        ))}
      </Container>
      <a>
        Space X Launches
      </a>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtComposer postClickedCallback={handleAddThought} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Comments" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
