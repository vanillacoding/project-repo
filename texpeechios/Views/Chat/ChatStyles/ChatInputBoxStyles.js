import { StyleSheet } from 'react-native';


const ChatInputBoxStyles = StyleSheet.create({
  chatInputBox: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#979797',
    height: 29,
    flexDirection: 'row',
    flex: 1,
    padding: 0,
    paddingLeft: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatInputBoxWrap: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  chatInputIcon: {
    width: 29,
    height: 29,
    flexDirection: 'row',
    marginLeft: 8,
  },
  chatInputSendIcon: {
    width: 29,
    height: 29,
    marginRight: 8,
  },
});

export default ChatInputBoxStyles;