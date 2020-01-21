import React from "react";
import Location from "./Location";
import { Query } from "react-apollo";
import { locations } from "../graphql/queries";

const Locations = () => (
  <Query query={locations}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.locations.map(l => <Location location={l} />);
    }}
  </Query>
);

export default Locations;
