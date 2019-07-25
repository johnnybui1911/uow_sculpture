import React from "react";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { icons } from "../../assets/icons";
import styles from "./styles";

export default class MarkerView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  _renderChosenIcon = () => {
    const { selected } = this.props;
    const { pressed } = this.state;
    if (selected && pressed) {
      console.log(pressed, selected);
      return icons.chosen_marker;
    }
    return icons.marker;
  };

  render() {
    const { marker } = this.props;
    return (
      <Marker
        key={marker.title}
        coordinate={marker.coordinate}
        title={marker.title}
        onPress={() => {
          this.props._selectMarker();
          this.setState({ pressed: true });
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this._renderChosenIcon()}
          <Text style={styles.markerTitle}>{marker.title}</Text>
        </View>
      </Marker>
    );
  }
}
