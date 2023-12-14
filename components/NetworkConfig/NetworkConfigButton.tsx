import { Icon } from "@rneui/themed";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { styles } from "../GridScreenToolbar";
import NetworkConfigDialog from "./NetworkConfigDialog";

const MIN_TIME_BETWEEN_FIX = 5000;

interface NetworkConfigButtonProps {
  isEditMode: boolean;
}

const modalOpenBorderColor = "green"; //"FFFFFF";
const settingsButtonBackgroundColor = "#888888";

export const NetworkConfigButton = ({
  isEditMode,
}: NetworkConfigButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } =
    useAppSelector((state) => state.httpCommunicationsReducer);
  const hasRecentError = mostRecentNetworkFailTime > mostRecentNetworkFixTime;
  console.log(mostRecentNetworkFailTime, mostRecentNetworkFixTime);
  const isButtonVisible = isEditMode || hasRecentError;

  return (
    <>
      {isButtonVisible && (
        <View
          onTouchEndCapture={() => setIsModalOpen(true)}
          style={{
            height: "100%",
            backgroundColor: settingsButtonBackgroundColor,
            paddingHorizontal: 5,
            marginHorizontal: 10,

            borderRadius: 2,
            borderColor: isModalOpen
              ? modalOpenBorderColor
              : settingsButtonBackgroundColor,
            borderWidth: 2,
          }}
        >
          <Icon
            size={16}
            name={hasRecentError ? "wifi-off" : "wifi"}
            color={hasRecentError ? "red" : "#ffffff"}
          />
          <Text
            style={{
              ...styles.modalButtonText,
              color: hasRecentError ? "red" : "#ffffff",
            }}
          >
            NETWORK
          </Text>
        </View>
      )}
      <NetworkConfigDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
