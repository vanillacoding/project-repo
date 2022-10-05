import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

const CommentList = ({ comment, userId, deleteComment }) => {
  return (
    <View style={styles.listBox}>
      <Text style={styles.name}>{comment.writerName}   </Text>
      <Text style={styles.content}>{comment.content}</Text>
      {comment.writerId === userId && (
        <Icon
          style={styles.deleteIcon} 
          name="md-close-circle"
          onPress={() => deleteComment(comment._id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listBox: {
    flexDirection: 'row',
    padding: 5,
  },
  name: {
    fontWeight: 'bold', 
    fontSize: 20,
    width: '30%',
    textAlign: 'center'
  },
  content: {
    fontSize: 20, 
    textAlign: 'left',
    width: '60%'
  },
  deleteIcon: {
    marginLeft: 10,
  }
});

export default CommentList;
