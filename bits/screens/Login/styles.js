import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8BE64'
  },
  loginWrapper: {
    backgroundColor: '#EDCE8A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20
  }
});

export default styles;
