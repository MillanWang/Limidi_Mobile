// Helper: encode number into custom base
function encodeNumber(num) {
  const base = ipEncodingCharset.length;
  if (num === 0) return ipEncodingCharset[0];
  let encoded = "";
  while (num > 0) {
    encoded = ipEncodingCharset[num % base] + encoded;
    num = Math.floor(num / base);
  }
  return encoded;
}

// Helper: decode string back into number
function decodeNumber(str) {
  const base = ipEncodingCharset.length;
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num = num * base + ipEncodingCharset.indexOf(str[i]);
  }
  return num;
}

// Main encode
export function encodeIpPort(ipPort) {
  const [ipStr, portStr] = ipPort.split(":");
  const ipParts = ipStr.split(".").map((x) => parseInt(x, 10));
  const port = parseInt(portStr, 10);

  if (ipParts.length !== 4) throw new Error("Invalid IPv4 address");

  // Pack IP into 32-bit number
  const ipNum =
    (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];

  // Encode separately so port can be arbitrary size
  const encodedIp = encodeNumber(ipNum >>> 0, ipEncodingCharset); // unsigned
  const encodedPort = encodeNumber(port, ipEncodingCharset);

  // Separator for decode
  return `${encodedIp}${ipPortDelimeter}${encodedPort}`;
}

// Main decode
export function decodeIpPort(encoded) {
  const [encodedIp, encodedPort] = encoded.split(ipPortDelimeter);
  const ipNum = decodeNumber(encodedIp, ipEncodingCharset);
  const port = decodeNumber(encodedPort, ipEncodingCharset);

  // Unpack IP
  const ip = [
    (ipNum >>> 24) & 0xff,
    (ipNum >>> 16) & 0xff,
    (ipNum >>> 8) & 0xff,
    ipNum & 0xff,
  ].join(".");

  return `${ip}:${port}`;
}

const ipEncodingCharset = "ABCDEFGHIJKLMNPQRSTUVWYZ123456789";
const ipPortDelimeter = "X";

export const getForceValidEncodedAddress = (encodedAddress) =>
  encodedAddress
    .toUpperCase()
    .split("")
    .filter((c) => ipEncodingCharset.includes(c) || c === ipPortDelimeter)
    .join("");
