import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

export default class listHeaderBar extends React.Component {

  render() {
    var leftText = '';
    var rightText = '';
    if (this.props.selectedTab === 'Friends') {
      rightText = 'Add';
    } else if (this.props.selectedTab === 'Chats') {
      leftText = 'Edit';
      rightText = 'Create';
    } else {
    }
    return (
      <View>
        <View style={listHeaderBarStyles.headerBarContainer}>
          <View style={[listHeaderBarStyles.headerBarBox, listHeaderBarStyles.withShadow]}>
            <View style={listHeaderBarStyles.headerBarLeftWrap}>
              <Text style={listHeaderBarStyles.headerBarText}>{leftText}</Text>
            </View>
            <View style={listHeaderBarStyles.headerBarCenterWrap}>
              <Text style={listHeaderBarStyles.headerBarTitle}>{this.props.selectedTab}</Text>
            </View>
            <View style={listHeaderBarStyles.headerBarRightWrap}>

              {
                <Text style={listHeaderBarStyles.headerBarText}>{rightText}</Text>
              }


            </View>
          </View>
        </View>
      </View>
    );
  }
}

const listHeaderBarStyles = StyleSheet.create({
  headerBarContainer: {
    height: 67,
    backgroundColor: '#f1f1f1',
  },
  headerBarBox: {
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 26,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  withShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    },
  },
  headerBarLeftWrap: {
    flex: 1,
  },
  headerBarCenterWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerBarRightWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerBarIcon: {
    width: 11,
    height: 18,
  },
  headerBarTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#424242',
    fontWeight: 'bold',
  },
  headerBarText: {
    color: '#C86DD7',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: 'normal',
  }
});
