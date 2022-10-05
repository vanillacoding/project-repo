import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, FlatList } from 'react-native';
import configuredAxios from '../config/axiosConfig';
import { setSelectedMeeting, setPromiseAmount } from '../actions/index';
import RenderImage from '../components/RenderImage';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Wrapper,
  Title,
  StyledView,
  StyledText,
  ImageContainer,
  StyledButton,
  LabelContainer,
  Label,
} from '../shared/index';
import resetAction from '../utils/resetAction';
import ROUTE from '../constants/route';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/color';
import API_URL from '../constants/apiUrl';
import MESSAGE from '../constants/message';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RestaurantDetails = ({
  navigation,
  selectedMeeting,
  setSelectedMeeting,
  userId,
  userPromise,
  setPromiseAmount,
  route,
}) => {
  const [photoUrls, setPhotoUrls] = useState('');
  const [review, setReview] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const partnerNickname = route.params.partnerNickname;
  const { meetingId, restaurantId, restaurantName } = selectedMeeting;

  const initializeState = async () => {
    const {
      data: { result },
    } = await configuredAxios(API_URL.restaurantDetails(restaurantId));
    const { photos, reviews } = result;
    const { lat: latitude, lng: longitude } = result.geometry.location;

    setSelectedMeeting({ restaurantLocation: { latitude, longitude } });

    for (let photo of photos.slice(0, 5)) {
      const { photo_reference } = photo;
      const photoData = await configuredAxios(
        API_URL.restaurantPhoto(photo_reference)
      );

      setPhotoUrls(prev => [...prev, photoData.config.url]);
    }

    for (let review of reviews.slice(0, 2)) {
      setReview(review.text);
    }
  };

  useEffect(() => {
    initializeState();
  }, []);

  const handleButtonClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    if (!userPromise) {
      alert('프로미스가 부족합니다 결제해주세요!');

      return;
    }

    Alert.alert(
      '라이스코코 만나러가기',
      '프로미스가 차감됩니다',
      [
        {
          text: MESSAGE.OK,
          onPress: () =>
            partnerNickname
              ? JoinMeeting()
              : CreateMeeting(),
        },
        {
          text: MESSAGE.NO,
        },
      ],
      { cancelable: false }
    );
    setIsClicked(false);
  };

  const CreateMeeting = async () => {
    try {
      const { data } = await configuredAxios.post(ROUTE.MEETINGS, {
        selectedMeeting,
        userId,
      });
      const { createdMeeting } = data;
      const { _id: meetingId, expiredTime } = createdMeeting;

      setSelectedMeeting({ meetingId, expiredTime });

      await configuredAxios.put(`${ROUTE.USERS}/${userId}${ROUTE.PROMISE}`, {
        amount: -1,
      });

      setPromiseAmount(userPromise - 1);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
      setIsClicked(false);
    }

    navigation.dispatch(resetAction(0, SCREEN.MATCH_WAITING));
  };

  const JoinMeeting = async () => {
    try {
      const {
        data,
      } = await configuredAxios.put(
        `${ROUTE.MEETINGS}/${meetingId}${ROUTE.JOIN}`,
        { userId }
      );
      const { updatedMeeting } = data;
      const { _id, expiredTime } = updatedMeeting;

      setSelectedMeeting({ meetingId: _id, expiredTime });

      await configuredAxios.put(`${ROUTE.USERS}/${userId}${ROUTE.PROMISE}`, {
        amount: -1,
      });

      setPromiseAmount(userPromise - 1);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
      setIsClicked(false);
    }

    navigation.dispatch(resetAction(0, SCREEN.MATCH_SUCCESS));
  };

  return (
    <Wrapper>
      <LabelContainer>
        <Icon name='coins' size={20} color={COLOR.WHITE} />
        <Label width='50%' margin='0 auto' color={COLOR.WHITE}>
          {userPromise}개
        </Label>
      </LabelContainer>
      <Title size='24px'>{restaurantName}</Title>
      <ImageContainer>
        {!photoUrls ? (
          <LoadingSpinner />
        ) : (
          <FlatList
            data={photoUrls}
            renderItem={RenderImage}
            keyExtractor={item => item}
            horizontal={true}
          />
        )}
      </ImageContainer>
      <StyledView>
        <StyledText
          numberOfLines={2}
          ellipsizeMode='tail'
          color={COLOR.LIGHT_GRAY}
        >
          {review}
        </StyledText>
      </StyledView>
      {partnerNickname ? (
        <StyledText>{`${restaurantName}에서 함께 식사하고 싶어하는  ${partnerNickname}님이 계십니다! 함께 드시겠어요?`}</StyledText>
      ) : (
        <StyledText>{`${restaurantName}에서 라이스 코코와 즐거운 한끼 어떠세요?`}</StyledText>
      )}
      <StyledButton onPress={handleButtonClick}>
        <StyledText color={COLOR.WHITE}>라이스코코 만나러가기</StyledText>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(
  state => ({
    selectedMeeting: state.meetings.selectedMeeting,
    userId: state.user._id,
    userPromise: state.user.promise,
  }),
  {
    setSelectedMeeting,
    setPromiseAmount,
  }
)(RestaurantDetails);
