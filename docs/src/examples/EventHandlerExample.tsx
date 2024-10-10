import React from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";

const EventHandlerExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <GeoMap>
        <GeoDataSource
          fitViewToData={true}
          url={`${import.meta.env.BASE_URL}sample.geojson`}
          onClick={(event) => {
            console.log("onClick", event);
          }}
          onMissed={() => {
            console.log("onMissed");
          }}
          onHover={(event) => {
            console.log("onHover", event);
          }}
          onDoubleClick={(event) => {
            console.log("onDoubleClick", event);
          }}
        />
      </GeoMap>
    </div>
  );
};

export default EventHandlerExample;
