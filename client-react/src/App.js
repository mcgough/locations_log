import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Locations from "./components/Locations";

import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>Locations Apollo App</h1>
          <Locations />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
