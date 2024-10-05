import React from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";

const HelloWorldExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <GeoMap>
        <GeoDataSource fitViewToData={true} url="hello-world.geojson" />
      </GeoMap>
    </div>
  );
};

export default HelloWorldExample;
