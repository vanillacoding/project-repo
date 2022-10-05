import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  Pressable,
  StyleSheet
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import enumToString from '../../constants/mapEnumToString';
import { formatFullDate } from '../../utils';
import colors from '../../theme/color';

const Card = ({ item, selected, onSelect, showOptions }) => {
  const {
    _id,
    image,
    name,
    submissions,
    createdAt,
    status
  } = item;
  const mapped = enumToString.experienceType;

  return (
    <View>
      <View style={styles.postContainer}>
        {status === 'opened' &&
          <Pressable
            style={styles.icon}
            onPress={() => showOptions(_id)}
          >
            <MaterialCommunityIcons
              name="dots-horizontal-circle"
              size={32}
              color={colors.main}
            />
          </Pressable>}
        <Text style={styles.title}>{name}의 입양 신청서 목록</Text>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <Text>{formatFullDate(new Date(createdAt))}</Text>
        <Text>신청자 수 {submissions.length}명</Text>
      </View>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <>
              <View style={styles.submissionContainer}>
                <View style={styles.checkboxContainer}>
                  {item.matched === "false"
                    ? <BouncyCheckbox
                      size={25}
                      fillColor={colors.main}
                      unfillColor="#FFFFFF"
                      isChecked={selected[item._id] ? true : false}
                      iconStyle={{ borderColor: colors.main }}
                      onPress={() => onSelect(item._id)}
                    />
                    : <Text>매칭 완료</Text>
                  }
                </View>
                <Image
                  style={styles.environment}
                  source={{ uri: item.environment }}
                />
                <View style={styles.textContainer}>
                  <View style={styles.username}>
                    <Text>{item.ownerName}님의 신청서</Text>
                  </View>
                  <View style={styles.field}>
                    <Text>사육 경험</Text>
                    <Text>{mapped[item.experience]}</Text>
                  </View>
                  <View style={styles.field}>
                    <Text>지역</Text>
                    <Text>{item.location}</Text>
                  </View>
                  <View style={[styles.field, styles.details]}>
                    <Text>내용</Text>
                    <Text>{item.details}</Text>
                  </View>
                </View>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 170,
    paddingTop: 12,
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1
  },
  checkbox: {
    width: 10,
    height: 10,
    alignSelf: 'center'
  },
  image: {
    width: '28%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 60,
    marginLeft: 6
  },
  environment: {
    height: undefined,
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    flex: 4
  },
  textContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    padding: 10
  },
  text: {
    fontSize: 16
  },
  submissionContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '93%',
    alignSelf: 'center',
    marginBottom: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 14
  },
  username: {
    alignSelf: 'center',
    marginBottom: 8
  },
  icon: {
    position: 'absolute',
    right: 0,
    margin: 10
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  details: {
    flexDirection: 'column'
  }
});

export default Card;
