import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from "expo-blur";
import Slides from "../components/Slide";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const API_KEY = "6af4fcae26906604686c7328b79cf4b9";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;

const TrendingScroll = styled.ScrollView`
    margin-top: 20px;
`;
const Movie = styled.View`
    align-items: center;
    margin-right: 20px;
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ListTitle = styled.Text`
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Title = styled.Text`
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Votes = styled.Text`
    font-size: 12px;
    color: ${(props) => props.theme.textColor};
`;

const HMovie = styled.View`
    flex-direction: row;
    padding: 0px 20px;
    margin-bottom: 20px;
`;

const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const OverView = styled.Text`
    opacity: 0.7;
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    width: 80%;
`;

const Release = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 12px;
    margin-vertical: 10px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [trending, setTrending] = useState([]);

    const getUpComing = async () => {
        const { results } = await (
            await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        ).json();
        setUpComing(results);
    };

    const getTrending = async () => {
        const { results } = await (
            await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        ).json();
        setTrending(results);
    };

    const getNowPlaying = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`,
            )
        ).json();
        setNowPlaying(results);
    };

    const getData = async () => {
        await Promise.all([getTrending(), getNowPlaying(), getUpComing()]);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const isDark = useColorScheme() === "dark";

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container>
            <Swiper
                horizontal={true}
                containerStyle={{ marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4 }}
                loop={true}
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
            >
                {nowPlaying.map((movie) => (
                    <Slide
                        key={movie.id}
                        backdropPath={movie.backdrop_path}
                        overview={movie.overview}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                    />
                ))}
            </Swiper>
            <ListContainer>
                <ListTitle>Trending Movies</ListTitle>
                <TrendingScroll
                    contentContainerStyle={{ paddingLeft: 20 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {trending.map((movie) => (
                        <Movie key={movie.id}>
                            <Poster path={movie.poster_path} />
                            <Title>
                                {movie.original_title.slice(0, 15)}
                                {movie.original_title.length > 15 ? "..." : null}
                            </Title>
                            <Votes>
                                {movie.vote_average > 0 ? `⭐️ ${movie.vote_average.toFixed(2)} / 10` : `Coming Soon`}
                            </Votes>
                        </Movie>
                    ))}
                </TrendingScroll>
            </ListContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            {upComing.map((movie) => (
                <HMovie key={movie.id}>
                    <Poster path={movie.poster_path} />
                    <HColumn>
                        <Title>{movie.original_title}</Title>
                        <OverView>
                            {movie.overview !== "" && movie.overview.length > 140
                                ? `${movie.overview.slice(0, 140)}...`
                                : movie.overview}
                        </OverView>
                        <Release>
                            {new Date(movie.release_date).toLocaleDateString("ko", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </Release>
                    </HColumn>
                </HMovie>
            ))}
        </Container>
    );
};

export default Movies;
