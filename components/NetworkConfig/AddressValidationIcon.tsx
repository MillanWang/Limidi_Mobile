import { Icon } from "@rneui/themed";
import React, { useMemo } from "react";
import { theme } from "../../constants/theme";
import { useAppSelector } from "../../redux/hooks";
import { Label, TypographyKind } from "../Typography";

export function AddressValidationIcon() {
  const { baseAddress } = useAppSelector(
    (state) => state.httpCommunicationsReducer.httpCommunicationInfo,
  );
  const isValid = useMemo(() => isValidIpWithPort(baseAddress), [baseAddress]);

  if (isValid) {
    return <></>;
  }

  const isMissing = baseAddress === "";
  const color = isMissing ? theme.color.warningText : theme.color.errorText;
  const labelKind = isMissing ? TypographyKind.WARNING : TypographyKind.ERROR;
  const labelText = isMissing ? "Missing" : "Invalid";
  const iconName = isMissing ? "warning" : "alert-circle";
  return (
    <>
      <Icon name={iconName} type="ionicon" color={color} />
      <Label kind={labelKind} style={{ width: 50, textAlign: "center" }}>
        {labelText}
      </Label>
    </>
  );
}

export function isValidIpWithPort(addr: string) {
  function isValidIPAddress(ipAddress: string): boolean {
    const segments = ipAddress.split(".");
    if (segments.length !== 4) return false;

    for (const segment of segments) {
      const num = parseInt(segment, 10);
      if (isNaN(num) || num < 0 || num > 255) return false;
    }
    return true;
  }

  function isValidPort(portString: string) {
    const portAsNumber = parseInt(parts[1], 10);

    return (
      `${portAsNumber}`.length === portString.length &&
      !isNaN(portAsNumber) &&
      portAsNumber > 0 &&
      portAsNumber < 65535
    );
  }

  if (addr === undefined) return false;

  const parts = addr.split(":");
  return (
    parts.length === 2 && isValidIPAddress(parts[0]) && isValidPort(parts[1])
  );
}
