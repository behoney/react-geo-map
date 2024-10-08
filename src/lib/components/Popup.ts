import { createElement, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { POPUP } from "../utils/config";

export interface PopupProps<P> {
  properties: P;
  popupFunc: (properties: P) => React.ReactNode;
}

export default function Popup<P>(props: PopupProps<P>) {
  const overlayPortalContainer = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);

  if (!overlayPortalContainer.current) {
    overlayPortalContainer.current = document.createElement("div");
    rootRef.current = createRoot(overlayPortalContainer.current);

    if (process.env.NODE_ENV === "development") {
      overlayPortalContainer.current.className = "popup";
      overlayPortalContainer.current.style.zIndex = "1000";
      overlayPortalContainer.current.style.width = "200px";
      overlayPortalContainer.current.style.height = "200px";
      overlayPortalContainer.current.style.backgroundColor = "red";
    }

    document.body.appendChild(overlayPortalContainer.current);
    // console.log("div", overlayPortalContainer.current);

    // createPortal(
    //   props.popupFunc(props.properties),
    //   overlayPortalContainer.current
    // );
  }

  useEffect(() => {
    return () => {
      if (overlayPortalContainer.current) {
        document.body.removeChild(
          overlayPortalContainer.current as HTMLDivElement
        );
        overlayPortalContainer.current = null;
      }
    };
  }, []);

  // NOTE:: WIP
  // return null;

  return createElement(POPUP, {
    ...props,
    type: POPUP,
    overlayPortalContainer: overlayPortalContainer.current,
    reactRoot: rootRef.current,
    popupFunc: props.popupFunc,
  });
}
