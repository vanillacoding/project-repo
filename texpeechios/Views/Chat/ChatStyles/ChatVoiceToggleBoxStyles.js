import { StyleSheet } from 'react-native';

const ChatVoiceToggleBoxStyles = StyleSheet.create({

  voiceModeToggleBox: {
    position: 'absolute',
    right: 20,
    top: 84,
    width: 140,
    height: 50,
    backgroundColor: '#fff',
    opacity: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  toggleMicIcon: {
    width: 13,
    height: 21,
    marginLeft: 8,
  },
  toggleBoxText: {
    marginLeft: 8,
    marginRight: 8,
    color: '#50555C',
  },
});

export default ChatVoiceToggleBoxStyles;