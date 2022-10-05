import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import List from '../components/List';
import { HEADER_IMAGE } from '../constants'

const starCatsScreen = ({ popularCats, navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.centerBox}>
          <View style={styles.headerImageBox}>
            <Image
              style={styles.headerImage}
              source={{ uri: HEADER_IMAGE }}
            />
          </View>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerText}>스타냥이들</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.listContainer}>
        {popularCats.map((cat) => {
          return <List cat={cat} navigation={navigation} key={cat.id + Math.random().toString()}/>;     
        })}
        <View style={styles.emptyBox}>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').width / 5,
    backgroundColor: '#ff9191',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImageBox: {
    width: '40%', 
    height: '100%', 
    marginVertical: 10, 
    padding: 10,
  },
  headerImage: {
    width: 70, 
    height: 70,
  },
  headerTitleBox: {
    width: '60%', 
    height: '100%',
    marginVertical: 30, 
    padding: 10,
  },
  headerText: {
    fontSize: 25,
  },
  centerBox: {
    flexDirection: 'row',
    width: '60%',
    height: Dimensions.get('window').width / 5,
  },
  listContainer: {
    padding: 30,
  },
  emptyBox: {
    height: 10, 
    padding: 35,
  }
});

export default starCatsScreen;
