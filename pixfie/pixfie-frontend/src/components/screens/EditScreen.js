import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

import Header from '../layouts/Header';
import { savePortrait } from '../../utils/api';
import { optionThemes } from '../../constants/canvas';
import { handleCanvas, carouselHandler } from '../../utils/index';
import { setFaceType, setOptionTheme, setCurrentTheme, setCurrentOption } from '../../actions/index';

export function EditScreen (props) {
  const {
    loggedIn,
    faceType,
    option,
    theme,
    optionTheme,
    setFaceType,
    setCurrentOption,
    setCurrentTheme,
    setOptionTheme,
    clearOptions,
    route,
    navigation
  } = props;

  const { portrait, mode } = route.params;
  const isEdit = mode === 'Edit';

  useEffect(() => {
    return navigation.addListener('focus', () => {
      return isEdit ? setFaceType(portrait.faceType) : '';
    });
  }, [navigation]);

  const pressHandler = (mode, direction) => {
    if (mode === 'theme') {
      let newTheme = 0;
      if (direction === 'left') {
        newTheme = !theme ? optionThemes.length - 1 : theme - 1;
      } else {
        newTheme = theme === optionThemes.length - 1 ? 0 : theme + 1;
      }
      setCurrentTheme(newTheme);
      setOptionTheme(optionThemes[newTheme]);
    } else {
      const newOption = carouselHandler(direction, optionTheme, option);
      setCurrentOption(newOption);
  
      setFaceType(optionTheme.id === 'faceColor' ?
      {
        ...faceType,
        [optionTheme.id]: optionTheme.options[newOption][0],
        faceShadowColor: optionTheme.options[newOption][1],
        lipColor: optionTheme.options[newOption][1],
      }
      : { ...faceType, [optionTheme.id]: optionTheme.options[newOption] });
    }
  };

  const saveHandler = () => {
    isEdit ?
    savePortrait('put', loggedIn.user._id, faceType, 'Mypage', navigation, portrait)
    : savePortrait('post', loggedIn.user._id, faceType, 'Home', navigation);

    clearOptions();
  };

  const redoHandler = () => {
    isEdit ? navigation.goBack() : navigation.navigate('Home');
    clearOptions();
  };

  return (
    <View style={styles.container}>
      <Header name={isEdit ? "Edit" : "Result"} navigation={navigation} />
      <View style={styles.optionControlContainer}>
        <TouchableOpacity onPress={() => pressHandler('theme', 'left')}>
          <Entypo name="arrow-bold-left" size={40} color="gray" />
        </TouchableOpacity>
        <Text style={styles.option}>{optionTheme.name}</Text>
        <TouchableOpacity onPress={() => pressHandler('theme', 'right')}>
          <Entypo name="arrow-bold-right" size={40} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.optionControlContainer}>
        <TouchableOpacity onPress={() => pressHandler('option', 'left')}>
          <Entypo name="arrow-bold-left" size={40} color="gray" />
        </TouchableOpacity>
        <Text style={styles.option}>{optionTheme.options[option][0]}</Text>
        <TouchableOpacity onPress={() => pressHandler('option', 'right')}>
          <Entypo name="arrow-bold-right" size={40} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        <Canvas style={styles.canvas} ref={canvas => handleCanvas(canvas, faceType)} /> 
      </View>
      <TouchableOpacity style={styles.buttonSave} onPress={saveHandler}>
        <Text style={styles.buttonText}>픽셀 프로필 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRedo} onPress={redoHandler}>
        <Text style={styles.buttonText}>{isEdit ? '취소' : '다시하기'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    faceType: state.faceType,
    optionTheme: state.optionTheme,
    theme: state.currentTheme,
    option: state.currentOption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFaceType: faceType => { dispatch(setFaceType(faceType)); },
    setOptionTheme: optionTheme => { 
      dispatch(setOptionTheme(optionTheme));
      dispatch(setCurrentOption(0));
    },
    setCurrentTheme: theme => { dispatch(setCurrentTheme(theme)) },
    setCurrentOption: option => { dispatch(setCurrentOption(option)); },
    clearOptions: () => {
      dispatch(setOptionTheme(optionThemes[0]));
      dispatch(setCurrentOption(0));
      dispatch(setCurrentOption(0));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionControlContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  option: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 40,
    width: 150,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  canvas: {
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1
  },
  buttonSave: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#14A647',
    elevation: 1
  },
  buttonRedo: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#4968A6',
    elevation: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
