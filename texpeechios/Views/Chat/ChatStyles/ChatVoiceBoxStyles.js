import { StyleSheet } from 'react-native';

const ChatVoiceBoxStyles = StyleSheet.create({
  chatVoiceBox: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  voiceBoxIcon: {
    height: 53,
    width: 32,
  },
  voiceBoxBg: {
    height: 72,
  },
  voiceBoxText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default ChatVoiceBoxStyles;