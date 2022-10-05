import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  moddalWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    fontWeight: '600',
    fontSize: 15
  },
  modal: {
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    height: '30%',
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 20
  },
  modalBtn: {
    backgroundColor: '#EDCD88',
    borderWidth: 1,
    width: 70,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmText: {
    fontWeight: '600'
  }
});

export default styles;
