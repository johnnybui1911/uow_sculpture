import React from "react";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import { localData } from "../../library/localData";
import images from "../../assets/images";
import styles from "./styles";
import TitleCard from "./TitleCard";
import FeatureCard from "./FeatureCard";
import DescriptionCard from "./DescriptionCard";
import MapCard from "./MapCard";
import { CustomIcon } from "../../assets/icons";

const localItem = localData[0];

class DetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: localItem
    };
  }

  //   componentDidMount = () => {
  //     this.setState({ item: localItem });
  //   };

  render() {
    const { item } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainImage}>
            <Image
              source={images.sculptures[0]}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12
              }}
            />
            <CustomIcon
              onPress={() => this.props.navigation.goBack()}
              style={{ position: "absolute", marginHorizontal: 24, top: 56 }}
              name="back"
              size={24}
              color="#fff"
            />
            <View
              style={{
                position: "absolute",
                marginHorizontal: 24,
                top: 290
              }}
            >
              <Text style={styles.visitorsText}>100 visitors</Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <MapCard item={item} />
            <DescriptionCard item={item} />
            <FeatureCard item={item} />
            <TitleCard item={item} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default DetailScreen;
