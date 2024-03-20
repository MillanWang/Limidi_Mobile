import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { styles } from "../GridScreenToolbar";
import { theme } from "../../constants/theme";

const MIN_TIME_BETWEEN_FIX = 5000;

interface NetworkConfigButtonProps {
  isEditMode: boolean;
}

const modalOpenBorderColor = "green"; //"FFFFFF";
const settingsButtonBackgroundColor = "#888888";

export const NetworkErrorIndicator = ({
  isEditMode,
}: NetworkConfigButtonProps) => {
  const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } =
    useAppSelector((state) => state.httpCommunicationsReducer);
  const hasRecentError = mostRecentNetworkFailTime > mostRecentNetworkFixTime;
  console.log(mostRecentNetworkFailTime - mostRecentNetworkFixTime);
  const isButtonVisible = isEditMode || hasRecentError;

  return (
    <>
      {isButtonVisible && (
        <View
          style={{
            height: "100%",
            backgroundColor: `rgba(0,0,0,0)`,
            paddingHorizontal: 5,
            marginHorizontal: 10,

            borderRadius: 200,
            borderColor: hasRecentError
              ? modalOpenBorderColor
              : settingsButtonBackgroundColor,
            borderWidth: 2,
          }}
        >
          <Icon
            size={16}
            name={hasRecentError ? "wifi-off" : "wifi"}
            color={hasRecentError ? "red" : theme.color.white}
          />
        </View>
      )}
    </>
  );
};
