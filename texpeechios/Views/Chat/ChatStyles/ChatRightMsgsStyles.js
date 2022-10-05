import { StyleSheet } from 'react-native';


const ChatRightMsgsStyles = StyleSheet.create({
  myMsgsWrap: {
    flex: 1,
    marginBottom: 4,
  },
  myMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 4,
  },
  msgDateWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  msgDate: {
    color: '#AAA',
    fontSize: 12,
  },
  micIcon: {
    width: 13,
    height: 21,
    marginLeft: 4,
  },
  myMsgContainer: {
    marginRight: 8,
    marginTop: 16,
  },
  myMsgBox: {
    padding: 8,
    backgroundColor: '#C86DD7',
    marginLeft: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: 200,
  },
  myMsgFont: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatRightMsgsStyles;
