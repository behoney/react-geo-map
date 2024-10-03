import type React from "react";

export interface GeoMapProps {
	children?: React.ReactNode;
	className?: string;
}

export function GeoMap(props: GeoMapProps): React.ReactElement;

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
