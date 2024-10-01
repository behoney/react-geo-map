import { Map as OlMap, Overlay } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import ReactDOM from "react-dom";
import ReactReconciler from "react-reconciler";
import {
	ConcurrentRoot,
	DefaultEventPriority,
} from "react-reconciler/constants.js";
import type { DataSourceProps } from "./components/GeoDataSource";
import type { OlInstance, PopupInstance, SupportedLayerType } from "./types";
import { DATA_SOURCE, POPUP } from "./utils/config";
import { observeCSSVariables } from "./utils/utils";

const roots = new WeakMap<OlMap, ReactReconciler.FiberRoot>();

function createInstance(
	type: string,
	props: Record<string, any>,
): OlInstance | null {
	try {
		if (type === DATA_SOURCE) {
			if (typeof props.layerConstructor === "function") {
				const geojsonFormat = new GeoJSON();
				const layer = new props.layerConstructor({
					source: new VectorSource({
						url: props.url,
						format: geojsonFormat,
					}),
				});

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
			const layer = child.element as SupportedLayerType;

			const targetElement = container.getTargetElement() as HTMLElement;

			const applyStyles = () => {
				const computedStyle = getComputedStyle(targetElement);
				layer.setStyle({
					"fill-color": computedStyle.getPropertyValue(
						"--data-source-polygon-fill-color",
					),
					"stroke-color": computedStyle.getPropertyValue(
						"--data-source-polygon-stroke-color",
					),
					"stroke-width": Number.parseFloat(
						computedStyle.getPropertyValue(
							"--data-source-polygon-stroke-width",
						),
					),
				});
			};

			container.addLayer(layer);

			const observer = observeCSSVariables(targetElement, applyStyles);
			observer.observe(targetElement, {
				attributes: true,
				attributeFilter: ["style", "class"],
			});

			applyStyles();

			layer.getSource()?.once("change", () => {
				if (layer.getSource()?.getState() === "ready") {
					const extent = layer.getSource()?.getExtent();

					if (
						child.props?.fitViewToData &&
						extent &&
						!extent.every((value) => !Number.isFinite(value))
					) {
						container.getView().fit(extent, {
							padding: [20, 20, 20, 20],
							maxZoom: 19,
							duration: 1000,
						});
					}
				}
			});
		} else if (child.type === POPUP) {
			const popupInstance = child as PopupInstance;
			container.addOverlay(popupInstance.popupOverlay);

			if (!popupInstance)
				console.error("popupInstance is null, this feature is WIP");

			container.on("singleclick", (event) => {
				const feature = container.forEachFeatureAtPixel(
					event.pixel,
					(feature) => feature,
				);

				if (feature) {
					const coordinate = event.coordinate;
					popupInstance.popupOverlay.setPosition(coordinate);
					ReactDOM.render(
						popupInstance.popupFunc(
							feature.getProperties(),
						) as React.ReactElement,
						popupInstance.popupOverlay.getElement() as HTMLElement,
					);
				} else {
					popupInstance.popupOverlay?.setPosition(undefined);
					if (popupInstance.popupOverlay?.getElement()) {
						ReactDOM.unmountComponentAtNode(
							popupInstance.popupOverlay.getElement() as HTMLElement,
						);
					}
				}
			});
		}
	}
}
function removeChild(parent: OlInstance | null, child: OlInstance | null) {
	if (parent?.element instanceof OlMap && child) {
		(parent.element as OlMap).removeLayer(child.element as SupportedLayerType);
	}
	if (child?.element instanceof Overlay) {
		(child as PopupInstance).popupOverlay.setMap(null);
	}
}

function commitUpdate(
	instance: OlInstance,
	updatePayload: any,
	type: string,
	nextProps: any,
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
	nextProps: Record<string, any>,
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
			null,
		);
		roots.set(container, root);
	}

	reconciler.updateContainer(element, root, null, () => {});
}
