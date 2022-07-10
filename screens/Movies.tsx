import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, View, FlatList, RefreshControl, Text, useColorScheme } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";

const VSeparator = styled.View`
    height: 30px;
`;
const HSeparator = styled.View`
    width: 30px;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`;

const ListContainer = styled.View``;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;

const Divider = styled.View`
    height: 1.5px;
    margin-vertical: 20px;
    width: 100%;
    background-color: white;
`;

const movieKeyExtractor = (item) => item.id.toString();

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const queryClient = useQueryClient();

    const {
        isLoading: nowLoading,
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
    const {
        isLoading: upComingLoading,
        data: upComingData,
        isRefetching: isRefetchingUpComing,
    } = useQuery(["movies", "upComing"], moviesApi.upComing);
    const {
        isLoading: trendingLoading,
        data: trendingData,
        isRefetching: isRefetchingTrending,
    } = useQuery(["movies", "trending"], moviesApi.trending);

    const loading = nowLoading || upComingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;

    const onRefresh = async () => {
        queryClient.refetchQueries(["movies"]);
    };

    const renderVMedia = ({ item }) => (
        <VMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
    );

    const renderHMedia = ({ item }) => (
        <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
        />
    );

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        containerStyle={{
                            marginBottom: 20,
                            width: "100%",
                            height: SCREEN_HEIGHT / 4,
                        }}
                    >
                        {nowPlayingData.results.map((movie) => (
                            <Slide
                                key={movie.id}
                                backdropPath={movie.backdrop_path}
                                posterPath={movie.poster_path}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                            />
                        ))}
                    </Swiper>

                    <ListContainer>
                        <ListTitle>Trending Movies</ListTitle>
                        <TrendingScroll
                            horizontal={true}
                            keyExtractor={movieKeyExtractor}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 30 }}
                            data={trendingData.results}
                            ItemSeparatorComponent={HSeparator}
                            renderItem={renderVMedia}
                        />
                    </ListContainer>
                    <Divider />
                    <ComingSoonTitle>Coming soon</ComingSoonTitle>
                </>
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={movieKeyExtractor}
            data={upComingData.results}
            ItemSeparatorComponent={VSeparator}
            renderItem={renderHMedia}
        ></FlatList>
    );
};

export default Movies;
