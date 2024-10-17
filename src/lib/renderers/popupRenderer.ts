import { Map as OlMap } from "ol";
import ReactDOM from "react-dom";
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

    if (feature) {
      const coordinate = event.coordinate;
      popupInstance.popupOverlay.setPosition(coordinate);
      ReactDOM.render(
        popupInstance.popupFunc(feature.getProperties()) as React.ReactElement,
        popupInstance.popupOverlay.getElement() as HTMLElement
      );
    } else {
      popupInstance.popupOverlay?.setPosition(undefined);
      if (popupInstance.popupOverlay?.getElement()) {
        ReactDOM.unmountComponentAtNode(
          popupInstance.popupOverlay.getElement() as HTMLElement
        );
      }
    }
  });
};
