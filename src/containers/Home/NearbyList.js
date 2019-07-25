import React from "react";
import { FlatList } from "react-native";

const NearbyList = props => {
  const { data, _renderItem } = props;
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={_renderItem}
      contentContainerStyle={{
        marginTop: 9
      }}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
    />
  );
};

export default NearbyList;
