import { Input } from "@rneui/themed";
import { Label } from "../Typography";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import {
  AddressValidationIcon,
  isValidIpWithPort,
} from "./AddressValidationIcon";
import {
  decodeIpPort,
  encodeIpPort,
  getForceValidEncodedAddress,
} from "./ipEncodeDecode";
import { BodyText, Caption } from "../Typography";

export function NetworkAddressInput() {
  const dispatch = useAppDispatch();
  const { tryConnection } = useWebSocketContext();

  const baseAddress = useAppSelector(
    (state) => state.httpCommunicationsReducer.httpCommunicationInfo.baseAddress
  );
  const [displayedCode, setDisplayedCode] = useState(encodeIpPort(baseAddress));

  const onChangeHandler = (encodedAddress: string) => {
    const forceValidEncodedAddress =
      getForceValidEncodedAddress(encodedAddress);
    if (forceValidEncodedAddress.length > 15) {
      return;
    }
    setDisplayedCode(forceValidEncodedAddress);
    const baseAddress = (() => {
      try {
        return decodeIpPort(forceValidEncodedAddress);
      } catch (e) {
        return "";
      }
    })();
    if (!isValidIpWithPort(baseAddress)) {
      return;
    }
    dispatch(setBaseAddress({ baseAddress }));
    tryConnection();
  };

  return (
    <View>
      <Label>Code</Label>
      <Input
        value={displayedCode}
        rightIcon={<AddressValidationIcon />}
        style={[styles.text]}
        onChangeText={onChangeHandler}
        placeholder={`Ex: ABCDEFGX123`}
        placeholderTextColor={"red"}
      />
      <Caption>Enter the code shown in LiMIDI Desktop</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { color: theme.color.lightText },
  dialogTabSelectorContainer: {
    flexDirection: "row",
  },
  dialogContentContainer: {
    height: 500,
  },
  saveButtonContainer: {
    flexDirection: "row",
  },
});
