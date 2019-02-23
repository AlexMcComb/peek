import React from "react";

const MapView = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        maxDist
        <input type="text" name="maxDist" onChange={props.handleChange} />
      </label>
      <label>
        maxRes
        <input type="text" name="maxRes" onChange={props.handleChange} />
      </label>
      <label>
        stars
        <input type="text" name="star" onChange={props.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default MapView;
