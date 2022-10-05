import React from 'react';
import { Alert } from 'react-native';
import { Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { setSelectedMeeting } from '../actions/index';
import { Container, StyledText, Label, ItemContainer } from '../shared/index';
import MESSAGE from '../constants/message';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/color';

const RenderItem = ({
  item,
  navigation,
  waitingMeetings,
  setSelectedMeeting,
}) => {
  const openingHours = item.openingHours;
  let isOpen = '-';

  if (typeof openingHours === MESSAGE.OBJECT) {
    isOpen = openingHours['open_now'] ? MESSAGE.OPEN : MESSAGE.CLOSE;
  }

  const handlePressRestaurant = () => {
    if (isOpen === MESSAGE.CLOSE) {
      return Alert.alert(
        MESSAGE.IT_IS_CLOSED,
        MESSAGE.FIND_OTHER_RESTAURANT,
        [
          {
            text: MESSAGE.YES,
          },
        ]
      );
    }

    const hasCreatedMeeting = waitingMeetings.find(
      meeting => meeting.restaurant.restaurantId === item.id
    );
    const partnerNickname = hasCreatedMeeting?.partnerNickname;

    setSelectedMeeting({
      restaurantId: item.id,
      restaurantName: item.name,
      partnerNickname: hasCreatedMeeting
        ? hasCreatedMeeting.partnerNickname
        : '',
    });

    return navigation.navigate(SCREEN.RESTAURANT_DETAILS, { partnerNickname });
  };

  return (
    <ItemContainer onPress={handlePressRestaurant}>
      <Container>
        <Label
          numberOfLines={2}
          ellipsizeMode='tail'
          width='30%'
          margin='24px 0px;'
          size='16px'
        >
          {item.name}
        </Label>
        <StyledText color={isOpen === MESSAGE.OPEN ? COLOR.BLUE : COLOR.GRAY}>
          {isOpen}
        </StyledText>
        <Rating
          tintColor={COLOR.LIGHT_WHITE}
          imageSize={14}
          startingValue={item.rating}
          readonly
        />
      </Container>
    </ItemContainer>
  );
};

export default connect(
  state => ({
    waitingMeetings: state.meetings.waitingMeetings,
  }),
  {
    setSelectedMeeting,
  }
)(RenderItem);
