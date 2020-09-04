import { kebabCase } from "lodash";

type Style = string | React.CSSProperties | undefined;
type StyleResult = string | React.CSSProperties;

function objectToString(style: Style): string {
  if (style == null) {
    return "";
  } else if (typeof style === "string") {
    return style;
  }
  let res: string = "";
  for (const [key, value] of Object.entries(style)) {
    res += `${kebabCase(key)}: ${value};`;
  }
  return res;
}

export function mergeStyle(
  baseStyles: Style,
  mergeStyles?: Style
): StyleResult {
  baseStyles = objectToString(baseStyles);
  mergeStyles = objectToString(mergeStyles);
  return baseStyles + mergeStyles;
}
