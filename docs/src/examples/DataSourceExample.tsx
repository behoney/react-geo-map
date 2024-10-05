import React from "react";
import { GeoDataSource, GeoMap } from "../../../src/lib";

const DataSourceExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <GeoMap>
        <GeoDataSource url={`${import.meta.env.BASE_URL}sample.geojson`} />
      </GeoMap>
    </div>
  );
};

export default DataSourceExample;
