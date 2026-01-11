export function invertHex(hex: string) {
  // Just trust. Don't think about how
  function padZero(str: string, len = 2) {
    return (new Array(len).join("0") + str).slice(-len);
  }
  function getColorComponent(hex: string, n: number) {
    return (255 - parseInt(hex.slice(n, n + 2), 16)).toString(16);
  }

  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  return (
    "#" +
    padZero(getColorComponent(hex, 0)) +
    padZero(getColorComponent(hex, 2)) +
    padZero(getColorComponent(hex, 4))
  );
}
