import React from 'react';
import { GeoDataSource } from '../../../src/lib';

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to React Geojson Map</h1>
      <p>A library for declarative geospatial visualization using React Fiber and OpenLayers.</p>
      <GeoMap>
        <GeoDataSource url="https://openlayers.org/data/geojson/countries.geojson" />
      </GeoMap>
    </div>
  );
};

export default LandingPage;