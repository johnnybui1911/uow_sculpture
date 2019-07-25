import React from "react";
import { View, Text } from "react-native";
import Divider from "../../components/Divider/Divider";
import styles from "./styles";

export default function MapCard(props) {
  const { item } = props;
  return (
    <View style={styles.card}>
      <Text style={[styles.title, { fontSize: 20 }]}>Map</Text>
      <Divider />
    </View>
  );
}
