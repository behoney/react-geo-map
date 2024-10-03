import React from 'react';
import { GeoDataSource, GeoMap } from '../../../src/lib';

const DataSource: React.FC = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <GeoMap className='w-full h-full'>
        <GeoDataSource url="sample.geojson" />
      </GeoMap>
    </div>
  );
};

export default DataSource;