import { CommonActions } from '@react-navigation/native';

const resetAction = (index, screen) => {
  return CommonActions.reset({
    index,
    routes: [
      {
        name: screen,
      },
    ],
  });
};

export default resetAction;
