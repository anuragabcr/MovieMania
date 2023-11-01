import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const MovieList = ({
  title,
  data,
  hideSeeAll,
}: {
  title: string;
  data: any;
  hideSeeAll?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-xl" style={styles.text}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View className="space-y-1 mr-4">
              <Image
                // source={require("../assets/images/movie1.png")}
                source={{ uri: image500(item.poster_path) }}
                style={{ width: width * 0.33, height: height * 0.22 }}
                className="rounded-3xl"
              />
              <Text className="text-neutral-300 ml-1">
                {item.original_title.length > 14
                  ? item.original_title.slice(0, 14) + "..."
                  : item.original_title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
