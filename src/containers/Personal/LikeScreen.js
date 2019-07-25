import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import styles from "./styles";
import { localData } from "../../library/localData";
import CardItem from "./CardItem";

class LikeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount = () => {
    this.setState({ data: localData });
  };

  _renderItem = ({ item }) => {
    return <CardItem item={item} />;
  };

  _renderList = () => {
    const { data } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1
          }}
        >
          {this._renderList()}
        </View>
      </SafeAreaView>
    );
  }
}

export default LikeScreen;
