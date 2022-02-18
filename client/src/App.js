import logo from './logo.svg';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import './App.css';
import React from 'react';
import LaunchCard from './components/LaunchCard';
// import ThoughtList from './components/ThoughtList';
import { linkClasses } from '@mui/material';

//Establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink()
const httpLink = createHttpLink({
  uri: '/graphql',
});
//Use ApolloClient() to instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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
    //allows the JSX code between <ApolloProvider> to give access to the server's API data through the ApolloClient
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}
