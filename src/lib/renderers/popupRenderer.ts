import { Map as OlMap } from "ol";
import ReactDOM from "react-dom/client";
import { OlInstance, PopupInstance } from "../types";

// NOTE:: This function is WIP
export const renderPopup = (child: OlInstance, container: OlMap) => {
  const popupInstance = child as PopupInstance;
  container.addOverlay(popupInstance.popupOverlay);

  if (!popupInstance)
    console.error("popupInstance is null, this feature is WIP");

  container.on("singleclick", (event) => {
    const feature = container.forEachFeatureAtPixel(
      event.pixel,
      (feature) => feature
    );

    if (popupInstance.props.overlay) {
      const root = ReactDOM.createRoot(
        popupInstance.props.overlayPortalContainer
      );

      if (feature) {
        const coordinate = event.coordinate;
        popupInstance.popupOverlay.setPosition(coordinate);
        root.render(
          popupInstance.popupFunc(feature.getProperties()) as React.ReactElement
        );
      } else {
        popupInstance.popupOverlay?.setPosition(undefined);
        if (popupInstance.popupOverlay?.getElement()) {
          root.unmount();
        }
      }
    }
  });
};
