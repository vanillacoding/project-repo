import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import TabBarIcon from './TabBarIcon';

export default function HeaderMenu(props) {
  const { nav, name, dir, screen } = props;

  const _onClick = () => {
    dir ? nav.navigate(screen) : nav.openDrawer();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={_onClick}
    >
      <TabBarIcon name={name} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20
  }
});
