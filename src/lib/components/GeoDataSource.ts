import VectorLayer from "ol/layer/Vector";
import { createElement } from "react";
import { DATA_SOURCE } from "../utils/config";

export interface DataSourceProps {
  url: string;
  fitViewToData?: boolean;
}

export default function GeoDataSource(props: DataSourceProps) {
  const layerConstructor = VectorLayer;

  return createElement(DATA_SOURCE, { ...props, layerConstructor });
}
