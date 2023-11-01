import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fetchMovies, fetchPerson, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const [movies, setMovies] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const getInitialData = async () => {
      const person = await fetchPerson(item?.id);
      setPerson(person);

      const movies = await fetchMovies(item?.id);
      setMovies(movies?.cast);

      setLoading(false);
    };
    getInitialData();
  }, [item]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
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
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              // source={require("../assets/images/movie1.png")}
              source={{ uri: image500(person?.profile_path) }}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            {person?.name}
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            {person?.place_of_birth}
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className=" text-neutral-300 text-sm">{person?.gender}</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Date of Birth</Text>
            <Text className=" text-neutral-300 text-sm">
              {person?.birthday}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className=" text-neutral-300 text-sm">
              {person?.known_for_department}
            </Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className=" text-neutral-300 text-sm">
              {person?.popularity}
            </Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            {person?.biography}
          </Text>
        </View>
        <MovieList title="Movies" data={movies} hideSeeAll={true} />
      </View>
    </ScrollView>
  );
};

export default PersonScreen;
