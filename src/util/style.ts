import { isEmpty } from "./base";

type Style = string | React.CSSProperties | undefined;
type StyleResult = string | React.CSSProperties;

function objectToString(object: object | string): string {
  if (typeof object === "string") return object;
  let res: string = "";
  Object.keys(object).forEach((key) => {
    if (object[key] != null) {
      res += `${key}:${object[key]};`;
    }
  });
  return res;
}

export function mergeStyle(baseStyles: Style, mergeStyles: Style): StyleResult {
  if (!baseStyles || isEmpty(baseStyles)) {
    return mergeStyles || "";
  } else if (!mergeStyles || isEmpty(mergeStyles)) {
    return baseStyles || "";
  }
  baseStyles = objectToString(baseStyles);
  mergeStyles = objectToString(mergeStyles);
  return baseStyles + ";" + mergeStyles;
}
