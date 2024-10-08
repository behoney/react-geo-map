import React from "react";
import { GeoDataSource, GeoMap, Popup } from "../../../src/lib";
import "./PopupExample.css";

const PopupExample: React.FC = () => {
  return (
    <section style={{ width: "300px", height: "300px" }}>
      <GeoMap className="popup-example-map">
        <GeoDataSource
          fitViewToData={true}
          url={`${import.meta.env.BASE_URL}sample.geojson`}
        />
        <Popup
          properties={["name"]}
          popupFunc={(properties) => {
            console.log(properties);
            return <div>{properties.name}</div>;
          }}
        />
      </GeoMap>
    </section>
  );
};

export default PopupExample;
