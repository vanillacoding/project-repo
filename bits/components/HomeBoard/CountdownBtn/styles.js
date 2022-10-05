import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pressButtonWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1
  },
  pressButtonText: {
    fontWeight: '700',
    fontSize: 17,
    color: 'white'
  },
  circleWrapper: {
    marginTop: 30
  },
  doneText: {
    color: '#4cd137',
    fontWeight: '600'
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  pauseBtn: {
    marginRight: 15
  },
  cancelBtn: {
    marginLeft: 15
  }
});

export default styles;
