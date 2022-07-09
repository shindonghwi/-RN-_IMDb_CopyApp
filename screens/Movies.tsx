import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from "expo-blur";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const API_KEY = "6af4fcae26906604686c7328b79cf4b9";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const View = styled.View`
    flex: 1;
`;

const BgImage = styled.Image``;
const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;

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

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => {
    const isDark = useColorScheme() === "dark";
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const getNowPlaying = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`,
            )
        ).json();
        console.log(isDark);
        setNowPlaying(results);
        setLoading(false);
    };

    useEffect(() => {
        getNowPlaying();
    }, []);

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container>
            <Swiper
                horizontal={true}
                containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
                loop={true}
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
            >
                {nowPlaying.map((movie) => (
                    <View key={movie.id}>
                        <BgImage style={StyleSheet.absoluteFill} source={{ uri: makeImagePath(movie.backdrop_path) }} />
                        <BlurView tint={isDark ? "dark" : "light"} intensity={80} style={StyleSheet.absoluteFill}>
                            <Wrapper>
                                <Poster source={{ uri: makeImagePath(movie.poster_path) }} />
                                <Column>
                                    <Title isDark={isDark}>{movie.original_title}</Title>
                                    {movie.vote_average > 0 ? (
                                        <Votes isDark={isDark}>⭐️ {movie.vote_average} / 10</Votes>
                                    ) : null}
                                    <OverView isDark={isDark}>{movie.overview.slice(0, 90)}...</OverView>
                                </Column>
                            </Wrapper>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
};

export default Movies;
