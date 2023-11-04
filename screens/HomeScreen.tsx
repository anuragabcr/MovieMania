import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchPlaying,
  fetchPopular,
  fetchTopRated,
  fetchTrending,
  fetchUpcoming,
} from "../api/moviedb";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const getInitialDta = async () => {
      setLoading(true);

      const trendingData = await fetchTrending();
      if (trendingData && trendingData.results)
        setTrending(trendingData.results);

      const playingData = await fetchPlaying();
      if (playingData && playingData.results) setPlaying(playingData.results);

      const popularData = await fetchPopular();
      if (popularData && popularData.results) setPopular(popularData.results);

      const upcomingData = await fetchUpcoming();
      if (upcomingData && upcomingData.results)
        setUpcoming(upcomingData.results);

      const topRatedData = await fetchTopRated();
      if (topRatedData && topRatedData.results)
        setTopRated(topRatedData.results);

      setLoading(false);
    };
    getInitialDta();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={Platform.OS == "ios" ? "-mb-2" : "-mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* <UserCircleIcon size={30} strokeWidth={2} color="white" /> */}
          <Text></Text>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>Movie</Text>Mania
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <TrendingMovies data={trending} />
          <MovieList title="Now Playing" data={playing} />
          <MovieList title="Popular" data={popular} />
          <MovieList title="Upcoming" data={upcoming} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
