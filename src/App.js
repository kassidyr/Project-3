import logo from './logo.svg';
import './App.css';
import React from 'react';
import LaunchCard from './components/LaunchCard';
import { linkClasses } from '@mui/material';

const LAUNCHES_QUERY = `

query {
  launches(limit: 20) {
    mission_name
    launch_site {
      site_name_long
      site_name
    }
    rocket {
      rocket_name
    }
    launch_date_utc
    links {
      article_link
      flickr_images
    }
  }
}
`

export default function App() {
  const [launches, setLaunches] = React.useState([]);
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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Spacebook
        </p>
        <ul> {/* launch card here  */}
          {launches.map((launch) => (
            <LaunchCard mission_name={launch.mission_name} site_name_long={launch.launch_site.site_name_long} rocket_name={launch.rocket.rocket_name} launch_date_utc={launch.launch_date_utc} article_link={launch.links.article_link} flickr_images={launch.links.flickr_images[0]}/>
            // <li key={launch.id}>{launch.mission_name}</li>
          ))}
        </ul>
        <a>
          Space X Launches
        </a>
      </header>
    </div>
  );
}
