import { connect } from "react-redux";
import SoundListComponent from "../components/SoundListComponent";
import firebase from "../services/firebase";
import axios from "axios";
import {
  beatLineChange,
  beatSoundFileAdd,
  soundUploadAndLoad,
  soundListAdd,
} from "../actions";

const storage = firebase.storage();
const database = firebase.database();
const soundListStateToProps = (state) => {
  return {
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    soundList: state.soundList,
  };
};

const soundListDispatchProps = (dispatch) => {
  return {
    onChangeBeatLine(beat) {
      dispatch(beatLineChange(beat));
    },
    addBeatSoundFile(file, keys) {
      dispatch(beatSoundFileAdd(file));
      dispatch(soundUploadAndLoad(true));
      const beatFileRef = storage.ref().child("/upload");
      beatFileRef
        .put(file)
        .then((result) => {
          beatFileRef
            .getDownloadURL()
            .then((result) => {
              database
                .ref(`upload/${file.name.split(".")[0]}`)
                .set({
                  beatName: file.name.split(".")[0],
                  beatUrl: result,
                })
                .then((result) => {
                  database
                    .ref(`upload/${file.name.split(".")[0]}`)
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
                          keys.add(
                            file.name.split(".")[0],
                            addSoundFile.beatUrl,
                            () => {
                              dispatch(soundUploadAndLoad(false));
                            }
                          );
                          dispatch(
                            soundListAdd({
                              beatName: addSoundFile.beatName,
                              beatUrl: reader.result,
                            })
                          );
                        };
                      });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  alert("File upload Error");
                });
            })
            .catch((err) => {
              console.log(err);
              alert("File upload Error");
            });
        })
        .catch((err) => {
          console.log(err);
          alert("File upload Error");
        });
    },
  };
};

export default connect(
  soundListStateToProps,
  soundListDispatchProps
)(SoundListComponent);
