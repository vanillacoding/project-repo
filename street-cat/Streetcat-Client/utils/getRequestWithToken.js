import { AsyncStorage } from "react-native";
import { Alert } from 'react-native';

const getRequestWithToken = async (api) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    const res = await response.json();
    if (res.result !== 'ok') {
      throw new Error();
    }
    return res;
  } catch (error) {
    Alert.alert('고양이 정보를 가져오는데 실패했습니다. 다시 시도해주세요');
  }
  
};

export default getRequestWithToken;
