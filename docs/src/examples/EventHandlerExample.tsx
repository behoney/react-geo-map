import React, { useState } from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";

const EventHandlerExample: React.FC = () => {
  const [clickedFeature, setClickedFeature] = useState("");
  const [hoveredFeature, setHoveredFeature] = useState("");
  return (
    <section>
      <h1>EventHandlerExample</h1>
      <div style={{ width: "300px", height: "300px" }}>
        <GeoMap>
          <GeoDataSource
            fitViewToData={true}
            url={`${import.meta.env.BASE_URL}sample.geojson`}
            onClick={(feature) => {
              setClickedFeature(feature?.name ?? "");
            }}
            onMissed={() => {
              setHoveredFeature("");
            }}
            onHover={(feature) => {
              setHoveredFeature(feature?.name ?? "");
            }}
          />
        </GeoMap>
      </div>
      <ul>
        <li>Clicked Feature: {clickedFeature}</li>
        <li>Hovered Feature: {hoveredFeature}</li>
      </ul>
    </section>
  );
};

export default EventHandlerExample;
