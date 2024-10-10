import React from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";

const HelloWorldExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <GeoMap>
        <GeoDataSource
          fitViewToData={true}
          url={`${import.meta.env.BASE_URL}hello-world.geojson`}
        />
      </GeoMap>
    </div>
  );
};

export default HelloWorldExample;
