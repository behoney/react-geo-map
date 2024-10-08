import { default as React, useState } from "react";
import { GeoDataSource, GeoMap, Popup } from "../../../src/lib";
import "./PopupExample.css";

const PopupExample: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <section style={{ width: "300px", height: "300px" }}>
      <p>{count}</p>
      <GeoMap className="popup-example-map">
        <GeoDataSource
          fitViewToData={true}
          url={`${import.meta.env.BASE_URL}sample.geojson`}
        />
        <Popup
          properties={["name"]}
          popupFunc={(properties) => {
            console.log(properties);
            return (
              <div>
                <button
                  onClick={() => {
                    console.log("count", count);
                    setCount((prev) => prev + 1);
                  }}
                >
                  Click me
                </button>
                <p>{count}</p>
                <p>{properties.name}</p>
              </div>
            );
          }}
        />
      </GeoMap>
    </section>
  );
};

export default PopupExample;
