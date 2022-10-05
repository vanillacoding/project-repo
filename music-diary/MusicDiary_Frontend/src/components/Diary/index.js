import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { listenMusic, setPlayList } from "../../redux/slices/musicSlice";
import { SimpleLineIcons } from "@expo/vector-icons";

const Diary = ({ data, diaryId }) => {
  const dispatch = useDispatch();
  const { byIds } = useSelector((state) => state.diary);

  function handlePressMusicPlayBtn(index) {
    dispatch(setPlayList(byIds[diaryId].playList));
    dispatch(listenMusic(index));
  }

  const energyScore = byIds[diaryId].playList.length
    ? Math.floor(
      (byIds[diaryId].playList.reduce(
        (acc, current) => acc + current.energy,
        0
      ) /
          byIds[diaryId].playList.length) *
          100
    )
    : "🤔";

  return (
    <View stlye={styles.diaryContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.energyWrap}>
          <SimpleLineIcons name="energy" size={30} color="black" />
          <Text style={styles.energyText}>{energyScore}</Text>
        </View>
        <View style={styles.titleWrap}>
          <View style={styles.title}>
            <Text style={styles.hash}># {byIds[diaryId]?.hashTag}</Text>
            <Text style={styles.date}>{byIds[diaryId]?.date}</Text>
          </View>
          <Text style={styles.location}>{byIds[diaryId]?.address}</Text>
        </View>
      </View>

      <View style={styles.playListContainer}>
        {byIds[diaryId]?.playList.length ? (
          <FlatList
            numRows={byIds[diaryId]?.playList.length}
            style={styles.playListContainer}
            data={byIds[diaryId]?.playList}
            keyExtractor={(item) => String(Math.random() * 1000)}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.trackContainer}>
                  <View style={styles.track}>
                    <TouchableOpacity
                      style={styles.trackWrap}
                      onPress={() => handlePressMusicPlayBtn(index)}
                    >
                      <View style={styles.imgWrap}>
                        <Image
                          source={{ uri: item?.albumImg[2].url }}
                          style={{
                            width: 50,
                            height: 50,
                          }}
                        />
                        <View style={styles.textWrap}>
                          <Text style={styles.titleText}>{item?.title}</Text>
                          <Text style={styles.artistText}>{item?.artist}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.defaultTrackText}>no track list</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    width: 240,
    marginLeft: 10,
    flexDirection: "column",
    marginBottom: 5,
  },
  imgWrap: {
    width: 400,
    alignItems: "center",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 14,
  },
  artistText: {
    fontSize: 12,
  },
  titleWrap: {
    width: 250,
    marginLeft: 15,
    justifyContent: "center",
  },
  track: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  serachList: {
    justifyContent: "center",
    flexDirection: "row",
    flexGrow: 0,
  },
  diaryContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  energyWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginLeft: 10,
  },
  energyText: {
    marginTop: 5,
    marginLeft: 2,
    fontSize: 20,
  },
  trackWrap: {
    marginLeft: 5,
  },
  titleContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hash: {
    fontSize: 25,
  },
  location: {
    fontSize: 13,
    marginTop: 3,
    color: "#84817a",
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 45,
  },
  date: {
    fontSize: 10,
    marginLeft: 7,
    marginBottom: 3,
  },
  playListContainer: {
    height: 360,
  },
  trackContainer: {
    margin: 1.5,
  },
  defaultTrackText: {
    textAlign: "center",
    marginTop: 40,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

export default Diary;
