import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import BackButton from '../components/BackButton';
import tileStyleHelper from '../utils/tileStyleHelper';
import TileList from '../components/TileList';
import { Alert } from 'react-native';

const LikedCatsScreen = ({ user, fetchLikedcats, navigation }) => {
  const [myCats, setMyCats] = useState([]);
  
  useEffect(() => {
    const foucsListner = navigation.addListener('focus', async () => {
      const { result, cats } = await fetchLikedcats(user.mongoId);
      if (result !== 'ok') {
        return Alert.alert('내가 찾은 냥이 정보 가져오기가 실패했습니다. 다시 시도해주세요');
      }
      
      const array = tileStyleHelper(cats);
      setMyCats(array);
    });
 
    return foucsListner;
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View></View>
          <BackButton navigation={navigation} />
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>내가 좋아한 냥이들</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList 
          data={myCats}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={styles.invisible}></View>
            }

            return (
              <TileList cat={item} navigation={navigation} />
            );
          }}
          numColumns={2}
          keyExtractor= {(item, index) => item._id + index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerTextBox: {
    width: '85%',
  },
  headerText: {
    fontSize: 20,
  },
  header: {
    paddingTop: 20,
    height: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  invisible: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width / 2,
    flex: 1,
    margin: 1,
  },
  listContainer: {
    flex: 1, 
    paddingTop: 30,
  }
});

export default LikedCatsScreen;
