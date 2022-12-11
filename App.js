import React from "react";
import { useFonts } from "expo-font";
import * as splashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./theme";

// imports of screens
import Login from "./screen/auth/login";
import Signup from "./screen/auth/signup";
import Home from "./screen/home";

splashScreen.preventAutoHideAsync();

const ROOT_STACK = createNativeStackNavigator();
const TAB_STACK = createMaterialBottomTabNavigator();

function TabNavigation() {
  return (
    <TAB_STACK.Navigator
      shifting={false}
      backBehavior="initialRoute"
      initialRouteName="home"
      activeColor="#e91e63"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <TAB_STACK.Screen name="home" component={Home} />
      <TAB_STACK.Screen name="home1" component={Home} />
      <TAB_STACK.Screen name="home2" component={Home} />
    </TAB_STACK.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsBlackItalic: require("./assets/font/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("./assets/font/Poppins-ExtraBold.ttf"),
    PoppinsBoldItalic: require("./assets/font/Poppins-BoldItalic.ttf"),
    PoppinsItalic: require("./assets/font/Poppins-Italic.ttf"),
    PoppinsLight: require("./assets/font/Poppins-Light.ttf"),
    PoppinsLightItalic: require("./assets/font/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("./assets/font/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("./assets/font/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("./assets/font/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/font/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("./assets/font/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("./assets/font/Poppins-Thin.ttf"),
    PoppinsThinItalics: require("./assets/font/Poppins-ThinItalic.ttf"),
  });

  React.useEffect(() => {
    const onLoadFonts = async () => {
      if (fontsLoaded) {
        return await splashScreen.hideAsync();
      }
      //return null;
    };
    onLoadFonts();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <ROOT_STACK.Navigator
          initialRouteName="tab"
          screenOptions={{ headerShown: false }}
        >
          {/** AUTH SCREEN */}
          <ROOT_STACK.Group>
            <ROOT_STACK.Screen name="login" component={Login} />
            <ROOT_STACK.Screen name="signup" component={Signup} />
          </ROOT_STACK.Group>
          <ROOT_STACK.Screen name="tab" component={TabNavigation} />
        </ROOT_STACK.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
