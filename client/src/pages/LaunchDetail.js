import React from 'react';
import LaunchCard from '../components/LaunchCard';
import { LAUNCH_QUERY } from '../utils/spacex/queries'
import { useParams } from 'react-router-dom';
import Auth from "../utils/auth";
import ThoughtComposer from '../components/ThoughtComposer';
import ThoughtList from '../components/ThoughtList';
import { ADD_THOUGHT } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_THOUGHTS_FOR_LAUNCH } from '../utils/queries';

export default function LaunchDetail() {
  const { launchId } = useParams();
  const { loading, data } = useQuery(QUERY_THOUGHTS_FOR_LAUNCH, { variables: { launchId: launchId } });

  const [launch, setLaunch] = React.useState()
  const [thoughts, setThoughts] = React.useState([]);

  const [addThought, { error }] = useMutation(ADD_THOUGHT);
  const loggedIn = Auth.loggedIn();

  console.log("loading", loading)
  console.log("thoughts", thoughts)

  React.useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: LAUNCH_QUERY, variables: { id: launchId } })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setLaunch(result.data.launch)
      })
  }, [])

  React.useMemo(() => {
    if (data && data.thoughtsForLaunch) {
      setThoughts(data.thoughtsForLaunch)
    }
  }, [data])

  async function handleAddThought(thoughtText) {

    try {
      const { data } = await addThought({
        variables: { thoughtText: thoughtText, launchId: launchId }
      })

      setThoughts([data.addThought, ...thoughts])
    } catch (e) {
      console.log(e)
    }
  }

  if (!launch) {
    return (
      <p>loading...</p>
    )
  }

  return (
    <>
    <br></br>
      <LaunchCard
        mission_name={launch.mission_name}
        site_name_long={launch.launch_site.site_name_long}
        rocket_name={launch.rocket.rocket_name}
        launch_date_utc={launch.launch_date_utc}
        article_link={launch.links.article_link}
        flickr_images={launch.links.flickr_images[0]}
      />

      <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
        <ThoughtComposer postClickedCallback={handleAddThought} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Comments" />
        )}
      </div>
    </>
  );
}