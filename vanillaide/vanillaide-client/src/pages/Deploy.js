import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import api from "../api/api";
import Logo from "../components/Logo";
import DeployStart from "../components/deploy/DeployStart";
import DeploySuccess from "../components/deploy/DeploySuccess";
import NavBar from "../components/navBar/NavBar";
import { LIGHT_GREY_100 } from "../constants/color";
import { ProjectContext } from "../contexts/ProjectProvider";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import Layout from "../layout/Layout";

export default function Deploy({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const [deployLink, setDeployLink] = useState("");

  const {
    focusedProject: { projectId, projectName },
  } = useContext(ProjectContext);

  const handleDeployPress = async () => {
    setIsLoading(true);

    const { status, deployLink } = await api.postDeployment(projectId);

    if (status === 200) {
      setDeployLink(deployLink);
      setIsLoading(false);
      setIsFinished(true);
    }
  };

  const handleGoToPress = () => {
    navigation.navigate("Deployed", { projectId });
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
      <AppHeader>
        <Feather
          name="menu"
          size={30}
          color={LIGHT_GREY_100}
          onPress={() => setIsNavBarVisible(true)}
        />
        <Logo fontSize={30} />
        <View />
      </AppHeader>
      <ContentBox>
        {!isFinished && !isLoading ? (
          <DeployStart
            projectName={projectName}
            handlePress={handleDeployPress}
          />
        ) : (
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={LIGHT_GREY_100}
          />
        )}
        {isFinished && (
          <DeploySuccess
            deployLink={deployLink}
            handleGoToPress={handleGoToPress}
          />
        )}
      </ContentBox>
    </Layout>
  );
}

Deploy.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
