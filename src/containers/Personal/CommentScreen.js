import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import styles from "./styles";
import images from "../../assets/images";
import DividerLight from "../../components/Divider/DividerLight";

const localComments = [
  { text: "Hello", submitDate: new Date(2019, 5, 24, 10, 33, 30) },
  {
    text:
      "One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.",
    submitDate: new Date(2019, 5, 29, 10, 33, 30)
  },
  {
    text:
      "One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.",
    submitDate: new Date(2019, 5, 29, 10, 33, 30)
  },
  {
    text:
      "One of the best sculpture I have ever seen. Highly recommended for new visitors to Wollongong.",
    submitDate: new Date(2019, 5, 29, 10, 33, 30)
  },
  { text: "Hello", submitDate: new Date() }
];

class CommentScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      loading: true,
      refreshing: false
    };
  }

  componentDidMount = () => {
    this._getDate();
  };

  _getDate = () => {
    localComments.sort((a, b) => {
      return b.submitDate - a.submitDate;
    });

    this.setState({
      comments: localComments,
      refreshing: false,
      loading: false
    });
  };

  _renderItem = ({ item, index }) => {
    const username = this.props.user || "Cristiano Ronaldo";
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <View style={[]}>
          <Image
            source={images.sculptures[item.photoURL]}
            style={{ width: 60, height: 60, borderRadius: 4 }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", paddingLeft: 12 }}>
          <Text style={[styles.title, { fontSize: 16, marginBottom: 3 }]}>
            {username}
          </Text>
          <Text style={[styles.description_cmt, { marginBottom: 3 }]}>
            {item.text}
          </Text>
          <Text style={[styles.description, { fontSize: 12 }]}>
            {moment(item.submitDate).fromNow()}
          </Text>
        </View>
      </View>
    );
  };

  _renderList = () => {
    const { comments, refreshing } = this.state;
    return (
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <DividerLight />}
        refreshing={refreshing}
        onRefresh={this._handleRefresh}
        contentContainerStyle={{ padding: 24 }}
      />
    );
  };

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () =>
        this.setState({
          refreshing: false
        })
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              flex: 1
            }}
          >
            {this._renderList()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default CommentScreen;
