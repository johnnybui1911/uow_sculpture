import React from "react";
import { View } from "react-native";
import palette from "../../assets/palette";

const VerticalDivider = () => (
  <View
    style={{
      height: 40,
      backgroundColor: palette.dividerColor,
      width: 1,
      marginVertical: 20
    }}
  />
);

export default VerticalDivider;
