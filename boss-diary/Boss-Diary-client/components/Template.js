import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function Template(props) {
  const { nav, template, path } = props;

  return (
    <TouchableOpacity
      onPress={() => nav.navigate(path, { template: template })}
    >
      <View style={styles.templateContainer}>
        <Image
          style={styles.templateThum}
          source={{ uri: template.url }}
        />
        <Text>{template.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  templateContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 20
  },
  templateThum: {
    borderWidth: 0.3,
    width: 160,
    height: 240,
    marginBottom: 10
  }
});
