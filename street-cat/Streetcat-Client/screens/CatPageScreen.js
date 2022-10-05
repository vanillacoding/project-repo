import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Input from '../components/Input';
import handleInput from '../utils/handleInput';
import  { ACTION_SHEET_VALUE } from '../constants'
import { Icon, Button } from 'native-base';
import ActionSheetButton from '../components/ActionSheetButton';
import Comment from '../components/Comment';

const CatPageScreen = ({ 
  cat, 
  navigation, 
  isFounder, 
  snedModifiedData, 
  sendLikePostRequest, 
  sendDeleteRequest,
  userId,
  comments,
  postRequesAddComment,
  deleteComment,
}) => {
  const [isModyfing, setIsModifying] = useState(false);
  const [accessibility, setAccessibility] = useState({ clicked: cat.accessibility });
  const [friendliness, setFriendliness] = useState({ clicked: cat.friendliness });
  const [description, setDescription] = useState(cat.description);
  const [name, setName] = useState(cat.name);
  const hasSubmitted = useRef(false);
  
  const updateHandler = async () => {
    if(hasSubmitted.current) return;
    if (!name) {
      return Alert.alert('이름을 입력해주세요');
    }else if(accessibility.clicked === '취소') {
      return Alert.alert('난이도를 골라주세요');
    } else if (friendliness.clicked === '취소') {
      return Alert.alert('친화력을 골라주세요');
    }else if(!name) {
      return Alert.alert('이름을 꼭 입력해 주세요!');
    }
  
    const updatedata = {
      name,
      description,
      accessibility: accessibility.clicked,
      friendliness: friendliness.clicked, 
    }

    snedModifiedData(updatedata, cat._id);
    hasSubmitted.current = true;
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <CustomHeader 
          sendDeleteRequest={sendDeleteRequest}
          navigation={navigation} 
          isFounder={isFounder}
          setIsModifying={setIsModifying}
        />
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: cat.image }}
            style={styles.imageBox}
          />
          <Text style={styles.header}>냥이 이름</Text>
            <Input
              style={styles.nameInput} 
              maxLength={10}
              onChangeText={(e) => handleInput(e, setName)}
              editable={isModyfing}
              value={name}
            />
          <Text style={styles.header}>
            접근난이도: {accessibility.clicked !== '취소' ? accessibility.clicked : null}
          </Text>
          <Text style={styles.header}>
            친화력: {friendliness.clicked !== '취소' ? friendliness.clicked : null}
          </Text>
          {isModyfing && (
            <View style={styles.actionContainer}>
              <View style={styles.actionBox}>
                <ActionSheetButton 
                  array={ACTION_SHEET_VALUE}
                  cancelIndex={3}
                  title={'난이도 수정'}
                  actionFunction={setAccessibility}
                />
              </View>
              <View style={styles.actionBox}>
                <ActionSheetButton 
                  array={ACTION_SHEET_VALUE}
                  cancelIndex={3}
                  title={'친화력 수정'}
                  actionFunction={setFriendliness}
                />
              </View>
            </View>
          )}
          <Text style={styles.header}>특이사항</Text>
            <Input 
              style={styles.descriptionInput} 
              maxLength={25}
              onChangeText={(e) => handleInput(e, setDescription)}
              editable={isModyfing}
              value={description}
            />
          <TouchableOpacity onPress={()=> sendLikePostRequest(cat._id)}>
            <Icon name='heart' style={styles.likeButton}/>
          </TouchableOpacity>
        </View>
      </View>
      {isModyfing && 
        <View style={styles.saveButtonContainer}>
          <Button 
            iconLeft 
            rounded 
            disabled={false} 
            style={styles.saveButton}
            onPress={updateHandler}
          >
            <Icon  name="ios-save"/>
            <Text style={{ padding: 20 }}>저장</Text>
          </Button>
        </View>
      }
      <Comment 
        cat={cat} 
        userId={userId} 
        comments={comments} 
        postRequesAddComment={postRequesAddComment}
        deleteComment={deleteComment}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    height: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: Dimensions.get('window').width / 1.1,
    height: '90%',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
    imageBox: {
    width: '90%',
    height: 200,
  },
  header: {
    fontSize:20,
    fontWeight:"bold",
    color:"#364f6b",
    marginBottom:10,
  },
  nameInput: {
    textAlign: 'center',
    width: Dimensions.get('window').width / 2,
    fontSize: 15,
  },
  header: {
    fontSize:20,
    fontWeight:"bold",
    color:"#364f6b",
    marginBottom:10,
  },
  actionContainer: {
    width: '100%', 
    flex:1, 
    justifyContent: 'space-around', 
    flexDirection: 'row',
  },
  actionBox: {
    width: '40%',
  },
  descriptionInput: {
    width: '90%',
    fontSize: 15,
  },
  likeButton: {
    fontSize: 70,
    color: '#ff9191',
  },
  saveButton: {
    width: 100, 
    backgroundColor: '#ff9191', 
  },
  saveButtonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  }
});

export default CatPageScreen;
