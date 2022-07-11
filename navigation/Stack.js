import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import Detail from "../screens/Detail";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";

    return (
        <NativeStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white",
                },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white",
                },
                headerTitleStyle: {
                    color: isDark ? "white" : BLACK_COLOR,
                },
                tabBarLabelStyle: {
                    marginTop: -5,
                    fontSize: 10,
                    fontWeight: "600",
                },
            }}
        >
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    );
};

export default Stack;
