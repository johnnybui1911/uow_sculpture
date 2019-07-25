import React from "react";
import { View, Text } from "react-native";
import Divider from "../../components/Divider/Divider";
import styles from "./styles";

export default function DescriptionCard(props) {
  const { item } = props;
  return (
    <View style={styles.card}>
      <Text style={[styles.title, { fontSize: 20 }]}>Description</Text>
      <View>
        <Text style={[styles.title, { fontSize: 14, paddingBottom: 20 }]}>
          Location General Notes
        </Text>
        <Text style={styles.description}>{item.description.location}</Text>
      </View>
      <Divider />
      <View>
        <Text style={[styles.title, { fontSize: 14, paddingBottom: 20 }]}>
          Credit Line
        </Text>
        <Text style={styles.description}>{item.description.creditLine}</Text>
      </View>
    </View>
  );
}
