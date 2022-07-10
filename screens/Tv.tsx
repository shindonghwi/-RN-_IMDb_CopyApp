import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import Loader from "../components/Loader";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";

const Tv = () => {
    const queryClient = useQueryClient();
    const {
        isLoading: todayLoading,
        data: todayData,
        isRefetching: todayRefetching,
    } = useQuery(["tv", "today"], tvApi.airingToday);
    const {
        isLoading: topLoading,
        data: topData,
        isRefetching: topRefetching,
    } = useQuery(["tv", "top"], tvApi.topRated);
    const {
        isLoading: trendingLoading,
        data: trendingData,
        isRefetching: trendingRefetching,
    } = useQuery(["tv", "trending"], tvApi.trending);
    const onRefresh = async () => {
        await queryClient.refetchQueries(["tv"]);
    };
    const loading = todayLoading || topLoading || trendingLoading;
    const refreshing = todayRefetching || topRefetching || trendingRefetching;
    if (loading) {
        return <Loader />;
    }
    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ paddingVertical: 30 }}
        >
            <HList title="Trending TV" data={trendingData.results} />
            <HList title="Airing Today" data={todayData.results} />
            <HList title="Top Rated TV" data={topData.results} />
        </ScrollView>
    );
};
export default Tv;
