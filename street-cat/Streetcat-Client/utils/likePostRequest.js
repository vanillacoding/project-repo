import { API } from '../constants';
import { AsyncStorage } from "react-native";

const likePostRequest = async (catId) => {
  const token = await AsyncStorage.getItem('token');
  const id = await AsyncStorage.getItem('userId');
  const response = await fetch(`${API}/cat/${catId}/like`, {
    method: 'POST',
    body: JSON.stringify({ id, catId }),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
     },
  });

  const result  = await response.json();
    if (result.message === 'User already liked it') {
      return { cat: null, message: result.message };
  }

  return result;
};

export default likePostRequest;
