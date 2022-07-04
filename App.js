import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, Image, View } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });
export default function App() {
  const [ready, setReady] = useState(false);

  const onFinish = () => setReady(true);

  const startLoading = async () => {
    // 로딩동안 일어나는일
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./images/my_cat.jpeg"),
      "http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg",
    ]);
    console.log(images);

    await Promise.all(...fonts, ...images);
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

// import React, { useState } from "react";
// import AppLoading from "expo-app-loading";
// import { Text, Image } from "react-native";
// import * as Font from "expo-font";
// import { Ionicons } from "@expo/vector-icons";
// import { Asset, useAssets } from "expo-asset";

// export default function App() {
//   const [assets] = useAssets([require("./images/my_cat.jpeg"),"http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg"]);
//   const [loaded] = Font.useFonts(Ionicons.font);
//   if (!assets || !loaded) {
//     return <AppLoading />;
//   }
//   return <Text>Done</Text>;
// }
