import { Input } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBaseAddress } from "../../redux/slices/HttpCommunicationsSlice";
import { AddressValidationIcon } from "./AddressValidationIcon";

export function NetworkAddressInput() {
  const dispatch = useAppDispatch();
  const { tryConnection } = useWebSocketContext();

  const { baseAddress } = useAppSelector(
    (state) => state.httpCommunicationsReducer.httpCommunicationInfo
  );

  const onChangeHandler = (baseAddress: string) => {
    dispatch(setBaseAddress({ baseAddress }));
    tryConnection();
  };

  return (
    <View>
      <Input
        defaultValue={baseAddress}
        rightIcon={<AddressValidationIcon />}
        style={[styles.text]}
        onChangeText={onChangeHandler}
        placeholder={`Ex: 192.168.0.21:4848`}
        placeholderTextColor={"red"}
      ></Input>
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
