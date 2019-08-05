import { StyleSheet, Dimensions } from "react-native";
import palette from "../../assets/palette";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  mainImage: {
    flex: 1,
    height: height * 0.4,
    backgroundColor: "red",
    zIndex: 2,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 50
  },
  detailContainer: { zIndex: 1, flex: 3, flexDirection: "column-reverse" },
  card: {
    flex: 1,
    padding: 24,
    backgroundColor: palette.backgroundColorWhite,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 50,
    marginTop: -10,
    borderWidth: 0.5,
    borderColor: palette.secondaryTypographyColor
  },
  contentBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 36,
    color: palette.primaryColor,
    fontFamily: "Montserrat-SemiBold"
  },
  distance: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
    color: palette.primaryColorLight
  },
  alt_description: {
    fontSize: 14,
    color: palette.primaryColorLight,
    fontFamily: "Montserrat-Medium"
  },
  description: {
    fontSize: 14,
    color: palette.secondaryTypographyColor,
    fontFamily: "Montserrat-Medium"
  },
  numberStyle: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: "Montserrat-SemiBold",
    paddingLeft: 5
  },
  visitorsText: {
    opacity: 0.75,
    fontSize: 12,
    color: palette.backgroundColorWhite,
    fontFamily: "Montserrat-SemiBold"
  }
});
