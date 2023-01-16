import type { CSSProperties } from "vue";

export function getShapeStyle(style) {
  const result: any = {};
  ["width", "height", "top", "left", "rotate"].forEach((attr) => {
    if (attr != "rotate") {
      result[attr] = style[attr] + "px";
    } else {
      result.transform = "rotate(" + style[attr] + "deg)";
    }
  });

  return result;
}

const needUnit = [
  "fontSize",
  "width",
  "height",
  "top",
  "left",
  "borderWidth",
  "letterSpacing",
  "borderRadius",
];
export function getStyle(style, filter: string[] = []) {
  const result: CSSProperties = {};
  Object.keys(style).forEach((key) => {
    if (!filter.includes(key)) {
      if (key != "rotate") {
        if (style[key] !== "") {
          result[key] = style[key];

          if (needUnit.includes(key)) {
            result[key] += "px";
          }
        }
      } else {
        result.transform = key + "(" + style[key] + "deg)";
      }
    }
  });

  return result;
}
