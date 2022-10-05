import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import TreasureList from '../components/TreasureList';
import Categorys from '../components/Categorys';
import { getTreasures, getSelectedTreasure } from '../actions';
import { fetchTreasures, fetchSelectedTreasure } from '../utils/api';
import { COLOR } from '../constants';

export default function TreasuresContainer({ navigation }) {
  const treasures = useSelector(state => state.treasures.treasures);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const filterTreasures = async(country, category) => {
    try {
      const currentToken = await SecureStore.getItemAsync('userToken');
      const { data } = await fetchTreasures(country, category, currentToken);
      dispatch(getTreasures(data));
      setIsLoading(false);
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };
  const onLoad = () => filterTreasures('all', 'all');
  const onCategory = (category) => filterTreasures('all', category);
  const onCountry = (country) => filterTreasures(country, 'all');
  const onTreasure = async(id) => {
    try {
      const currentToken = await SecureStore.getItemAsync('userToken');
      const { data } = await fetchSelectedTreasure(id, currentToken);
      dispatch(getSelectedTreasure(data));
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };

  useEffect(() => {
    onLoad();
    navigation.addListener('focus', onLoad);
    const unsubscribe = navigation.addListener('blur', () => setIsLoading(true));
    return unsubscribe;
  }, [navigation]);

  if(isLoading) {
    return <View />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Categorys onCategory={onCategory} />
        <View style={styles.treasuresWrapper}>
          <FlatList
            data={treasures}
            renderItem={({ item }) => {
              return (
                <TreasureList
                  name={item.name}
                  country={item.country}
                  expiration={item.expiration}
                  id={item.id}
                  page={'generalPage'}
                  navigation={navigation}
                  onCountry={onCountry}
                  onTreasure={onTreasure}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  treasuresWrapper: {
    flex: 9,
    backgroundColor: COLOR.WHITE
  },
});
