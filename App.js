import React from "react";
import * as Font from "expo-font";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MainScreen from "./src/MainScreen";
import { TabContainer } from "./src/TabNavigator";

export default class App extends React.PureComponent {
  state = {
    fontLoaded: false
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      "Font-Name": require("./assets/icons/icomoon.ttf")
    });

    this.setState({ fontLoaded: true });
  };

  render() {
    if (this.state.fontLoaded) {
      return <MainScreen />;
    } else {
      return null;
    }
  }
}
