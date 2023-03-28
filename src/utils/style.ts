import type { CSSProperties } from "vue";
import { sin, cos } from "@/utils/translate";

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
// SVG需要过滤部分style, 如background 对应 SVG fill，在组件渲染时就过滤掉了，防止整个block染色
export function getSVGStyle(style, filter: string[] = []) {
  const result: CSSProperties = {};

  [
    "opacity",
    "width",
    "height",
    "top",
    "left",
    "rotate",
    "fontSize",
    "fontWeight",
    "lineHeight",
    "letterSpacing",
    "textAlign",
    "color",
  ].forEach((key) => {
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

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
  style = { ...style };
  if (style.rotate != 0) {
    const newWidth =
      style.width * cos(style.rotate) + style.height * sin(style.rotate);
    const diffX = (style.width - newWidth) / 2; // 旋转后范围变小是正值，变大是负值
    style.left += diffX;
    style.right = style.left + newWidth;

    const newHeight =
      style.height * cos(style.rotate) + style.width * sin(style.rotate);
    const diffY = (newHeight - style.height) / 2; // 始终是正
    style.top -= diffY;
    style.bottom = style.top + newHeight;

    style.width = newWidth;
    style.height = newHeight;
  } else {
    style.bottom = style.top + style.height;
    style.right = style.left + style.width;
  }

  return style;
}

const filterKeys = ["width", "height", "scale"];
export function getCanvasStyle(canvasStyleData) {
  const result = {};
  Object.keys(canvasStyleData)
    .filter((key) => !filterKeys.includes(key))
    .forEach((key) => {
      result[key] = canvasStyleData[key];
      if (key === "fontSize") {
        result[key] += "px";
      }
    });

  return result;
}
