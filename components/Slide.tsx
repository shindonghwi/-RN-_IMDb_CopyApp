import React from "react";
import styled from "styled-components/native";
import { StyleSheet, useColorScheme, View } from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImage = styled.Image``;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const OverView = styled.Text`
    margin-top: 10px;
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : props.theme.textColor)};
`;

const Votes = styled(OverView)`
    font-size: 12px;
    color: ${(props) => props.theme.textColor};
`;

const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
}

const Slide: React.FC<SlideProps> = ({ backdropPath, posterPath, originalTitle, voteAverage, overview }) => {
    const isDark = useColorScheme() === "dark";
    return (
        <View style={{ flex: 1 }}>
            <BgImage style={StyleSheet.absoluteFill} source={{ uri: makeImagePath(backdropPath) }} />
            <BlurView tint={isDark ? "dark" : "light"} intensity={80} style={StyleSheet.absoluteFill}>
                <Wrapper>
                    <Poster path={posterPath} />
                    <Column>
                        <Title isDark={isDark}>{originalTitle}</Title>
                        {voteAverage > 0 ? <Votes isDark={isDark}>⭐️ {voteAverage} / 10</Votes> : null}
                        <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    );
};

export default Slide;
