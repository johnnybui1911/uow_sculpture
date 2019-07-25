import { StyleSheet } from "react-native";
import palette from "../../assets/palette";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  flatList: {
    marginTop: 9,
    width: "100%"
  },
  title: {
    fontSize: 20,
    color: palette.primaryColor,
    fontFamily: "Montserrat-SemiBold"
  },
  distance: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    color: palette.primaryColorLight
  },
  markerTitle: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    color: palette.secondaryColor
  }
});
