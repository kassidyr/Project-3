import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import LaunchDetail from './pages/LaunchDetail';
import Donation from './pages/Donation';
import CheckoutForm from './pages/CheckoutForm';
import PaymentForm from './pages/PaymentForm';


//Establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink()
const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//Use ApolloClient() to instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const stripePromise=loadStripe('pk_test_51KTGJSFQWj5xi5NvCTQjnDNEryWbFtgtP46n6mSabCKy0lHfYLaV4OnvmKVf0FI8R5mvE05Y1RAsQE9cKBMnRzhS00NmPXaUW5');

  return (
    //allows the JSX code between <ApolloProvider> to give access to the server's API data through the ApolloClient
    <Elements stripe={stripePromise}>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />
              <Route exact path="/launch/:launchId" component={LaunchDetail} />
              <Route exact path="/donation">
                <PaymentForm />
              </Route>
              <Route exact path="/checkout" component={CheckoutForm} />

              <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
     </ApolloProvider>
    </Elements>
  );
}

export default App;