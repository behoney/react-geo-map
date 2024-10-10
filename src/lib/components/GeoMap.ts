import { MapBrowserEvent, Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { forwardRef, useEffect, useId, useMemo, useRef } from "react";
import { render } from "../render";
interface Props extends MapEventHandlers {
  children?: React.ReactNode;
  className?: string;
}

interface MapEventHandlers {
  onClick?: (event: MapBrowserEvent<UIEvent>) => void;
  onContextMenu?: (event: MapBrowserEvent<UIEvent>) => void;
  onDoubleClick?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerUp?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerDown?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerOver?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerOut?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerEnter?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerLeave?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerMove?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointerMissed?: () => void;
  onMoveEnd?: (event: MapBrowserEvent<UIEvent>) => void;
  onMoveStart?: (event: MapBrowserEvent<UIEvent>) => void;
  onMove?: (event: MapBrowserEvent<UIEvent>) => void;
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

  const eventHandlers = useMemo(() => {
    const handlers: Partial<
      Record<keyof MapEventHandlers, (event: MapBrowserEvent<UIEvent>) => void>
    > = {};
    (Object.keys(props) as Array<keyof MapEventHandlers>).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        handlers[key] = (event: MapBrowserEvent<UIEvent>) => {
          (props[key] as (event: MapBrowserEvent<UIEvent>) => void)(event);
        };
      }
    });
    return handlers;
  }, [props]);

  useEffect(() => {
    if (map.current) {
      // Remove existing event listeners
      Object.keys(eventHandlers).forEach((key) => {
        const olEventName = key.charAt(2).toLowerCase() + key.slice(3);
        map.current?.un(
          olEventName,
          eventHandlers[key as keyof MapEventHandlers]
        );
      });

      // Add new event listeners
      Object.keys(eventHandlers).forEach((key) => {
        const olEventName = key.charAt(2).toLowerCase() + key.slice(3);
        map.current?.on(
          olEventName,
          eventHandlers[key as keyof MapEventHandlers]
        );
      });
    }

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      if (map.current) {
        Object.keys(eventHandlers).forEach((key) => {
          const olEventName = key.charAt(2).toLowerCase() + key.slice(3);
          map.current?.un(
            olEventName,
            eventHandlers[key as keyof MapEventHandlers]
          );
        });
      }
    };
  }, [eventHandlers]);

  console.log("eventHandlers", eventHandlers);

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
