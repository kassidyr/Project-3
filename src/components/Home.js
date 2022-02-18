import React from 'react';
import { LAUNCHES_QUERY } from '../utils/spacex/queries'
import LaunchCard from './LaunchCard';

export default function Home() {
  const [launches, setLaunches] = React.useState([])

  React.useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: LAUNCHES_QUERY })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLaunches(data.data.launches)
      })
  }, [])

  return (
    <>
      <p>
        Welcome to Spacebook
      </p>

      <ul>
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
        ))}
      </ul>
    </>
  );
}
