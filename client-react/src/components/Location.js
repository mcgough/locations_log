import React from "react";

const Location = props => (
  <div key={props.location.id}>
    <p>{`${props.location.name}`}</p>
  </div>
);

export default Location;
