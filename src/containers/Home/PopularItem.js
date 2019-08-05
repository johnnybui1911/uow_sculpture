import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import images from "../../assets/images";

const PopularItem = props => {
  const { item, index, navigation } = props;
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <View
        style={{
          marginLeft: index === 0 ? 24 : 0,
          marginRight: 12
        }}
      >
        <Image
          source={images.sculptures[item.photoURL]}
          style={{
            width: 135,
            height: 186,
            borderRadius: 12
          }}
        />
        <View
          style={{
            position: "absolute",
            marginHorizontal: 10,
            top: 158,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Text style={styles.secondaryTitle}>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PopularItem;
