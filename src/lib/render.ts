import { Map as OlMap, Overlay } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import ReactReconciler from "react-reconciler";
import {
  ConcurrentRoot,
  DefaultEventPriority,
} from "react-reconciler/constants.js";
import type { DataSourceProps } from "./components/GeoDataSource";
import { renderDataSource } from "./renderers/dataSourceRenderer";
import { renderPopup } from "./renderers/PopupRenderer";
import type { OlInstance, PopupInstance, SupportedLayerType } from "./types";
import { DATA_SOURCE, POPUP } from "./utils/config";

const roots = new WeakMap<OlMap, ReactReconciler.FiberRoot>();

function createInstance(
  type: string,
  props: Record<string, any>
): OlInstance | null {
  try {
    if (type === DATA_SOURCE) {
      if (typeof props.layerConstructor === "function") {
        const source = new VectorSource({
          url: props.url,
          format: new GeoJSON(),
        });

        const layer = new props.layerConstructor({
          source,
        }) as SupportedLayerType;

        return { type, element: layer, props };
      }
    }

    if (type === POPUP) {
      // NOTE:: WIP
      const popupOverlay = new Overlay({
        element: props.overlayPortalContainer,
      });

      return { type, element: popupOverlay, props };
    }
  } catch (error) {
    console.error("Error in createInstance", error);
    return null;
  }
  return null;
}

function appendChildToContainer(container: OlMap, child: OlInstance) {
  if (container instanceof OlMap) {
    if (child.type === DATA_SOURCE) {
      renderDataSource(child, container);
    } else if (child.type === POPUP) {
      renderPopup(child, container);
    }
  }
}

function removeChild(parent: OlInstance | null, child: OlInstance | null) {
  if (parent?.element instanceof OlMap && child.type === DATA_SOURCE) {
    (parent.element as OlMap).removeLayer(child.element as SupportedLayerType);
    (parent.element as OlMap).un("click", child.props.onClick);
    (parent.element as OlMap).un("pointermove", child.props.onHover);
    (parent.element as OlMap).un("pointermove", child.props.onMissed);
  } else if (child?.element instanceof Overlay) {
    (child as PopupInstance).popupOverlay.setMap(null);
  }
}

function commitUpdate(
  instance: OlInstance,
  updatePayload: any,
  type: string,
  nextProps: any
) {
  if (type === DATA_SOURCE) {
    if (
      (updatePayload as DataSourceProps).url &&
      (instance?.element as SupportedLayerType).getSource()
    ) {
      (instance?.element as SupportedLayerType)
        .getSource()
        ?.setUrl((updatePayload as DataSourceProps).url);
    }
  }
}

function prepareUpdate(
  instance: OlInstance,
  type: string,
  prevProps: Record<string, any>,
  nextProps: Record<string, any>
) {
  if (type === DATA_SOURCE && prevProps.url !== nextProps.url) {
    return { url: nextProps.url };
  }
  if (type === POPUP && prevProps.overlay !== nextProps.overlay) {
    return { overlay: nextProps.overlay };
  }
  return null;
}

const reconciler = ReactReconciler({
  supportsMutation: true,
  createInstance,
  createTextInstance: () => null,
  appendChildToContainer,
  appendChild: (parent, child) => {},
  removeChild,
  insertBefore: (parent, child, beforeChild) => {},
  commitUpdate,
  removeChildFromContainer: (container, child) => {
    if (container instanceof OlMap) {
      (container as OlMap).removeLayer(child?.element as SupportedLayerType);
    }
  },
  insertInContainerBefore: (container, child, beforeChild) => {},
  prepareUpdate,
  finalizeInitialChildren: () => {
    return false;
  },
  getPublicInstance: (instance) => instance,
  getChildHostContext: () => ({}),
  getRootHostContext: () => ({}),
  getCurrentEventPriority: () => DefaultEventPriority,
  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  clearContainer: () => null,
  appendInitialChild: (container, child) => {},
  shouldSetTextContent: () => false,
  detachDeletedInstance: () => {},
  supportsPersistence: false,
  preparePortalMount: () => {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  isPrimaryRenderer: false,
  warnsIfNotActing: true,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => null,
  supportsHydration: false,
});

export function render(element: React.ReactElement, container: OlMap) {
  let root = roots.get(container);
  if (!root) {
    root = reconciler.createContainer(
      container,
      ConcurrentRoot,
      null,
      false,
      null,
      "",
      () => {},
      null
    );
    roots.set(container, root);
  }

  reconciler.updateContainer(element, root, null, () => {});
}
