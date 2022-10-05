import { connect } from "react-redux";
import AppComponent from "../components/MainComponent";
import firebase from "../services/firebase";
import axios from "axios";
import {
  noteIndexSet,
  noteChange,
  beatBpmSet,
  beatInitialized,
  beatStateSet,
  beatListShow,
  soundListAdd,
  beatLineSelect,
  beatLineAdd,
  beatLineRemove,
  beatUrlSave,
  beatUrlSaveAndShow,
  soundUploadAndLoad,
  soundListLoad,
} from "../actions";

const database = firebase.database();

const beatupStateToProps = (state) => {
  return {
    bpm: state.bpm,
    nowNoteIndex: state.nowNoteIndex,
    noteNum: state.noteNum,
    isPlay: state.isPlay,
    initBeat: state.initBeat,
    initEvents: state.initEvents,
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    nowSelectedUploadFile: state.nowSelectedUploadFile,
    soundList: state.soundList,
    isSoundUploadAndLoding: state.isSoundUploadAndLoding,
    saveUrl: state.saveUrl,
    saveUrlShow: state.saveUrlShow,
    router: state.router,
    muteBeat: state.muteBeat,
    maxLine: state.maxLine,
  };
};

const beatupDispatchProps = (dispatch, ownProps) => {
  return {
    setNoteIndex(noteIdx) {
      dispatch(noteIndexSet(noteIdx));
    },
    onNoteChange(beat) {
      dispatch(noteChange(beat));
    },
    setBeatBpm(bpm) {
      dispatch(beatBpmSet(bpm));
    },
    onBeatInit() {
      dispatch(beatInitialized());
    },
    onBeatState(state) {
      dispatch(beatStateSet(state));
    },
    onBeatListShow(state) {
      dispatch(beatListShow(state));
    },
    addSoundList(sound) {
      dispatch(soundListAdd(sound));
    },
    onSelectBeatLine(beat) {
      dispatch(beatLineSelect(beat));
    },
    addBeatLine() {
      dispatch(beatLineAdd());
    },
    removeBeatLine() {
      dispatch(beatLineRemove());
    },
    onBeatSave(beat, bpm) {
      let beatCopy = beat.slice();
      beatCopy = beatCopy.filter((beat, index) => {
        if (Object.keys(beat)[0].indexOf("noname") < 0) {
          return beat;
        } else {
          return false;
        }
      });

      const sheetKey = database
        .ref(`beatSheet`)
        .push()
        .getKey();
      database
        .ref(`beatSheet/${sheetKey}`)
        .set({
          beatCopy,
          bpm,
        })
        .then(() => {
          dispatch(beatUrlSave(sheetKey));
          dispatch(beatUrlSaveAndShow(true));
        })
        .catch((err) => {
          console.log(err);
          alert("Beat save failed");
        });
    },
    onBeatSaveShow(state) {
      dispatch(beatUrlSaveAndShow(state));
    },
    onBeatLoad(beatKey, soundList, keys, bpm, beats) {
      const addKeysPromiseArr = [];
      if (beatKey !== "/") {
        // dispatch(soundUploadAndLoad(true));
        // database.ref(`beatSheet${beatKey}`).on('value', (snapshot) => {
        //   if (snapshot.val()) {
        //     bpm.value = snapshot.val().bpm;
        //     dispatch(noteChange(snapshot.val().beatCopy));
        //     dispatch(beatBpmSet(snapshot.val().bpm));
        //     const addSoundFilePromiseArr = [];
        //     let sampler = Object.keys(soundList);
        //     const _sampler = snapshot.val().beatCopy.map(beat => {
        //       return Object.keys(beat)[0];
        //     });
        //     sampler = sampler.concat(_sampler);
        //     for (let i = 0; i < sampler.length; i++) {
        //       addSoundFilePromiseArr[i] = new Promise((resolve, reject) => {
        //         database.ref(`upload/${sampler[i]}`).on('value', (snapshot) => {
        //           const addSoundFile = snapshot.val();
        //           axios({
        //             method: 'get',
        //             url: addSoundFile.beatUrl,
        //             responseType: 'blob'
        //           })
        //             .then((result) => {
        //               const reader = new window.FileReader();
        //               reader.readAsDataURL(result.data);
        //               reader.onload = () => {
        //                 resolve({ beatName: addSoundFile.beatName, beatUrl: reader.result });
        //                 dispatch(soundListAdd({ beatName: addSoundFile.beatName, beatUrl: reader.result }));
        //               }
        //             });
        //         });
        //       });
        //     }
        //     Promise.all(addSoundFilePromiseArr)
        //       .then((result) => {
        //         for (let i = 0; i < result.length; i++) {
        //           addKeysPromiseArr[i] = new Promise((resolve, reject) => {
        //             keys.add(result[i].beatName, result[i].beatUrl, () => {
        //               resolve(i);
        //             });
        //           });
        //         }
        //         Promise.all(addKeysPromiseArr)
        //           .then((result) => {
        //             dispatch(soundUploadAndLoad(false));
        //           })
        //           .catch((err) => {
        //             console.log(err);
        //           });
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       })
        //   } else {
        //     ownProps.history.push('/');
        //   }
        // });
      } else {
        dispatch(soundUploadAndLoad(true));
        const _addSoundFilePromiseArr = [];
        for (let i = 0; i < Object.keys(soundList).length; i++) {
          _addSoundFilePromiseArr[i] = new Promise((resolve, reject) => {
            database
              .ref(`upload/${Object.keys(soundList)[i]}`)
              .on("value", (snapshot) => {
                const addSoundFile = snapshot.val();
                axios({
                  method: "get",
                  url: addSoundFile.beatUrl,
                  responseType: "blob",
                }).then((result) => {
                  const reader = new window.FileReader();
                  reader.readAsDataURL(result.data);
                  reader.onload = () => {
                    resolve({
                      beatName: addSoundFile.beatName,
                      beatUrl: reader.result,
                    });
                    dispatch(
                      soundListAdd({
                        beatName: addSoundFile.beatName,
                        beatUrl: reader.result,
                      })
                    );
                  };
                });
              });
          });
        }

        Promise.all(_addSoundFilePromiseArr)
          .then((result) => {
            for (let i = 0; i < result.length; i++) {
              addKeysPromiseArr[i] = new Promise((resolve, reject) => {
                keys.add(result[i].beatName, result[i].beatUrl, () => {
                  resolve(i);
                });
              });
            }

            Promise.all(addKeysPromiseArr)
              .then((result) => {
                const addSoundFilePromiseArr = [];
                for (let i = 0; i < beats.length; i++) {
                  addSoundFilePromiseArr[i] = new Promise((resolve, reject) => {
                    database
                      .ref(`upload/${Object.keys(beats[i])}`)
                      .on("value", (snapshot) => {
                        const addSoundFile = snapshot.val();
                        axios({
                          method: "get",
                          url: addSoundFile.beatUrl,
                          responseType: "blob",
                        }).then((result) => {
                          const reader = new window.FileReader();
                          reader.readAsDataURL(result.data);
                          reader.onload = () => {
                            resolve({
                              beatName: addSoundFile.beatName,
                              beatUrl: reader.result,
                            });
                            dispatch(
                              soundListAdd({
                                beatName: addSoundFile.beatName,
                                beatUrl: reader.result,
                              })
                            );
                          };
                        });
                      });
                  });
                }

                Promise.all(addSoundFilePromiseArr)
                  .then((result) => {
                    for (let i = 0; i < result.length; i++) {
                      addKeysPromiseArr[i] = new Promise((resolve, reject) => {
                        keys.add(result[i].beatName, result[i].beatUrl, () => {
                          resolve(i);
                        });
                      });
                    }

                    Promise.all(addKeysPromiseArr)
                      .then((result) => {
                        dispatch(soundUploadAndLoad(false));
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    onSoundListLoad(list) {
      dispatch(soundListLoad(list));
    },
  };
};

export default connect(beatupStateToProps, beatupDispatchProps)(AppComponent);
