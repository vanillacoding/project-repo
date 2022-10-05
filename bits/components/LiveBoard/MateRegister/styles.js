import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mateRegisterWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EDCD88',
    width: '80%',
    height: '30%',
    borderRadius: 10
  },
  textWrapper: {
    alignItems: 'center'
  },
  registerText: {
    fontWeight: '900',
    color: 'white',
    padding: 10,
    fontSize: 15
  }
});

export default styles;
