import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import FilteredAdoptCardList from '../components/FilteredAdoptCardList';
import AdoptCardList from '../components/AdoptCardList';
import Toggle from '../components/shared/Toggle';
import Filter from '../components/Filter';
import colors from '../theme/color';

const Feeds = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFiltered = useSelector(state => state.post.isFiltered);

  const [filteredScrollPosition, setFilteredScrollPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  function handlePressCard(post) {
    navigation.navigate(
      'Details',
      { screen: 'Hamster', params: { post: post } }
    );
  }

  function useSelectHamsterType() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Filter title="햄스터 타입" />
            <TouchableWithoutFeedback
              onPress={useSelectHamsterType}
            >
              <View style={styles.buttonClose}>
                <Text>확인</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {!isFiltered
          &&
          <View style={styles.filter}>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsModalVisible(!isModalVisible)
              }}
            ><Text style={styles.filterText}>필터 설정</Text>
            </TouchableWithoutFeedback>
          </View>
        }
        <View style={styles.toggle}>
          <Toggle />
        </View>
      </View>
      {
        isFiltered
          ? <FilteredAdoptCardList
            scrollPosition={filteredScrollPosition}
            setScrollPosition={setFilteredScrollPosition}
            onPressCard={handlePressCard}
          />
          : <AdoptCardList
            scrollPosition={scrollPosition}
            setScrollPosition={setScrollPosition}
            onPressCard={handlePressCard}
          />
      }
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    width: '75%',
    height: '26%',
    borderRadius: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonClose: {
    width: '20%',
    alignItems: 'center',
    backgroundColor: colors.outline,
    alignSelf: 'center',
    padding: 8,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    paddingBottom: 0
  },
  toggle: {
    marginLeft: 'auto'
  },
  filter: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  filterText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  hidden: {
    opacity: 0
  }
});

export default Feeds;
