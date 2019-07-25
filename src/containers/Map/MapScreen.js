import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Platform
} from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import styles from "./styles";
import HeaderBar from "../../components/Header/HeaderBar";
import SearchBox from "../../components/SearchButton/SearchBox";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from "../../assets/dimension";
import { icons } from "../../assets/icons";
import MarkerView from "./MarkerView";
import { LATITUDE, LONGITUDE, initialMarkers } from "../../library/maps";

class MapScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.0044,
        longitudeDelta: 0.0026
      },
      markers: [],
      selected: false,
      errorMessage: "",
      userLocation: null
    };
  }

  componentDidMount = () => {
    this.setState({
      markers: initialMarkers
    });
  };

  componentWillMount = () => {
    const { errorMessage } = this.state;
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    const userLocation = await Location.getCurrentPositionAsync({});

    this.setState({ userLocation });
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  _handleSearch = event => {
    const { text } = event.nativeEvent;
    this.setState({ searchText: text.trim() });
  };

  _selectMarker = () => {
    this.setState({ selected: true });
  };

  _renderUserLocation = () => {
    const { errorMessage, userLocation } = this.state;

    if (userLocation) {
      const { latitude, longitude } = userLocation.coords;
      const coordinate = { latitude, longitude };
      return (
        <Marker coordinate={coordinate} title="User Location">
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {icons.user_location}
          </View>
        </Marker>
      );
    }
  };

  // _renderDirection = async () => {
  //   // const { userLocation } = this.state;
  //   // if (userLocation) {
  //   //   const { latitude, longitude } = userLocation.coords;
  //   //   const origin = { latitude, longitude };
  //   //   const destination = {
  //   //     latitude: 21.00299,
  //   //     longitude: 105.86681
  //   //   };
  //   //   const GOOGLE_MAPS_APIKEY = "AIzaSyAEdfI7vy4A0YTnXCOEZBQMRhFI2_cBV9c";
  //   //   return (
  //   //     <MapViewDirections
  //   //       origin={origin}
  //   //       destination={destination}
  //   //       apikey={GOOGLE_MAPS_APIKEY}
  //   //     />
  //   //   );
  //   // }
  // };

  render() {
    const {
      searchText,
      markers,
      region,
      selected,
      userLocation,
      errorMessage
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={{
            flex: 1,
            position: "absolute",
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH
          }}
          // provider="google"
          // mapType={Platform.OS === "android" ? "none" : "standard"}
          region={region}
          onRegionChange={this.onRegionChange}
          onPress={() => {
            this.setState({ selected: false });
          }}
        >
          {markers.map(marker => {
            return (
              <MarkerView
                key={marker.title}
                marker={marker}
                selected={selected}
                _selectMarker={this._selectMarker}
              />
            );
          })}
          {/* <UrlTile
              urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              maximumZ={19}
            /> */}
          {this._renderUserLocation()}
        </MapView>
        <View style={{ marginTop: STATUS_BAR_HEIGHT }}>
          <SearchBox
            _handleSearch={this._handleSearch}
            searchText={searchText}
          />
        </View>
      </SafeAreaView>
    );
    // }
  }
}

export default MapScreen;
