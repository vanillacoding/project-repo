import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SplitLayout from '../components/SplitLayout';
import RegisterForm from '../components/RegisterForm';
import { saveRegistrationData } from '../apis/register';
import { errorOccured } from '../reducers/error';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleRegisterFormSubmit(data) {
    try {
      const response = await saveRegistrationData(data);
      const { message } = await response.json();

      if (!response.ok) {
        dispatch(errorOccured(message));
        return;
      }

      history.push('/login');
    } catch (error) {
      dispatch(errorOccured('회원가입에 실패했습니다.'));
    }
  }

  return (
    <SplitLayout>
      <RegisterForm
        onRegisterFormSubmit={handleRegisterFormSubmit}
      />
    </SplitLayout>
  );
}
