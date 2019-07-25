import { Platform, Dimensions, StatusBar } from "react-native";

export const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
export const SCREEN_HEIGHT =
  Platform.OS === "android"
    ? Dimensions.get("window").height // - STATUS_BAR_HEIGHT
    : Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
