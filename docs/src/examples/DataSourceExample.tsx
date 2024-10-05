import React from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";
import "./DataSourceExample.css";

const options = [
  {
    title: "Update fill color",
    property: "--data-source-polygon-fill-color",
    defaultValue: "#ff0000",
    type: "color",
  },
  {
    title: "Update stroke color",
    property: "--data-source-polygon-stroke-color",
    defaultValue: "#000000",
    type: "color",
  },
  {
    title: "Update stroke width",
    property: "--data-source-polygon-stroke-width",
    type: "number",
    defaultValue: "2",
  },
];

const DataSourceExample: React.FC = () => {
  return (
    <>
      <section style={{ width: "300px", height: "300px" }}>
        <GeoMap className="data-source-example-map">
          <GeoDataSource
            fitViewToData={true}
            url={`${import.meta.env.BASE_URL}sample.geojson`}
          />
        </GeoMap>
      </section>
      <section>
        <h3>Update CSS Variables</h3>
        <div className="data-source-example-options">
          {options.map((item, index) => (
            <div className="data-source-example-option" key={index}>
              <label>{item.title}</label>
              <input
                defaultValue={item.defaultValue}
                title={item.title}
                type={item.type}
                onChange={(e) => {
                  const map = document.querySelector(
                    `.data-source-example-map`
                  ) as HTMLElement;

                  map.style.setProperty(
                    item.property,
                    e.target.value + (item.type === "number" ? "px" : "")
                  );
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DataSourceExample;
