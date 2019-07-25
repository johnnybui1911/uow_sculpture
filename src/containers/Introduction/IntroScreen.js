import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import palette from "../../assets/palette";
import { icons, CustomIcon } from "../../assets/icons";
import { SCREEN_HEIGHT } from "../../assets/dimension";

const IntroScreen = () => (
  <View style={styles.container}>
    <View
      style={{
        marginTop: SCREEN_HEIGHT / 5,
        marginBottom: SCREEN_HEIGHT / 20,
        paddingRight: 40
      }}
    >
      {icons.logo}
    </View>
    <View
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={styles.title}>WELCOME TO</Text>
      <Text style={[styles.title]}>UOW SCULPTURES</Text>
    </View>
    <View
      style={{
        marginTop: SCREEN_HEIGHT / 20,
        marginBottom: SCREEN_HEIGHT / 20,
        alignItems: "center"
      }}
    >
      <Text style={styles.description}>
        The University of Wollongong Art Collection includes various outdoor
        sculptures located throughout the University grounds.
      </Text>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end"
      }}
    >
      <CustomIcon
        name="back"
        style={{ transform: [{ rotate: "90deg" }] }}
        size={40}
        color={palette.backgroundColorWhite}
      />
    </View>
    <Text
      style={[
        styles.description,
        {
          fontFamily: "Montserrat-SemiBold"
        }
      ]}
    >
      Swipe up to get started
    </Text>
  </View>
);

export default IntroScreen;
