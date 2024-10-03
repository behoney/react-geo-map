import type { Map as OlMap } from "ol";
import type React from "react";

export interface GeoMapProps {
	children?: React.ReactNode;
	className?: string;
}

export type GeoMap = React.ForwardRefExoticComponent<
	GeoMapProps & React.RefAttributes<OlMap>
>;

export interface DataSourceProps {
	url: string;
	fitViewToData?: boolean;
}

export function GeoDataSource(props: DataSourceProps): React.ReactElement;

// NOTE:: WIP
export interface PopupProps<P> {
	properties: P;
	popupFunc: (properties: P) => React.ReactNode;
}

export function Popup<P>(props: PopupProps<P>): React.ReactElement | null;

export function observeCSSVariables(
	targetElement: HTMLElement,
	callback: () => void,
): MutationObserver;
