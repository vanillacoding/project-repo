import React, { useState } from 'react';
import {
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import {
  View,
  Text,
  Icon,
  Header,
  Form,
  Item,
  Label,
  Input
} from 'native-base';
import Modal from 'react-native-modal';
import CardHeader from './CardHeader';
import BottomButton from './BottomButton';
import Colors from '../constants/Colors';

export default function ReportModal(props) {
  const [ user, setUser ] = useState(null);
  const [ email, setEmail ] = useState('');
  const [ error, setError ] = useState(false);

  const {
    modalVisible,
    closeModal,
    onUserSearch,
    onClick
  } = props;

  const _onUserSearch = async() => {
    try {
      if (!email) return setError(true);

      const searchedUser = await onUserSearch(email);
      setEmail('');

      if (!searchedUser) return setError(true);

      setUser(searchedUser);
    } catch(err) {
      Alert.alert('사용자 검색 에러', '다시 시도해주세요');
    }
  };

  const _onApprovalRequest = async() => {
    try {
      Alert.alert(
        '결재 요청',
        `${user.name}님에게 결재 요청을 보내시겠습니까?`,
        [
          {
            text: '보내기',
            onPress: async() => {
              await onClick(user._id);
              Alert.alert(
                '결재 요청',
                '결재 요청이 완료되었습니다',
                [{
                  text: '완료',
                  onPress: _closeModal
                }]
              );
            }
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      );
    } catch(err) {
      Alert.alert('결재 요청 에러', '다시 시도해주세요');
    }
  };

  const _closeModal = () => {
    setEmail('');
    setError(false);
    setUser(null);
    closeModal();
  };

  return (
    <Modal
      isVisible={modalVisible}
      onRequestClose={_closeModal}
    >
      <View style={styles.modal}>
        <Form>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={_closeModal}
          >
            <Header>
              <Text style={styles.modalMessage}>
                이메일 주소로 과장님을 검색해 결재 요청을 보내세요
              </Text>
            </Header>
          </TouchableOpacity>
          {!error
            ? <View style={styles.emailBox}>
              {!user
                ? <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    autoCompleteType='email'
                    onChangeText={email => setEmail(email)}
                    placeholder={'example@example.com'}
                    value={email}
                  />
                </Item>
                : <CardHeader
                  photo={user.profilePhoto}
                  title={user.name}
                />
              }
            </View>
            : <View style={styles.emailBox}>
              <Item floatingLabel error onPress={() => setError(false)}>
                <Label>Email</Label>
                <Input value={'잘못된 이메일 입니다'} />
                <Icon active name='ios-close-circle' />
              </Item>
            </View>
          }
        </Form>
        <BottomButton
          title={!user ? '검색' : '요청 보내기'}
          onPress={!user ? _onUserSearch : _onApprovalRequest}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 300,
    backgroundColor: Colors.white
  },
  modalMessage: {
    fontSize: 13
  },
  emailBox: {
    width: 300,
    height: 100,
    alignSelf: 'center' ,
    marginTop: 40,
  }
});
