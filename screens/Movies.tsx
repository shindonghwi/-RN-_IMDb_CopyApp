import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
    flex: 1;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => (
    <Container>
        <Swiper containerStyle={{ width: "100%", height: 300 }}>
            <View style={{ backgroundColor: "red" }}></View>
            <View style={{ backgroundColor: "blue" }}></View>
            <View style={{ backgroundColor: "tomato" }}></View>
            <View style={{ backgroundColor: "green" }}></View>
        </Swiper>
    </Container>
);

export default Movies;
