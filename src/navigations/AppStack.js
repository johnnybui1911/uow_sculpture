import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailScreen from "../containers/Detail/DetailScreen";
import TabNavigator from "./TabNavigator";

const AppStack = createStackNavigator(
  {
    MainTab: {
      screen: TabNavigator
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    initialRouteName: "MainTab",
    headerMode: "none"
  }
);

export default AppStack;

export const AppContainer = createAppContainer(AppStack);
