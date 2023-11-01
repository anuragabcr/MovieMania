import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }: { item: any; handleClick: any }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require("../assets/images/movie1.png")}
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
