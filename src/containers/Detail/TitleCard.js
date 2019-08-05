import React from "react";
import { View, Text } from "react-native";
import Divider from "../../components/Divider/Divider";
import { icons } from "../../assets/icons";
import styles from "./styles";

export default function TitleCard(props) {
  const { item } = props;
  return (
    <View
      style={[styles.card, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}
    >
      <Text style={styles.distance}>{item.distance} m</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Divider />
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginRight: 20
          }}
        >
          {icons.like_fill}
          <Text style={styles.numberStyle}>100</Text>
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          {icons.comment}
          <Text style={styles.numberStyle}>2</Text>
        </View>
      </View>
    </View>
  );
}
