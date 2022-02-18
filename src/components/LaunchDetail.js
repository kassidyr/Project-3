import React, { useEffect } from 'react';
import LaunchCard from './LaunchCard';
import { linkClasses } from '@mui/material';
import { LAUNCH_QUERY } from '../utils/spacex/queries'
import { useParams } from 'react-router-dom';
import Comment from './Comment';


export default function LaunchDetail() {
  const { launchId } = useParams();

  const [launch, setLaunch] = React.useState()
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    const fakeComments = [
      { id: 1, user: "matt", timestamp: "9:05PM", text: "hello" },
      { id: 2, user: "kass", timestamp: "9:06PM", text: "hi" },
      { id: 3, user: "toni", timestamp: "9:07PM", text: "bye" },
      { id: 4, user: "alex", timestamp: "9:08PM", text: "goodbye" },
    ]
    setComments(fakeComments)

    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: LAUNCH_QUERY, variables: { id: launchId } })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLaunch(data.data.launch)
      })
  }, [])

  if (!launch) {
    return (
      <p>loading...</p>
    )
  }

  // .then(response => response.json())
  // .then(data => {
  //   console.log(data)
  //   setComments(data.data.whatever)
  // });

  return (
    <>
      <LaunchCard
        mission_name={launch.mission_name}
        site_name_long={launch.launch_site.site_name_long}
        rocket_name={launch.rocket.rocket_name}
        launch_date_utc={launch.launch_date_utc}
        article_link={launch.links.article_link}
        flickr_images={launch.links.flickr_images[0]}
      />

      {
        comments.map((comment) => (
          <Comment key={comment.id} user={comment.user} timestamp={comment.timestamp} text={comment.text} />
        ))
      }
    </>
  );
}