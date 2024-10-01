import type { Map as OlMap, Overlay } from "ol";
import type VectorLayer from "ol/layer/Vector";

export type SupportedLayerType = VectorLayer;

export interface OlInstance {
  type: string;
  element: OlMap | SupportedLayerType | Overlay;
  props?: Record<string, any>;
}

export interface PopupInstance extends OlInstance {
  popupOverlay: Overlay;
  popupFunc: (properties: any) => React.ReactNode;
}
