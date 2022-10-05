import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

function DropDown ({ dropdown, hide, navigation }) {

  if (dropdown.status) {
    const width = 100;
    return (
      <TouchableWithoutFeedback onPress={hide}>
        <View style={styles.container}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={{width, alignItems: 'center', paddingTop: 5}} onPress={() => hide('Edit', dropdown.item)}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width, alignItems: 'center', paddingTop: 5}} onPress={() => hide('Delete', dropdown.item)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return null
  }
}

const mapStateToProps = state => {
  return {
    dropdown: state.dropdownStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: user => { dispatch(setLoggedIn(true, user)); },
    setUserPortraits: portraits => { dispatch(setUserPortraits(portraits)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  dropdownContainer: {
    position: 'absolute',
    width: '50%',
    height: '20%',
    top: '40%', left: '25%', right: 0, bottom: 0,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  }
});

