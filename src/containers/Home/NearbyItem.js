import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import styles from "./styles";
import { icons } from "../../assets/icons";
import images from "../../assets/images";

const { width, height } = Dimensions.get("window");
// default width 327
const padding = 12;

const NearbyItem = props => {
  const { item, index, navigation } = props;
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Detail")}>
      <View
        style={{
          width: width - padding * 2,
          height: 378,
          marginHorizontal: padding,
          paddingHorizontal: padding
        }}
      >
        <Image
          source={images.sculptures[index]}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 12
          }}
        />
        <View
          style={{
            position: "absolute",
            marginHorizontal: 24,
            top: 290,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Text style={styles.title}>{item.distance} m</Text>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "space-evenly" }}
          >
            <Text style={styles.like}>{icons.like}</Text>
            <Text style={styles.like}>100</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NearbyItem;
