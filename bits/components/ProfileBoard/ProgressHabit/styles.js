import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%'
  },
  userHabitWrapper: {
    backgroundColor: '#E8C06C',
    borderRadius:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    margin: 10
  },
  imgTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  habitTypeTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  habitTypeText: {
    fontWeight: '800',
    fontSize: 18,
    color: 'white',
    marginLeft: 30,
  }
});

export default styles;
