import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

import {
  FAILED_SIGNUP,
  FAILED_LOGIN,
  INTERNAL_SERVER_ERROR,
  FAILED_GET_PROJECTS,
  FAILED_CREATE_PROJECT,
  FAILED_DELETE_PROJECT,
  FAILED_SAVE_PROJECT,
  FAILED_DEPLOYMENT,
  FAILED_POST_PERFORMANCE,
} from "../constants/error";
import axiosInstance from "./axiosInstance";

async function postAuthCheck() {
  try {
    const { data } = await axiosInstance.post("/api/auth");

    return data;
  } catch (err) {
    return { err };
  }
}

async function postSignUp(username, email, password, passwordConfirm) {
  try {
    const res = await axiosInstance.post("/api/auth/signup", {
      username,
      email,
      password,
      passwordConfirm,
    });

    return res.status;
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_SIGNUP);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function postLogIn(email, password) {
  try {
    const config = {
      headers: {
        email,
        password,
      },
    };
    const res = await axiosInstance.post("/api/auth/login", {}, config);
    const token = res.headers.token;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await SecureStore.setItemAsync("token", token);

    return res.data;
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_LOGIN);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function getProjects(userId) {
  try {
    const res = await axiosInstance.get(`api/users/${userId}/projects`);

    return { status: res.status, projects: res.data.projects };
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_GET_PROJECTS);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function postProject(userId, projectName) {
  try {
    const res = await axiosInstance.post(`/api/users/${userId}/projects`, {
      projectName,
    });

    return { status: res.status, project: res.data.project };
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_CREATE_PROJECT);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function deleteProject(projectId) {
  try {
    const { status } = await axiosInstance.delete(`/api/projects/${projectId}`);

    return status;
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_DELETE_PROJECT);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function patchProject(projectId, code) {
  try {
    const { status } = await axiosInstance.patch(`/api/projects/${projectId}`, {
      code,
    });

    return status;
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_SAVE_PROJECT);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function postDeployment(projectId) {
  try {
    const res = await axiosInstance.post(
      `/api/projects/${projectId}/deployment`,
    );

    return { status: res.status, deployLink: res.data.deployLink };
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_DEPLOYMENT);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

async function postPerformance(projectId) {
  try {
    const res = await axiosInstance.post(
      `/api/projects/${projectId}/performance`,
    );

    return {
      status: res.status,
      measuringResult: res.data.measuringResult,
    };
  } catch (err) {
    const errorStatus = err.response.status;

    if (errorStatus === 400) {
      Alert.alert(FAILED_POST_PERFORMANCE);
    }

    if (errorStatus === 500) {
      Alert.alert(INTERNAL_SERVER_ERROR);
    }
  }
}

export default {
  postSignUp,
  postLogIn,
  postAuthCheck,
  getProjects,
  postProject,
  deleteProject,
  patchProject,
  postDeployment,
  postPerformance,
};
