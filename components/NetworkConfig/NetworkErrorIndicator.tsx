import { Icon } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { theme } from "../../constants/theme";
import { useAppSelector } from "../../redux/hooks";

interface NetworkConfigButtonProps {
  isEditMode: boolean;
}

export const NetworkErrorIndicator = ({
  isEditMode,
}: NetworkConfigButtonProps) => {
  const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } =
    useAppSelector((state) => state.httpCommunicationsReducer);

  const hasRecentError = mostRecentNetworkFailTime > mostRecentNetworkFixTime;
  const isButtonVisible = isEditMode || hasRecentError;

  return (
    <>
      {isButtonVisible && (
        <View style={{ marginHorizontal: 16 }}>
          <Icon
            size={24}
            name={hasRecentError ? "wifi-off" : "wifi"}
            color={hasRecentError ? "red" : theme.color.white}
          />
        </View>
      )}
    </>
  );
};
