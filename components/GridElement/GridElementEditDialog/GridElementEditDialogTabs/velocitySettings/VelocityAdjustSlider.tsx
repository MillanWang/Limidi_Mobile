import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Slider, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const VelocityAdjustSlider = (props: {
  velocity: number;
  setVelocity: (velocity: number) => void;
  backgroundColor?: string;
  textColor?: string;
}) => {
  const { velocity, setVelocity, backgroundColor, textColor } = props;
  return (
    <>
      <Slider
        maximumValue={127}
        minimumValue={0}
        step={1}
        value={velocity}
        onValueChange={setVelocity}
        maximumTrackTintColor={backgroundColor}
        minimumTrackTintColor={textColor}
        thumbStyle={{ backgroundColor, borderWidth: 1, borderColor: textColor }}
        thumbProps={{
          children: (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text style={{ color: textColor }}>{velocity}</Text>
            </View>
          ),
        }}
      />
      <MultiSlider
        isMarkersSeparated
        values={[velocity, 127]}
        onValuesChange={(e) => {
          console.log("e", e);
        }}
        min={0}
        max={127}
        step={1}
      />
    </>
  );
};
