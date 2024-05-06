import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ImageData } from "../../config/fakeData";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { UserContext } from "../../App";
// import { TVGridLayout, TVTouchable, Image } from 'react-native-tvos';
//"react-native": "npm:react-native-tvos@^0.73.4-0",


const bgImage = require("../../assets/images/sunset.jpg");
const hamBurger = require("../../assets/images/hamburger.png");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { homeGallery, setHomeGallery } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
  };
  const openMenu = () => {
    setIsMenuVisible(true);
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const handleMenuItemPress = () => {
    hideMenu();
  };

  const handleSaveImage = () => {
    // if (!textInputValue) {
    //   Alert.alert("Error", "Please enter a folder name.");
    //   return;
    // }
    console.log("___aaaaa", homeGallery.length);
    const newImage = {
      key: homeGallery.length + 1,
      title: "hhhh",
      folderImage: require("../../assets/images/folderImage.png"),
    };

    setHomeGallery([...homeGallery, newImage]);
    setModalVisible(false);
    setTextInputValue("");
    console.log("___bbbb", homeGallery.length);
  };

  // console.log("aakas", modalVisible);

  return (
    <View style={styles.container}>
      <Image source={bgImage} style={styles.backgroundImage} />
      <TouchableHighlight
        style={styles.menubarhighlight}
        underlayColor="#a8dadc"
        onPress={openMenu}
      >
        <Image
          source={hamBurger}
          style={{ width: 60, height: 60, borderRadius: 5 }}
        />
      </TouchableHighlight>

      {/* Menu bar */}

      <TouchableHighlight>
        <Menu
          visible={isMenuVisible}
          onRequestClose={hideMenu}
          style={{ width: 220, marginHorizontal: 16 }}
        >
          <TouchableHighlight
            style={styles.menubarListhighlight}
            underlayColor="#a8dadc"
            onPress={hideMenu}
          >
            <MenuItem
              onPress={handleMenuItemPress}
              style={{ height: 20 }}
              textStyle={{ fontSize: 18 }}
            >
              as List
            </MenuItem>
          </TouchableHighlight>
          <MenuDivider />
          <TouchableHighlight
            style={styles.menubarListhighlight}
            underlayColor="#a8dadc"
            onPress={hideMenu}
          >
            <MenuItem
              onPress={handleMenuItemPress}
              style={{ height: 20 }}
              textStyle={{ fontSize: 18 }}
            >
              as Icons
            </MenuItem>
          </TouchableHighlight>
          <MenuDivider />
          <TouchableHighlight
            style={styles.menubarListhighlight}
            underlayColor="#a8dadc"
            onPress={() => {
              setIsMenuVisible(false);
              setTimeout(() => {
                setModalVisible(true);
              }, 400);
            }}
          >
            <MenuItem
              onPress={handleMenuItemPress}
              style={{ height: 20 }}
              textStyle={{ fontSize: 18 }}
            >
              NewFolder
            </MenuItem>
          </TouchableHighlight>
        </Menu>
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                marginBottom: 10,
                backgroundColor: "#a8dadc",
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Image
                  source={hamBurger}
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                />
                <TouchableOpacity
                  style={{
                    padding: 10,
                    marginBottom: 10,
                    backgroundColor: "green",
                  }}
                >
                  <TextInput
                    style={{
                      height: 40,
                      width: 200,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginBottom: 20,
                      padding: 5,
                    }}
                    placeholder="New Folder"
                    onChangeText={handleTextInputChange}
                    value={textInputValue}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => setModalVisible(false)}
              onPress={handleSaveImage}
              style={{ padding: 10, backgroundColor: "#a8dadc" }}
            >
              <Text style={{ fontSize: 24 }}>Save Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal */}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {homeGallery.map((item, index) => (
          <TouchableHighlight
            style={styles.highlight}
            underlayColor="#a8dadc"
            onPress={() => {
              navigation.navigate("Gallery");
            }}
            key={index}
          >
            <Image source={item.folderImage} style={styles.image} />
          </TouchableHighlight>
        ))}
      </ScrollView>
      {/* <TVGridLayout
        style={styles.contentContainer}
        numColumns={3} // Adjust based on your desired number of items per row
        spacing={10} // Adjust spacing between items
        contentContainerStyle={{ padding: 10 }} // Add padding for aesthetics
      >
        {homeGallery.map((item, index) => (
          <TVTouchable
            style={styles.highlight} // Apply styles for focus/hover effect
            key={index}
            onPress={() => {
              navigation.navigate("Gallery");
            }}
          >
            <Image source={item.folderImage} style={styles.image} />
          </TVTouchable>
        ))}
      </TVGridLayout> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    //paddingBottom: 16,
  },
  highlight: {
    borderRadius: 10,
    padding: 4,
    paddingVertical: 8,
    marginVertical: 24,
  },
  menubarhighlight: {
    borderRadius: 10,
    padding: 3,
    marginVertical: 10,
    width: 65,
    marginHorizontal: 12,
  },
  menubarListhighlight: {
    paddingVertical: 10,
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 200,
    //marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "red",
    backfaceVisibility: "visible",
  },
  modalView: {
    margin: 20,
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomeScreen;
