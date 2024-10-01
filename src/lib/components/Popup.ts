import { createElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { POPUP } from "../utils/config";

export interface PopupProps<P> {
	properties: P;
	popupFunc: (properties: P) => React.ReactNode;
}

export default function Popup<P>(props: PopupProps<P>) {
	const overlayPortalContainer = useRef<HTMLDivElement | null>(null);

	if (!overlayPortalContainer.current) {
		overlayPortalContainer.current = document.createElement("div");

		if(process.env.NODE_ENV === 'development') {
			overlayPortalContainer.current.className = "popup";
			overlayPortalContainer.current.style.zIndex = "1000";
			overlayPortalContainer.current.style.width = "200px";
			overlayPortalContainer.current.style.height = "200px";
			overlayPortalContainer.current.style.backgroundColor = "red";
		}

		document.body.appendChild(overlayPortalContainer.current);
		createPortal(
			props.popupFunc(props.properties),
			overlayPortalContainer.current
		);
	}

	useEffect(() => {

    return () => {
			document.body.removeChild(
				overlayPortalContainer.current as HTMLDivElement,
			);
			overlayPortalContainer.current = null;
		};
	}, []);



	return null;

	return createElement(POPUP, {
		...props,
		type: POPUP,
		overlayPortalContainer: overlayPortalContainer.current,
		popupFunc: props.popupFunc,
	});

}
