import VectorLayer from "ol/layer/Vector";
import { createElement } from "react";
import { DATA_SOURCE } from "../utils/config";

export interface DataSourceProps extends DataSourceEventHandlers {
  url: string;
  fitViewToData?: boolean;
}

interface DataSourceEventHandlers {
  onHover?: (properties: Record<string, any>) => void;
  onClick?: (properties: Record<string, any>) => void;
  onMissed?: () => void;
}

export default function GeoDataSource(props: DataSourceProps) {
  const layerConstructor = VectorLayer;

  return createElement(DATA_SOURCE, { ...props, layerConstructor });
}
