import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import NetworkConfigDialog from "./NetworkConfigDialog";

const MIN_TIME_BETWEEN_FIX = 5000;

interface NetworkConfigButtonProps {
    isEditMode: boolean;
}

export const NetworkConfigButton = ({ isEditMode }: NetworkConfigButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } = useAppSelector((state) => state.httpCommunicationsReducer);
    const hasRecentError = mostRecentNetworkFailTime - mostRecentNetworkFixTime > MIN_TIME_BETWEEN_FIX;
    const isButtonVisible = isEditMode || hasRecentError;

    return (
        <>
            {isButtonVisible && (
                <View>
                    <Icon
                        name={hasRecentError ? "wifi-off" : "wifi"}
                        color={hasRecentError ? "red" : "#ffffff"}
                        onPress={() => setIsModalOpen(true)}
                    />
                </View>
            )}
            <NetworkConfigDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};
