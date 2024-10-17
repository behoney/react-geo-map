import { Map as OlMap } from "ol";
import { dataSourceStyles } from "../dataSourceStyleConfig";
import { OlInstance, SupportedLayerType } from "../types";
import { observeCSSVariables } from "../utils/utils";

export const renderDataSource = (child: OlInstance, container: OlMap) => {
  const layer = child.element as SupportedLayerType;

  const targetElement = container.getTargetElement() as HTMLElement;

  const styleConfig = dataSourceStyles;

  const applyStyles = () => {
    const computedStyle = getComputedStyle(targetElement);
    const styles = styleConfig.reduce(
      (acc, { key, cssVar, fallback, parse }) => {
        const value = computedStyle.getPropertyValue(cssVar) || fallback;
        acc[key] = parse ? parse(value) : value;
        return acc;
      },
      {} as Record<string, string | number>
    );

    layer.setStyle(styles);
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

      container.on("click", (event) => {
        const features = container.getFeaturesAtPixel(event.pixel);
        // TODO:: filter by source url
        if (features.length > 0) {
          child.props.onClick?.(features[0].getProperties());
        } else {
          child.props.onClick?.();
        }
      });

      container.on("pointermove", (event) => {
        const features = container.getFeaturesAtPixel(event.pixel);
        // TODO:: filter by source url
        if (features.length > 0) {
          child.props.onHover?.(features[0].getProperties());
        } else {
          child.props.onMissed?.();
        }
      });
    }
  });
};
