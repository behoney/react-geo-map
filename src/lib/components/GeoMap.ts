import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { forwardRef, useEffect, useId, useRef } from "react";
import { render } from "../render";
interface Props {
	children?: React.ReactNode;
	className?: string;
}

function GeoMap(props: Props, ref: React.Ref<OlMap>) {
	const map = useRef<OlMap | null>(null);
	const mapRef: React.Ref<OlMap> = ref ?? map;
	const containerRef = useRef<HTMLDivElement>(null);
	const id = useId();

	useEffect(() => {
		if (!map.current) {
			map.current = new OlMap({
				target: id,
				view: new View({
					center: [0, 0],
					zoom: 1,
				}),
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
				],
				controls: [],
			});
		}

		if (typeof mapRef === "function") {
			mapRef(map.current);
		} else if (mapRef.current === null && map.current) {
			(mapRef as React.MutableRefObject<OlMap>).current = map.current;
		}
	}, []);

	useEffect(() => {
		if (map.current && props.children) {
			render(props.children as React.ReactElement, map.current);
		}
	}, [props.children]);

	return React.createElement("div", {
		id: id,
		ref: containerRef,
		className: props.className
			? `react-geojson-map ${props.className}`
			: "react-geojson-map",
		style: {
			width: "100%",
			height: "100%",
		},
	});
}

export default forwardRef(GeoMap);
