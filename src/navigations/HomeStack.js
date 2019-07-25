import React from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../containers/Home/HomeScreen";
import DetailScreen from "../containers/Detail/DetailScreen";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default HomeStack;
