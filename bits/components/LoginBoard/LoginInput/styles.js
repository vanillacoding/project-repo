import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: 'center',
    height: 120,
    justifyContent: 'space-evenly'
  },
  idInputWrapper: {
    backgroundColor: '#FAF0DB',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 230,
    height: 35
  },
  idTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  idText: {
    color: '#E4B356',
    fontWeight: '700',
    fontSize: 12
  },
  idTextInputWrapper: {
    width: '80%',
    textAlign: 'center',
    justifyContent: 'center'
  },
  pwInputWrapper: {
    backgroundColor: '#FAF0DB',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 230,
    height: 35
  },
  pwTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pwText: {
    color: '#E4B356',
    fontWeight: '700',
    fontSize: 12
  },
  pwTextInputWrapper: {
    width: '80%',
    textAlign: 'center',
    justifyContent: 'center'
  }
});

export default styles;
