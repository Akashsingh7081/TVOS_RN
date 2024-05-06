import React, { useState, useRef } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { data } from "../../config/carouselData";
// import { TVFocusGuideView } from "react-native";
 import {TVFocusGuideView} from "react-native-tvos";


const leftArrow = require("../../assets/images/Left1.png");
const rightArrow = require("../../assets/images/right2.png");
const { height, width } = Dimensions.get("window");
const IMAGE_SIZE = 80;
const SPACING = 10;

const ImageScreen = ({ route }) => {
  const { imageIndex } = route.params;
  const [activeIndex, setActiveIndex] = useState(imageIndex || 0);

  const ref = useRef();
  const downRef = useRef();

  const handleNext = () => {
    if (activeIndex < data.slides.length - 1) {
      setActiveIndex(activeIndex + 1);
      ref.current.scrollToIndex({ animated: true, index: activeIndex + 1 });
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      ref.current.scrollToIndex({ animated: true, index: activeIndex - 1 });
    }
  };

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    ref?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      downRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      downRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.carousel}>
      <Image
        source={{ uri: item.src }}
        style={[StyleSheet.absoluteFillObject]}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <TVFocusGuideView> */}
        <FlatList
          ref={ref}
          data={data.slides}
          renderItem={renderItem}
          horizontal
          initialScrollIndex={imageIndex || 0}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            //setActiveIndex(index);
            scrollToActiveIndex(index);
          }}
        />
        <FlatList
          ref={downRef}
          data={data.slides}
          horizontal
          initialScrollIndex={imageIndex || 0}
          showsHorizontalScrollIndicator={false}
          style={{ position: "absolute", bottom: SPACING }}
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                <Image
                  source={{ uri: item.src }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    //marginRight: SPACING,
                    //borderWidth: 5,
                    marginHorizontal: activeIndex === index ? 20 : 0,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Image source={leftArrow} style={styles.arrowLeft} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Image source={rightArrow} style={styles.arrowRight} />
          </TouchableOpacity>
        </View>
      {/* </TVFocusGuideView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    width,
    height: height,
    flex: 1,
    position: "relative",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    zIndex: 1,
    position: "absolute",
    top: "45%",
  },
  button: {
    width: "4%",
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: 0.6,
  },
  arrowLeft: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  arrowRight: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default ImageScreen;
