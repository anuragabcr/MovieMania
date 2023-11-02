import {
  View,
  Text,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { image500, searchMovies } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topmargin = ios ? "" : "mt-3";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const name = "ndjnd";

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      const movies = await searchMovies({
        query: value,
        include_adult: "true",
        page: 1,
      });
      setMovies(movies.results);
      setLoading(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search movies"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : movies.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({movies.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {movies.map((movie, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", movie)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    // source={require("../assets/images/movie1.png")}
                    source={{ uri: image500(movie?.poster_path) }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1 text-center">
                    {movie?.title.length > 22
                      ? movie?.title.slice(0, 22) + "..."
                      : movie?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            className="h-40 w-80 mt-10"
            source={require("../assets/images/movie2.png")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
