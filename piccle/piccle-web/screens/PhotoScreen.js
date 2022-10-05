import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { GestureHandler } from 'expo';
import Map from '../components/Map';
const { TapGestureHandler, State } = GestureHandler;

export default class PhotoScreen extends Component {
  _onSingleTap(index, event) {
    const { onSingleTap } = this.props;
    if (event.nativeEvent.state === State.ACTIVE) {
      onSingleTap(index);
    }
  };

  render() {
    const { photoList } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {
            photoList.map((list, index) => {
              return (
                <TapGestureHandler
                  key={index}
                  onHandlerStateChange={this._onSingleTap.bind(this, index)}
                >
                  <View style={styles.photoWrapper}>
                    <View style={styles.photoBackground}>
                      {
                        list.showPhoto ?
                          <Image
                            style={styles.photo}
                            source={{uri: `${list.photoUrl}`}}
                          />
                          : <Map position={{lat: list.lat, lon: list.lon}} />
                      }
                    </View>
                  </View>
                </TapGestureHandler>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  photoWrapper: {
    width: 320,
    height: 320,
    marginTop: 10,
    marginBottom: 20
  },
  photoBackground: {
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#e2f2ed'
  },
  photo: {
    width: 320,
    height: 320,
    borderRadius: 160,
    resizeMode: 'cover'
  }
});
