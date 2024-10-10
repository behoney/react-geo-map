import React from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";

const EventHandlerExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <GeoMap
        onClick={(event) => {
          console.log("onClick", event);
        }}
      >
        <GeoDataSource
          fitViewToData={true}
          url={`${import.meta.env.BASE_URL}sample.geojson`}
        />
      </GeoMap>
    </div>
  );
};

export default EventHandlerExample;
