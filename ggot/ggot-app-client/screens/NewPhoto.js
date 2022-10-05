import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ViewPager from '@react-native-community/viewpager';
import { format } from 'date-fns';
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import Map from '../components/Map';
import { createNewPhoto } from '../utils/api';

export default function NewPhoto({ route, navigation }) {
  const { selectedPhotoList, userMarkedLocation } = route.params;

  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ description, setDescription ] = useState('');

  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.userData._id);
  const userLocation = useSelector(state => state.user.coords);
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  const markedLocation = {
    latitude: userMarkedLocation ? userMarkedLocation.latitude : userLocation.latitude,
    longitude: userMarkedLocation ? userMarkedLocation.longitude : userLocation.longitude
  };

  const photoUrlList = selectedPhotoList.map(item => {
    return {
      uri: item.uri,
      fileName: item.filename
    };
  });

  const photoInfo = {
    resistered_by: userId,
    location: markedLocation,
    description: description,
    published_at: currentDate
  };

  const onChangeLocation = () => navigation.navigate('Location');
  const settingDescription = description => setDescription(description);
  const requestNewPhoto = () => {
    createNewPhoto(userId, photoInfo, photoUrlList, dispatch, setIsModalVisible);
    setDescription('');
  };
  const onChangeMyPage = () => {
    navigation.navigate('MyPage');
    navigation.replace('Gallery');
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.contentWrapper}>
      <ViewPager style={styles.viewPagerWrapper} initialPage={0}>
        {
          photoUrlList.map((item, index) => {
            return (
              <View
                key={index}
                style={styles.photoWrapper}
              >
                <Image
                  source={{
                    uri: item.uri
                  }}
                  style={styles.image}
                />
              </View>
            );
          })
        }
      </ViewPager>
      <TouchableOpacity
        style={styles.mapWrapper}
        onPress={onChangeLocation}
      >
        <Map isScrollEnabled={false} />
      </TouchableOpacity>
      <View style={styles.descriptionWrapper}>
        <TextInput
          style={styles.inputText}
          placeholder='당신의 이야기를 입력해주세요.'
          multiline={true}
          onChangeText={settingDescription}
          defaultValue={description}
        />
      </View>
      <View style={styles.plusButtonWrapper}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={requestNewPhoto}
        >
          <Text style={styles.plubButtonText}>
            사진등록하기
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalDim}>
          <View style={styles.modalContent}>
            <View style={styles.modalTextBox}>
              <Text style={styles.modalTextHeader}>
                사진을
              </Text>
              <Text style={styles.modalTextMiddle}>
                꽂
              </Text>
              <Text style={styles.modalTextLast}>
                았습니다
              </Text>
            </View>
            <TouchableHighlight
              style={styles.myPageButton}
              onPress={onChangeMyPage}
            >
              <Text style={styles.myPageButtonText}>
                My Page
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewPagerWrapper: {
    flex: 2,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '85%',
    height: '85%'
  },
  mapWrapper: {
    flex: 1,
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionWrapper: {
    flex: 0.8,
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    borderColor: 'black'
  },
  inputText: {
    height: 100,
    padding: 15,
    fontSize: 15
  },
  plusButtonWrapper: {
    flex: 0.5,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusButton: {
    width: '90%',
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#F6F6F8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  plusButtonText: {
    fontSize: 15
  },
  modalDim: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center'
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#F2F2F0',
    width: '70%',
    height: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTextBox: {
    flexDirection: 'row',
    marginTop: 10
  },
  modalTextHeader: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 15
  },
  modalTextMiddle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5
  },
  modalTextLast: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 15
  },
  myPageButton: {
    width: 200,
    marginTop: 20,
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 50,
    color: '#474F59',
    borderColor: '#BF0436',
    backgroundColor: '#F2F2F0'
  },
  myPageButtonText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  }
});
