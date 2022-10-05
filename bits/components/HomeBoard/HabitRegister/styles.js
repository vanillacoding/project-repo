import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainTopWrapper: {
    flexGrow: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  habitRegisterWrapper: {
    backgroundColor: '#EDCD88',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '25%',
    borderRadius: 10,
    flexGrow: 0.8,
  },
  textButtonWrapper: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  registerText: {
    fontWeight: '900',
    color: 'white',
    fontSize: 15
  }
});

export default styles;
