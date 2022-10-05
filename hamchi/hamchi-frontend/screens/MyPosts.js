import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createError } from '../features/userSlice';

import {
  ActionSheetIOS,
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import Modal from '../components/shared/Modal';
import Card from '../components/shared/Card';
import Empty from '../components/shared/Empty';

import enumToString from '../constants/mapEnumToString';
import errorMessage from '../constants/errorMessage';

import submissionAPI from '../api/submissions';
import postAPI from '../api/post';
import chatAPI from '../api/chat';
import colors from '../theme/color';

const MyPosts = () => {
  const dispatch = useDispatch();
  const myId = useSelector(state => state.user.userId);

  const [myPosts, setMyPosts] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubmissions, setSelectedSubmissions] = useState({});
  const [currentPostSubmissions, setCurrentPostSubmissions] = useState([]);
  const [openedPostsNumber, setOpenedPostsNumber] = useState(0);

  const [message, setMessage] = useState("분양 관련 연락드렸습니다 :)");
  const confirmationMessage = "에게 분양 수락 메시지를 전송합니다";

  useFocusEffect(
    useCallback(() => {
      getMyPosts();
    }, [])
  );

  useEffect(() => {
    setOpenedPostsNumber(getOpenedPostsNumber(myPosts));
  }, [myPosts]);

  function getOpenedPostsNumber() {
    let count = 0;

    if (myPosts === null) {
      return;
    }

    for (count = 0; count < myPosts.length; count++) {
      if (myPosts[count].status === 'closed') {
        break;
      }
    }

    return count;
  }

  function compareDateAndStatus(post1, post2) {
    if (post1.status === post2.status) {
      const time1 = new Date(post1.createdAt).getTime();
      const time2 = new Date(post2.createdAt).getTime();

      return time2 - time1;
    } else {
      return post1.status === 'opened' ? -1 : 1;
    }
  }

  function sortPosts(posts) {
    return posts.sort(compareDateAndStatus);
  }

  async function getMyPosts() {
    try {
      const response = await postAPI.requestGetMyPosts(myId);

      if (response.code === 200) {
        setMyPosts(sortPosts(response.data.posts));
      } else {
        dispatch(createError(errorMessage.FETCH_ERROR));
      }
    } catch (err) {
      dispatch(createError(errorMessage.INTERNAL_ERROR));
    }
  }

  async function updateSubmissions() {
    try {
      const response = await submissionAPI
        .requestUpdateSubmissionStatus(Object.keys(selectedSubmissions));
      if (response.code === 200) {
        getMyPosts();
      }
    } catch (err) {
      dispatch(createError(errorMessage.INTERNAL_ERROR));
    }
  }

  async function createNewChat() {
    for (let i = 0; i < currentPostSubmissions.length; i++) {
      const submissionId = currentPostSubmissions[i]._id;

      if (selectedSubmissions[submissionId]) {
        const guestId = currentPostSubmissions[i].owner;

        await chatAPI.requestCreateChat(myId, guestId, message);
      }
    }
  }

  async function handleClosePost(postId) {
    try {
      await postAPI.requestClosePost(postId);

      let index;
      for (index = 0; index < myPosts.length; index++) {
        if (myPosts[index]._id === postId) {
          break;
        }
      }

      const newMyPosts = [...myPosts];

      newMyPosts[index].status = 'closed';
      setMyPosts(sortPosts(newMyPosts));
    } catch (err) {
      dispatch(createError(errorMessage.INTERNAL_ERROR));
    }
  }

  async function showOptions(postId) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['취소', '분양 완료하기'],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    },
      buttonIndex => {
        if (buttonIndex === 0) {

        } else if (buttonIndex === 1) {
          handleClosePost(postId);
        }
      });
  }

  function handleSubmissionSelect(submissionId) {
    const newSelectedSubmissions = selectedSubmissions;

    if (selectedSubmissions[submissionId]) {
      delete newSelectedSubmissions[submissionId];
    } else {
      newSelectedSubmissions[submissionId] = true;
    }

    setSelectedSubmissions(newSelectedSubmissions);
  }

  function handleSelectedSubmissions(index) {
    const currentPost = myPosts[index];

    setCurrentPostSubmissions(currentPost.submissions);
    setIsModalVisible(true);
  }

  function handleModalConfirm() {
    updateSubmissions();
    createNewChat();
    setSelectedSubmissions({});
    setIsModalVisible(false);
  }

  async function init() {
    getMyPosts();
  }

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    init().then(() => setIsRefreshing(false));
  }, []);

  if (myPosts !== null && myPosts.length === 0) {
    return (
      <Empty
        title="분양글 리스트가 존재하지 않습니다"
      />
    );
  }

  return (
    <View>
      {isModalVisible
        &&
        (Object.keys(selectedSubmissions).length
          ? <Modal
            title="분양 관련 메시지 전송"
            onConfirm={handleModalConfirm}
            onClose={() => setIsModalVisible(false)}
          >
            {currentPostSubmissions.map(item => {
              if (selectedSubmissions[item._id]) {
                return <Text key={item._id}>{item.ownerName}님</Text>
              }
            })}
            <Text>{confirmationMessage}</Text>
            <Input
              value={message}
              onChangeText={setMessage}
            />
          </Modal>
          : <Modal
            title="분양 관련 메시지 전송"
            onConfirm={handleModalConfirm}
            onClose={() => setIsModalVisible(false)}
          >
            <Text>분양 보낼 사용자를 선택해주세요</Text>
          </Modal>

        )}
      <FlatList
        data={myPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const isSubmissionExist = item.submissions.length ? true : false;
          const isClosed = index >= openedPostsNumber;

          return (
            <View>
              {(index === 0 || index === openedPostsNumber)
                && <Text style={styles.title}>{enumToString.status[item.status]}</Text>}
              <View style={styles.container}>
                <Card
                  item={item}
                  selected={selectedSubmissions}
                  onSelect={handleSubmissionSelect}
                  showOptions={showOptions}
                />
                {isSubmissionExist
                  ? (!isClosed
                    && <Button
                      text="메시지 보내기"
                      type="filled"
                      onPress={() => handleSelectedSubmissions(index)}
                      customButtonStyle={styles.button}
                    />)
                  : <View>
                    <Text style={styles.text}>등록된 입양신청서가 없습니다.</Text>
                  </View>
                }
              </View>
            </View>
          );
        }}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 14,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 24,
    paddingBottom: 5,
  },
  text: {
    alignSelf: 'center'
  },
  button: {
    width: 120,
    height: 45,
    alignSelf: 'flex-end',
    margin: 12,
    marginTop: 0,
    borderRadius: 8
  }
});

export default MyPosts;
