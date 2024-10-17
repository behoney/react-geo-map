export const dataSourceStyles: {
  key: string;
  cssVar: string;
  fallback: string | number;
  parse?: (value: string | number) => number;
}[] = [
  {
    key: "fill-color",
    cssVar: "--data-source-polygon-fill-color",
    fallback: "rgba(126, 188, 111, 0.1)",
  },
  {
    key: "stroke-color",
    cssVar: "--data-source-polygon-stroke-color",
    fallback: "rgba(91, 124, 186, 1)",
  },
  {
    key: "stroke-width",
    cssVar: "--data-source-polygon-stroke-width",
    fallback: 2,
    parse: Number.parseFloat,
  },
  {
    key: "circle-radius",
    cssVar: "--data-source-circle-radius",
    fallback: 10,
    parse: Number.parseFloat,
  },
  {
    key: "circle-fill-color",
    cssVar: "--data-source-circle-fill-color",
    fallback: "rgba(255, 0, 0, 0.5)",
  },
  {
    key: "circle-stroke-color",
    cssVar: "--data-source-circle-stroke-color",
    fallback: "rgba(0, 0, 255, 1)",
  },
  {
    key: "circle-stroke-width",
    cssVar: "--data-source-circle-stroke-width",
    fallback: 2,
    parse: Number.parseFloat,
  },
];
