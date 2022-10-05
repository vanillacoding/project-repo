import styled from 'styled-components/native';
import { COLOR } from '../constants/color';
import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 80,
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 1,
    width: 70,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export const StyledView = styled.View`
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.color || COLOR.LIGHT_WHITE};
`;

export const MapWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const IconWrapper = styled.TouchableOpacity`
  display: flex;
  align-items: center;
`;

export const Container = styled.View`
  width: 95%;
  margin: 0 auto;
  justify-content: ${prop => prop.justify || 'center'};
  align-items: center;
  flex-direction: row;
`;

export const ListContainer = styled.View`
  width: 100%;
  flex: 0.9;
  align-items: center;
`;

export const ItemContainer = styled.TouchableNativeFeedback`
  width: ${prop => prop.width || '80%'};
  height: ${prop => prop.height || '180px'};
  margin-bottom: px;
  align-self: center;
`;

export const PaymentItem = styled.TouchableOpacity`
  width: 70%;
  background-color: ${props => (props.disabled ? 'gray' : COLOR.THEME_COLOR)};
  padding: 20px;
  margin: 5px;
  border-radius: 5px;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  margin-bottom: 8px;
  align-self: center;
  justify-content: center;
`;

export const StyledImage = styled.Image`
  width: ${prop => prop.width || '250px'};
  height: ${prop => prop.height || '100%'};
  border-radius: 24px;
  margin-right: 10px;
`;

export const AnimationContainer = styled.View`
  width: 100%;
  margin-top: 320px;
  justify-content: center;
  align-items: center;
`;

export const ReloadButtonContainer = styled.View`
  position: absolute;
  top: 45px;
  right: 10px;
`;

export const MeesageBoxContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 9px;
`;

export const MessageContainer = styled.View`
  width: 180px;
  height: 40px;
  padding: 8px;
  align-items: flex-end;
  background-color: ${props => props.color || COLOR.LIGHT_WHITE};
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-bottom: 11px;
`;

export const InputContainer = styled.TouchableOpacity`
  width: ${prop => prop.width || '80%'};
  margin: 8px auto;
  text-align: center;
`;

export const StyledInput = styled.TextInput`
  width: 80%;
  text-align: center;
  padding-bottom: 4px;
  border-bottom-width: 0.2px;
  border-color: ${COLOR.LIGHT_GRAY};
  margin: 8px auto;
  color: ${prop => prop.color || COLOR.THEME_COLOR};
`;

export const PickerContainer = styled.TouchableOpacity`
  width: 7%;
  margin: 0 -10px 0 0;
`;

export const WhiteText = styled.Text`
  font-size: 30px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export const TimeText = styled.Text`
  text-align: center;
  font-size: ${prop => prop.size || '100px'};
  background-color: transparent;
  margin: 0 auto;
  color: ${prop => prop.color || COLOR.SALMON};
`;

export const Title = styled.Text`
  flex: 0.3;
  margin: 0 auto;
  font-size: ${prop => prop.size || '24px'};
  font-weight: bold;
  text-align: center;
  color: ${COLOR.THEME_COLOR};
`;

export const LabelContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 50px;
  height: 50px;
  left: 85%;
  top: 40px;
  border-radius: 50px;
  background-color:${COLOR.THEME_COLOR};
`;

export const Label = styled.Text`
  width: ${prop => prop.width || '80%'};
  margin: ${prop => prop.margin || '0 8px;'};
  font-size: ${prop => prop.size || '12px'};
  color: ${COLOR.GRAY};
`;

export const StyledText = styled.Text`
  margin: ${prop => prop.margin || '0 auto;'};
  font-size: ${prop => prop.size || '16px'};
  color: ${prop => prop.color || COLOR.BLACK};
  text-align: center;
  font-weight: bold;
`;

export const UserProfile = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${COLOR.BEIGE};
  border-radius: 100px;
  margin: 0 3px;
  padding-left: 6px;
  padding-top: 2px;
  margin-bottom: 11px;
`;

export const StyledButton = styled.TouchableOpacity`
  width: 300px;
  height: 40px;
  padding-top: 10px;
  margin-right: 10px;
  margin: 0 auto;
  margin-top: ${prop => prop.marginTop || '36px'};
  align-self: flex-end;
  border-radius: 18px;
  background-color: ${prop => prop.color || COLOR.THEME_COLOR};
`;

export const NameCreationButton = styled.TouchableOpacity`
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${COLOR.THEME_COLOR};
`;

export const LoginButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  margin-top: 70%;
  padding: 10px;
  border-radius: 50px;
  background-color: white;
`;

export const RestaurantSearchButton = styled.TouchableOpacity`
  padding: 18px;
  border-radius: 30px;
  background-color: ${COLOR.WHITE};
`;

export const ArrivalButton = styled.TouchableOpacity`
  width: 50%;
  padding: 10px;
  border-radius: 50px;
`;

export const OutlineButton = styled.TouchableOpacity`
  width: ${prop => prop.width || '80%'};
  height: 48px;
  padding: 6px;
  margin-top: 8px;
  border-width: 3px;
  border-color: ${prop => prop.borderColor || COLOR.THEME_COLOR};
  background-color: ${prop => prop.backgroundColor || 'transparent'};
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;

export const OverlayHeader = styled.View`
  display: flex;
  position: absolute;
  width: 100%;
  align-items: center;
  padding: 50px 30px 30px 30px;
  top: 0px;
`;

export const OverlayFooter = styled.View`
  display: flex;
  position: absolute;
  width: 100%;
  flex-direction: ${prop => prop.flexDirection || 'row'};
  align-items: ${prop => prop.alignItems || 'center'};
  justify-content: flex-end;
  bottom: 50px;
  right: 20px;
`;

export const OverlayText = styled.Text`
  width: 100%;
  color: ${COLOR.THEME_COLOR};
  text-align: center;
  font-size: ${prop => prop.size || '13px'};
  font-family: ${prop => prop.font || 'sans-serif'};
`;

export const StyledFlatList = styled.FlatList`
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`;

export const SearchInput = styled.TextInput`
  width: 90%;
  padding: 8px;
  margin: 40px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.THEME_COLOR};
`;
