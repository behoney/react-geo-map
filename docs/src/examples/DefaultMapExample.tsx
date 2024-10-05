import React from 'react';
import { GeoMap } from "../../../src/lib";

const DefaultMapExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <GeoMap />
    </div>
  );
};

export default DefaultMapExample;
