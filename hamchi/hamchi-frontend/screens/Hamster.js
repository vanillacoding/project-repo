import React from 'react';
import { useSelector } from 'react-redux';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Button from '../components/shared/Button';
import mapEnumToString from '../constants/mapEnumToString';
import { formatFullDate } from '../utils/index';
import colors from '../theme/color';

const Hamster = ({ route, navigation }) => {
  const post = route.params.post;
  const userId = useSelector(state => state.user.userId);

  function handlePress() {
    navigation.navigate('SubmissionForm', { postId: post._id });
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.photo}
        source={{ uri: post.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.date}>{formatFullDate(new Date(post.createdAt))}</Text>
        <View style={styles.field}>
          <Text style={styles.key}>이름</Text>
          <Text style={styles.text}>{post.name}</Text>

        </View>
        <View style={styles.divider} />
        <View style={styles.field}>
          <Text style={styles.key}>지역</Text>
          <Text style={styles.text}>{post.location}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.field}>
          <Text style={styles.key}>종류</Text>
          <Text style={styles.text}>{mapEnumToString.hamsterType[post.type]}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.field}>
          <Text style={styles.key}>성별</Text>
          <Text style={styles.text}>{mapEnumToString.hamsterGender[post.gender]}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.field}>
          <Text style={styles.key}>개체수</Text>
          <Text style={styles.text}>{post.number}</Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.field, { flexDirection: 'column' }]}>
          <Text style={styles.key}>세부 사항</Text>
          <View style={styles.descriptionContainer}>
            <Text style={[styles.text]}>{post.details}</Text>
          </View>
        </View>
        {userId !== post.owner && <Button
          type="filled"
          text="입양 신청서 쓰기"
          onPress={handlePress}
        />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user: {
    alignItems: 'flex-start',
    height: '8%',
    padding: '3%',
    backgroundColor: colors.white
  },
  photo: {
    alignSelf: 'center',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  divider: {
    marginBottom: 10,
    height: 1,
    width: '90%',
    backgroundColor: colors.outline
  },
  textContainer: {
    padding: 12,
    alignItems: 'center'
  },
  date: {
    fontSize: 13,
    textAlign: "center",
    margin: 8,
    color: 'gray',
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  key: {
    fontSize: 16,
    alignSelf: 'flex-start',
    margin: 3,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 3,
  },
  details: {
    justifyContent: 'center',
    marginTop: 10,
    width: '70%',
  },
  descriptionContainer: {
    padding: 5,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.outline
  },
  description: {
    alignSelf: 'center'
  }
});

export default Hamster;
