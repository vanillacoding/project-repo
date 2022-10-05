import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  profileWrapper: {
    backgroundColor: 'white',
    borderWidth: 1,
    flexGrow: 1
  },
  profileBottomWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerHabitWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  registerHabitText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '800',
  },
  completeHabitText: {
    fontSize: 15,
    fontWeight: '800'
  }
});

export default styles;
