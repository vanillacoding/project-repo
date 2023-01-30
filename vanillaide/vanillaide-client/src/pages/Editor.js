import PropTypes from "prop-types";
import { useState, useContext, useRef } from "react";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

import getEnvVars from "../../environment";
import api from "../api/api";
import NavBar from "../components/navBar/NavBar";
import { SUCCEEDED_SAVE_PROJECT } from "../constants/ui";
import { ProjectContext } from "../contexts/ProjectProvider";
import { useKeyboardHeight } from "../hooks/useKeyboardHeight";
import Layout from "../layout/Layout";

const { WEBVIEW_URL } = getEnvVars();

export default function Editor({ navigation }) {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const webViewRef = useRef();
  const {
    focusedProject: { projectId, code },
  } = useContext(ProjectContext);

  const windowHeight = Dimensions.get("window").height;
  const keyboardHeight = useKeyboardHeight();
  const currentHeight = windowHeight - keyboardHeight;

  const handleOnMessage = async (ev) => {
    const data = JSON.parse(ev.nativeEvent.data);

    if (data.method === "save") {
      const status = await api.patchProject(projectId, data.code);

      if (status === 200) {
        Alert.alert(SUCCEEDED_SAVE_PROJECT);
      }
    }

    if (data.method === "showMenu") {
      setIsNavBarVisible(true);
    }
  };

  const handleOnLoad = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify(code));
    }
  };

  const handleClosePress = () => {
    setIsNavBarVisible(false);
  };

  return (
    <Layout>
      {isNavBarVisible && (
        <NavBar
          isVisible={isNavBarVisible}
          handlePress={handleClosePress}
          navigation={navigation}
        />
      )}
      <View style={styles(currentHeight, keyboardHeight).container}>
        <WebView
          ref={webViewRef}
          onMessage={handleOnMessage}
          onLoad={handleOnLoad}
          source={{ uri: WEBVIEW_URL }}
        />
      </View>
    </Layout>
  );
}

Editor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = (currentHeight, keyboardHeight) =>
  StyleSheet.create({
    container: {
      marginBottom: keyboardHeight,
      width: "100%",
      height: currentHeight,
    },
  });
