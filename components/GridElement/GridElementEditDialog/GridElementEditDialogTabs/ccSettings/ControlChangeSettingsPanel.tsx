import React from "react";
import { View } from "react-native";
import { ControlChangeIndexSettings } from "./ControlChangeIndexSettings";
import { ControlChangeIconSettings } from "../ControlChangeIconSettings";

export interface ControlChangeSettingsPanelProps {
  index: number;
}

export function ControlChangeSettingsPanel({
  index,
}: ControlChangeSettingsPanelProps) {
  return (
    <View>
      <ControlChangeIndexSettings index={index} />
      <ControlChangeIconSettings index={index} />
    </View>
  );
}
