import React, { useState, useRef, Fragment } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
} from 'react-native';
import { CheckBox } from "native-base";
import Input from '../components/Input';
import  { CHECKBOX_VALUE, COLOR } from '../constants'
import handleInput from '../utils/handleInput';

const CatRegisterScreen = ({ sendDataToServer, photo, displyPhoto, location }) => {
  const [name, setName] = useState('');
  const [accessibility, setAccessibility] = useState({ answer: '' });
  const [friendliness, setFriendliness] = useState({ answer: '' });
  const [description, setDescription] = useState('');
  const hasRegistered = useRef(false);

  const submitHandler = async () => {
    if (hasRegistered.current) return;
    if (!name) Alert.alert('이름을 꼭 입력해 주세요!');
    if (!accessibility.answer) return Alert.alert('접근 난이도를 골라 주세요!');
    if (!friendliness.answer) return Alert.alert('친화력을 골라 주세요!');
    if (!photo.uri) return Alert.alert('고양이 사진을 등록해주세요');
    
    hasRegistered.current = true;
    const data = {
      name,
      accessibility: accessibility.answer,
      friendliness: friendliness.answer,
      description,
      location: [location.latitude, location.longitude],
    }
   
    sendDataToServer(data, photo);
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <>
        <View style={styles.screen}>
          <View style={styles.inputContainer}>
            <Text style={styles.header}>냥이 이름</Text>
            <Input 
              style={styles.nameInput} 
              maxLength={10}
              onChangeText={(e) => handleInput(e, setName)}
              value={name}
            />
            <Text style={styles.header}>접근난이도</Text>
            <View style={styles.checkBoxContainer}>
              {CHECKBOX_VALUE.map((value, i) => {
                return (
                  <Fragment key={Math.random().toString() + i + value}>
                    <CheckBox
                      color={COLOR.second}
                      onPress={() => setAccessibility({ answer: value })}
                      checked={accessibility.answer===value}
                    />
                    <Text style={styles.checkBoxText}>{value}</Text>
                  </Fragment>    
                );
              })}
            </View >
            <Text style={styles.header}>친화력</Text>
            <View style={styles.checkBoxContainer}>
              {CHECKBOX_VALUE.map((value, i) => {
                return (
                  <Fragment key={Math.random().toString() + i + value}>
                    <CheckBox
                      color={COLOR.second}
                      onPress={() => setFriendliness({ answer: value })}
                      checked={friendliness.answer===value}
                    />
                    <Text style={styles.checkBoxText}>{value}</Text>
                  </Fragment>    
                );
              })}
            </View >
            <Text style={styles.header}>특이사항</Text>
            <Input 
              style={styles.descriptionInput} 
              maxLength={25}
              onChangeText={(e) => handleInput(e, setDescription)}
              value={description}
            />
            <View style={styles.buttonContainer}>
              <Button
                color={COLOR.main}
                title="사진업로드"
                onPress={displyPhoto}
              />
            </View>
            {photo.uri && 
              <Image 
                source={{ uri: photo.uri }}
                style={styles.imageBox}
              />
            }
          </View>
        </View>
        <Button
          title="냥이등록"
          color={COLOR.main}
          style={styles.submit} 
          onPress={submitHandler}
        />
      </> 
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 350,
    maxWidth: '95%',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  nameInput: {
    width: '50%',
    fontSize: 15,
  },
  descriptionInput: {
    width: '90%',
    fontSize: 15,
  },
  header: {
    fontSize:20,
    fontWeight:"bold",
    color:"#364f6b",
    marginBottom:10,
  },
  checkBoxContainer: {
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },
  checkBoxText: {
    marginLeft: 38,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  imageBox: {
    width: 130,
    height: 130,
  }
});

export default CatRegisterScreen;
