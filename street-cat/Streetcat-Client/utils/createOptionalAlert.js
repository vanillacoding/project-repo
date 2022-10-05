import { Alert } from 'react-native';

const createOptionalAlert = (fristOpt, secondOpt, runFunction) => {
  Alert.alert(
    fristOpt,
    secondOpt,
    [
      { text: '네', onPress:() => runFunction() },
      { text: '취소' }
    ],
  );
};

export default createOptionalAlert;
