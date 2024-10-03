import React from 'react';
import { GeoDataSource, GeoMap } from '../../../src/lib';

const DefaultMap: React.FC = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <GeoMap className='w-full h-full'>
        <GeoDataSource url="https://openlayers.org/data/geojson/countries.geojson" />
      </GeoMap>
    </div>
  );
};

export default DefaultMap;