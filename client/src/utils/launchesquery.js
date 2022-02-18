import React from 'react';

export const LAUNCHES_QUERY = `

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
}