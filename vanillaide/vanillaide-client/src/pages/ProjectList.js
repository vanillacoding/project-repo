import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import PropTypes from "prop-types";
import { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import api from "../api/api";
import Logo from "../components/Logo";
import NavBar from "../components/navBar/NavBar";
import ModalForCreate from "../components/projectList/ModalForCreate";
import ModalForDetail from "../components/projectList/ModalForDetail";
import ProjectCard from "../components/projectList/ProjectCard";
import ProjectCreateButton from "../components/projectList/ProjectCreateButton";
import { LIGHT_GREY_100, LIGHT_GREY_150, CONTENT } from "../constants/color";
import { NO_PROJECT_NAME, MORE_THAN_MAXLENGTH } from "../constants/error";
import { UserContext } from "../contexts/AuthProvider";
import { ProjectContext } from "../contexts/ProjectProvider";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

const statusBarHeight = StatusBar.currentHeight;

export default function ProjectList({ navigation }) {
  const [projectList, setProjectList] = useState([]);
  const [projectNameInput, setProjectNameInput] = useState("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const [detailsClickedProject, setDetailsClickedProject] = useState({
    projectId: "",
    projectName: "",
    code: {
      html: "",
      css: "",
      js: "",
    },
    deployState: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    loggedInUser: { _id: userId },
  } = useContext(UserContext);
  const { setFocusedProject } = useContext(ProjectContext);

  useFocusEffect(
    useCallback(() => {
      async function fetchProjects() {
        const { status, projects } = await api.getProjects(userId);

        if (status === 200) {
          setIsLoading(false);
          setProjectList(projects);
        }
      }

      fetchProjects();
    }, []),
  );

  const handleCardPress = ({ projectId, projectName, code, deployState }) => {
    setFocusedProject({ projectId, projectName, code, deployState });

    navigation.navigate("Editor");
  };

  const handleCreatePress = async () => {
    if (!projectNameInput) {
      return setErrorMessage(NO_PROJECT_NAME);
    }

    if (projectNameInput.length > 50) {
      return setErrorMessage(MORE_THAN_MAXLENGTH);
    }

    const { status, project } = await api.postProject(userId, projectNameInput);

    if (status === 201) {
      const { _id, name, htmlFile, cssFile, jsFile, deployLink } = project;

      setProjectNameInput("");
      setErrorMessage("");
      setIsCreateModalVisible(false);
      setFocusedProject({
        projectId: _id,
        projectName: name,
        code: { html: htmlFile, css: cssFile, js: jsFile },
        deployState: !!deployLink,
      });

      navigation.navigate("Editor");
    }
  };

  const handleDeployedPress = async (deployLink) => {
    await Clipboard.setStringAsync(deployLink);
  };

  const handleCancelPress = () => {
    setProjectNameInput("");
    setErrorMessage("");
    setIsCreateModalVisible(false);
  };

  const handleDetailPress = (projectId, projectName, code, deployState) => {
    setDetailsClickedProject({ projectId, projectName, code, deployState });
    setIsDetailModalVisible(true);
  };

  const handleDelete = async () => {
    const status = await api.deleteProject(detailsClickedProject.projectId);

    if (status === 200) {
      setIsDetailModalVisible(false);

      navigation.replace("ProjectList");
    }
  };

  const handlePerformancePress = () => {
    setIsDetailModalVisible(false);
    setFocusedProject(detailsClickedProject);
    navigation.navigate("Performance");
  };

  const handleDeployPress = () => {
    setIsDetailModalVisible(false);
    setFocusedProject(detailsClickedProject);
    navigation.navigate("Deploy");
  };

  const handleNavBarClose = () => {
    setIsNavBarVisible(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.statusBar} />
      {isNavBarVisible && (
        <NavBar
          isVisible={isNavBarVisible}
          handlePress={handleNavBarClose}
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
        {isLoading ? (
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={LIGHT_GREY_100}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingTop: 0, paddingBottom: 10 }}
          >
            <View style={styles.pageNameWrapper}>
              <Text style={styles.pageName}>My Projects</Text>
            </View>
            <View style={styles.projectListWrapper}>
              {projectList.map((project) => {
                const {
                  _id: projectId,
                  name,
                  htmlFile,
                  cssFile,
                  jsFile,
                  deployLink,
                } = project;
                const code = {
                  html: htmlFile,
                  css: cssFile,
                  js: jsFile,
                };

                return (
                  <ProjectCard
                    key={projectId}
                    projectId={projectId}
                    projectName={name}
                    code={code}
                    deployState={!!deployLink}
                    deployLink={deployLink}
                    handleCardPress={handleCardPress}
                    handleDetailPress={handleDetailPress}
                    handleDeployedPress={handleDeployedPress}
                  />
                );
              })}
              <ProjectCreateButton
                handlePress={() => setIsCreateModalVisible(true)}
              />
            </View>
          </ScrollView>
        )}
        <ModalForCreate
          isVisible={isCreateModalVisible}
          projectName={projectNameInput}
          handleChange={setProjectNameInput}
          handleCancelPress={handleCancelPress}
          handleCreatePress={handleCreatePress}
          errorMessage={errorMessage}
        />
        <ModalForDetail
          isVisible={isDetailModalVisible}
          projectInfo={detailsClickedProject}
          handlePress={() => setIsDetailModalVisible(false)}
          handleDelete={handleDelete}
          handlePerformancePress={handlePerformancePress}
          handleDeployPress={handleDeployPress}
        />
      </ContentBox>
    </ScrollView>
  );
}

ProjectList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
    backgroundColor: CONTENT,
    zIndex: 1,
  },
  pageNameWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  pageName: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_150,
  },
  projectListWrapper: {
    flex: 10,
    width: "100%",
    alignItems: "center",
  },
});
