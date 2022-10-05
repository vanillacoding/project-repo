import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import BouncingPreloader from 'react-native-bouncing-preloader';
import configuredAxios from '../config/axiosConfig';
import RenderItem from '../components/RenderItem';
import MESSAGE from '../constants/message';
import { COLOR } from '../constants/color';
import API_URL from '../constants/apiUrl';
import ICON_NAME from '../constants/icon';
import {
  Wrapper,
  SearchInput,
  Container,
  StyledText,
  StyledFlatList,
  ListContainer,
  InputContainer,
  AnimationContainer,
} from '../shared/index';

const Search = ({ userLocation, isWaiting, navigation }) => {
  const [searchList, setSearchList] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchWordSubmit = async () => {
    if (isSearching) return;
    setIsSearching(true);

    try {
      const { latitude, longitude } = userLocation;
      const {
        data: { results },
      } = await configuredAxios.get(
        API_URL.restaurantList(latitude, longitude, searchWord)
      );

      const filteredSearchList = results.map(result => ({
        id: result.place_id,
        name: result.name,
        rating: result.rating,
        openingHours: result['opening_hours'],
      }));

      setSearchList(filteredSearchList);
      setIsSearching(false);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
    }
  };

  return (
    <Wrapper>
      <InputContainer>
        <Container>
          <Icon name={ICON_NAME.SEARCH} size={24} color={COLOR.THEME_COLOR} />
          <SearchInput
            value={searchWord}
            onChangeText={setSearchWord}
            onSubmitEditing={handleSearchWordSubmit}
            editable={!isWaiting}
          />
        </Container>
      </InputContainer>
      <ListContainer>
        <StyledText color={COLOR.THEME_COLOR}>
          {!searchList && !isSearching ? MESSAGE.SHOULD_INPUT_RESTAURANT : ''}
        </StyledText>
        {isSearching || isWaiting ? (
          <AnimationContainer>
            <BouncingPreloader
              icons={[require('../../assets/images/rice.png')]}
              leftRotation='-680deg'
              rightRotation='360deg'
              leftDistance={-180}
              rightDistance={-250}
              speed={1000}
            />
          </AnimationContainer>
        ) : (
          <StyledFlatList
            data={searchList}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                navigation={navigation}
                searchWord={searchWord}
              />
            )}
            keyExtractor={restaurant => restaurant.id}
          />
        )}
      </ListContainer>
    </Wrapper>
  );
};

export default connect(state => ({
  userLocation: state.location,
  isWaiting: state.meetings.currentMeeting.meetingId,
}))(Search);
