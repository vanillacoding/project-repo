import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  Image,
} from "react-native";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

const DiaryList = ({ diaryList, onPressDiary }) => {
  const formatData = (diaryList, numColumns) => {
    const totalRows = Math.floor(diaryList.length / numColumns);
    let totalLastRow = diaryList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      diaryList.push({ key: "blank", empty: true });
      totalLastRow++;
    }

    return diaryList;
  };

  const renderItem = ({ item, index }) => {
    let { diaryContainer, itemInvisible } = styles;

    if (item.empty) {
      return <View style={[diaryContainer, itemInvisible]} />;
    }

    return (
      <View style={diaryContainer}>
        <TouchableOpacity
          key={item._id}
          style={styles.diaryContainer}
          onPress={() => onPressDiary(item)}
        >
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: item?.playList[0]?.albumImg[1]?.url }}
              style={{
                width: 140,
                height: 140,
                borderBottomWidth: 0.3,
              }}
            />
          </View>
          <View style={styles.bottomTitle}>
            <Text style={styles.hashTag}># {item.hashTag}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      {diaryList.length ? (
        <FlatList
          data={formatData(diaryList, numColumns)}
          numColumns={numColumns}
          keyExtractor={(item) => String(item._id)}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={renderItem}
        />
      ) : (
        <Text>no diary found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgContianer: {
    width: 150,
    backgroundColor: "blue",
  },
  diaryContainer: {
    width: 142,
    height: WIDTH / numColumns,
    flexDirection: "column",
    borderWidth: 0.3,
    marginRight: 16,
    marginBottom: 16,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomTitle: {
    height: 20,
    width: 145,
    marginTop: 4,
    marginLeft: 6,
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hashTag: {
    fontFamily: "DMSans_500Medium",
  },
  date: {
    fontFamily: "DMSans_500Medium",
  },
  itemInvisible: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});

export default DiaryList;
