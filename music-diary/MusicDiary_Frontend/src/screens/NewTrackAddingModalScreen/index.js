import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import debounce from "lodash.debounce";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { listenMusic, setPlayList } from "../../redux/slices/musicSlice";
import { addTrackToDiary } from "../../redux/slices/diarySlice";

const NewTrackAddingModalScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userId = user.userInfo.id;
  const accessToken = user.accessToken;
  const { data } = route.params;
  const diaryId = data;

  function closeModal() {
    navigation.goBack();
  }

  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchTracks(searchInput);
  }, [searchInput]);

  async function handleSelectSong(item, index) {
    await dispatch(setPlayList(searchList));
    await dispatch(listenMusic(index));
  }

  const handlePressAddToDiaryBtn = async (trackInfo) => {
    try {
      const energyResult = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackInfo.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { energy } = await energyResult.json();
      const energyAddedTrackInfo = { ...trackInfo, energy, date: Date.now() };

      await dispatch(
        addTrackToDiary({
          accessToken,
          userId,
          diaryId,
          trackInfo: energyAddedTrackInfo,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTracks = debounce(async (searchInput) => {
    try {
      const tempSearchResult = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist&limit=40&${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const resultList = await tempSearchResult.json();

      const result = resultList?.tracks?.items.map((list) => ({
        title: list.name,
        id: list.id,
        uri: list.uri,
        preview:
          list.preview_url ??
          "https://p.scdn.co/mp3-preview/bc5f3e28ba28c76b36f409d3c3f697e597b6ff6f?cid=41014a1f3ad143a8be14a47f025c209d",
        duration: list.duration_ms,
        artist: list.artists[0].name,
        albumImg: list.album.images,
      }));

      setSearchList(result);
    } catch (err) {
      console.error(err);
    }
  }, 800);

  const handleChangeText = (text) => {
    setSearchInput(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBox}>
        <SimpleLineIcons
          style={styles.closeBtn}
          name="close"
          size={24}
          color="black"
          onPress={closeModal}
        />
      </TouchableOpacity>
      <View style={styles.searchInputBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Serach track..."
          blurOnSubmit
          autoCorrect={false}
          maxLength={30}
          placeholderTextColor="#777"
          value={searchInput}
          onChangeText={(text) => handleChangeText(text)}
        />
      </View>
      <View style={styles.listWrapper}>
        {searchList?.length ? (
          <FlatList
            style={styles.searchList}
            data={searchList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
              return (
                <Text>
                  <View style={styles.track}>
                    <TouchableOpacity
                      style={styles.titleWrap}
                      onPress={() => handleSelectSong(item, index)}
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

                    <TouchableOpacity
                      style={styles.plusBtn}
                      onPress={() => {
                        handlePressAddToDiaryBtn(item);
                      }}
                    >
                      <AntDesign name="hearto" size={18} />
                    </TouchableOpacity>
                  </View>
                </Text>
              );
            }}
          />
        ) : (
          <Text style={styles.defaultSearchText}>No search Content</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listWrapper: {
    height: 444,
  },
  textWrap: {
    width: 240,
    marginLeft: 10,
    flexDirection: "column",
    marginBottom: 5,
  },
  plusBtn: {
    position: "absolute",
    right: 15,
    marginTop: 18,
  },
  imgWrap: {
    marginLeft: 6,
    width: 300,
    alignItems: "center",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 15,
  },
  artistText: {
    fontSize: 15,
  },
  titleWrap: {
    width: 40,
  },
  track: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    margin: 1.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  serachList: {
    justifyContent: "center",
    flexDirection: "row",
    flexGrow: 0,
  },
  searchInputBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  searchInput: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    height: 35,
    width: 250,
  },
  closeBtn: {
    marginRight: 12,
    marginTop: 20,
  },
  closeBox: {
    height: 45,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  defaultSearchText: {
    textAlign: "center",
    marginTop: 65,
  },
});

export default NewTrackAddingModalScreen;
