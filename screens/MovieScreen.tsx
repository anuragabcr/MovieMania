import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchCredits,
  fetchDetails,
  fetchSimilar,
  image500,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topmargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      const details = await fetchDetails(item?.id);
      setDetails(details);

      const credits = await fetchCredits(item?.id);
      setCredits(credits?.cast);

      const similar = await fetchSimilar(item?.id);
      setSimilar(similar.results);

      setLoading(false);
    };
    getInitialData();
  }, [item]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topmargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image
            // source={require("../assets/images/movie1.png")}
            source={{ uri: image500(details?.poster_path) }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {details?.title}
        </Text>
        <Text className="text-white text-center text-sm tracking-wider">
          {details?.tagline}
        </Text>
        <Text className="text-neutral-300 font-semibold text-base text-center pt-3">
          Released . {details?.release_date} . {details?.runtime} min
        </Text>
        <View className="flex-row justify-center mx-4 space-x-2">
          {details?.genres?.map((genre, index) => (
            <Text
              key={index}
              className="text-neutral-300 font-semibold text-base text-center"
            >
              {genre?.name} {index + 1 != details?.genres.length ? " - " : " "}
            </Text>
          ))}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {details?.overview}
        </Text>
      </View>

      <Cast data={credits} />
      <MovieList title="Similar movies" data={similar} hideSeeAll={true} />
    </ScrollView>
  );
};

export default MovieScreen;
