import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CatpageScreen from '../screens/CatPageScreen';
import { 
  modifyAcat, 
  updateAcatForLike, 
  deleteAcat, 
  updateCatsComment, 
  getComments, 
  addAcomment, 
  deleteAcomment,
} from '../actions';
import { API } from '../constants';
import { AsyncStorage } from "react-native";
import likePostRequest from '../utils/likePostRequest';
import getRequestWithToken from '../utils/getRequestWithToken';
import createOptionalAlert from '../utils/createOptionalAlert';
import { DELETE_ALERT } from '../constants'
import { Alert } from 'react-native';

const CatPageContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isFounder, setIsFounder] = useState(false);
  const { comments } = useSelector((state) => state.comment);
  const { index } = route.params;
  const { user } = useSelector((state) => state);
  
  const cat = useSelector((state) => {
    if (index.length > 10) {
      const { catLists } = state.cat;
      return catLists.find((cat) => cat._id === index);
    }

    return state.cat.catsAround[index];
  });

  const getRequestForComments = async (id) => {
    try {
      const { result, comments } = await getRequestWithToken(
        `${API}/cat/${id}/comment`
      );

      if (result !== 'ok') throw new Error();
      dispatch(getComments(comments));
    } catch (error) {
      Alert.alert('코멘트 정보를 가져오는데 실패했습니다.');
    }
  };

  const postRequesAddComment = async (input) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const { _id } = cat;
      const response = await fetch(`${API}/cat/${cat._id}/comment`, {
        method: 'POST',
        body: JSON.stringify({ 
          id: _id, 
          writerId: user.mongoId, 
          content: input, 
          writerName: user.name,
        }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },  
      });
      
      const { result, comment } = await response.json();
      if (result !== 'ok') throw new Error();
      dispatch(addAcomment(comment));
    } catch (error) {
      return Alert.Alert('코멘트를 추가하는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      getRequestForComments(cat._id);
      setIsFounder(user.mongoId === cat.founder);
    };

    if (cat) {
      fetchComments();
    }
  }, [cat]);

  const snedModifiedData = async (updatedata, catId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API}/cat/${catId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedata),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },  
      });
  
      const { cat, result } = await response.json();
      if (result !== 'ok') throw new Error();
      dispatch(modifyAcat(cat));
      navigation.goBack();
    } catch (error) {
      Alert.alert('정보를 수정하는데 실패했습니다. 다시 시도해주세요');
    }
  };

  const hasLiked = useRef(false);
  const sendLikePostRequest = async (catId) => {
    if (hasLiked.current) return;
    hasLiked.current = true;
    try {
      const { cat, result } = await likePostRequest(catId);
      if (result === 'ok') {
        dispatch(updateAcatForLike(cat));
      } else if (result === 'already done') {
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      Alert.alert('다시 시도해주세요');
    } 
  };

  const sendDeleteRequest = () => {
    const helper = async () => {
      try {
        const { _id, founder } = cat;
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${API}/cat/${_id}`, {
          method: 'DELETE',
          body: JSON.stringify({ _id, founder }),
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },  
        });

        const res = await response.json();
        if (res.result !== 'ok') throw new Error();
          dispatch(deleteAcat(res.cat));
          navigation.navigate('Home');
      } catch (error) {
        Alert.alert('삭제요청이 실패했습니다. 다시 시도해주세요');
      }
    };
    
    createOptionalAlert(DELETE_ALERT.option1, DELETE_ALERT.option2, helper);
  };

  const sendDeleteRequestForComment = (commentId) => {
    const helper = async () => {
      try {
        const { _id } = cat;
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${API}/cat/${_id}/comment/${commentId}`, {
          method: 'DELETE',
          body: JSON.stringify({ catId: _id, commentId }),
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },  
        });
        
        const { kitty, comment, result } = await response.json();
        if (result !== 'ok') throw new Error();
        dispatch(updateCatsComment(kitty));
        dispatch(deleteAcomment(comment));
      } catch (error) {
        Alert.alert('코멘트 삭제가 실패했습니다. 다시 시도해주세요');
      }
    };

    createOptionalAlert(DELETE_ALERT.option1, DELETE_ALERT.option2, helper);
  };

  if (cat) {
    return (
      <CatpageScreen 
        cat={cat} 
        navigation={navigation} 
        isFounder={isFounder}
        snedModifiedData={snedModifiedData}
        sendLikePostRequest={sendLikePostRequest}
        sendDeleteRequest={sendDeleteRequest}
        userId={user.mongoId}
        comments={comments}
        postRequesAddComment={postRequesAddComment}
        deleteComment={sendDeleteRequestForComment}
      />
    ); 
  }

  return null;
};

export default CatPageContainer;
