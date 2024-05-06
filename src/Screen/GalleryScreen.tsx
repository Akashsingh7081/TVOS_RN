import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { data } from "../../config/carouselData";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const leftArrow = require("../../assets/images/arrowLeft.png");
const rightArrow = require("../../assets/images/arrowRight.png");

const App = () => {
  const navigation = useNavigation();
  const [slide, setSlide] = useState(0);
  const animation = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: animation.value }] };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.slides.map((post, index) => (
        <View style={styles.tile} key={index}>
          <TouchableHighlight
            style={styles.highlight}
            underlayColor="#a8dadc"
            onPress={() => {
              navigation.navigate("ImageSrc", { imageIndex: index });
            }}
          >
            <ImageBackground
              style={{ width: "100%", height: "100%" }}
              source={{ uri: post.src }}
              imageStyle={styles.background}
            />
          </TouchableHighlight>
          <Text style={styles.title}>{post.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1faee",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tile: {
    flexBasis: "20%",
    height: 370,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  background: {
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  highlight: {
    borderRadius: 20,
    padding: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  arrowLeft: {
    width: 50,
    height: 50,
  },
  arrowRight: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -25 }],
    zIndex: 1,
  },
  carousel: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  arrowLeftContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -25 }],
    zIndex: 1,
    backgroundColor: "red",
  },
  arrowRightContainer: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: [{ translateY: -25 }],
    zIndex: 1,
  },
});

export default App;
