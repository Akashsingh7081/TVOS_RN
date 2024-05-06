import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, UIManager } from "react-native";
import GalleryScreen from "./src/Screen/GalleryScreen";
import HomeScreen from "./src/Screen/HomeScreen";
import ImageScreen from "./src/Screen/ImageScreen";
import { ImageData } from "./config/fakeData";

const Stack = createNativeStackNavigator();
export const UserContext = createContext({});

const App = () => {
  const [homeGallery, setHomeGallery] = useState(ImageData);

  return (
    <UserContext.Provider value={{ homeGallery, setHomeGallery }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen name="ImageSrc" component={ImageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
