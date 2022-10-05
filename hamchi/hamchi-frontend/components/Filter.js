import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addType, deleteType, initFeeds } from '../features/filteredPostSlice';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import enumToString from '../constants/mapEnumToString';
import hamsterTypes from '../constants/hamsterTypes';
import colors from '../theme/color';

const Filter = ({ title }) => {
  const dispatch = useDispatch();
  const selectedHamsterTypes = useSelector(state => state.filteredPost.selectedHamsterTypes);
  const mapped = enumToString.hamsterType;

  function handleSelectType(type) {
    dispatch(initFeeds(handleSelectType));

    if (selectedHamsterTypes[type]) {
      dispatch(deleteType(type));
    } else {
      dispatch(addType(type));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.tagContainer}>
        {hamsterTypes.map(type => {
          return (
            <TouchableOpacity
              style={[
                styles.tag,
                { backgroundColor: selectedHamsterTypes[type] ? colors.main : colors.white }
              ]}
              key={type}
              onPress={() => handleSelectType(type)}
            >
              <Text style={[
                styles.text,
                { color: selectedHamsterTypes[type] ? colors.white : colors.main }
              ]}>{mapped[type]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
    marginBottom: 0
  },
  tagContainer: {
    flexDirection: "row",
  },
  tag: {
    marginTop: 12,
    width: 50,
    height: 24,
    margin: 5,
    marginBottom: -20,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 6,
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
  }
});

export default Filter;
