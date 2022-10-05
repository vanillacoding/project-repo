import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import TreasureList from '../components/TreasureList';
import { getTreasures, getSelectedTreasure } from '../actions';
import { fetchMyInformations, fetchSelectedTreasure } from '../utils/api';
import { COLOR } from '../constants';

export default function MyPageContainer({ navigation, type }) {
  const treasures = useSelector(state => state.treasures.treasures);
  const userInfo = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const onLoad  = async() => {
    try {
      const currentToken = await SecureStore.getItemAsync('userToken');
      const selectedType =  type === 'treasure' ? 'treasures' : 'huntings';
      const { data } = await fetchMyInformations(userInfo.id, currentToken, selectedType);
      dispatch(getTreasures(data));
      setIsLoading(false);
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };
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
                is_hunting={item.is_hunting}
                page={type}
                navigation={navigation}
                onTreasure={onTreasure}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  treasuresWrapper: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
});

MyPageContainer.propTypes = {
  type: PropTypes.string.isRequired,
};
