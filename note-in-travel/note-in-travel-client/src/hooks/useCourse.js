import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import fetchData from "../utils/fetchData";
import splitCourse from "../utils/splitCourse";

/**
 * hook to fetch course by course id from api server and split them suitably
 * @param {string} courseId - to fetch from api server
 * @param {object|null} setStates - to handle states being outside
 * @returns object including setState and states of course info, messages, favorites
 */
function useCourse(courseId, { setIsLoading, changeRegion, setErrorMsg } = {}) {
  const [courseInfo, setCourseInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(useCallback(() => {
    let isCancelled = false;

    (async function fetchCourseByCourseId(id) {
      try {
        const response = await fetchData("GET", `/course/${id}`);

        if (isCancelled) return;

        const {
          courseInfo: newCourseInfo,
          messages: newMessages,
          favorites: newFavorites,
          sites,
        } = splitCourse(response);

        setCourseInfo(newCourseInfo);
        setMessages(newMessages);
        setFavorites(newFavorites);

        changeRegion && changeRegion(sites);
      } catch (err) {
        setErrorMsg && setErrorMsg(err.message);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    })(courseId);

    return () => {
      isCancelled = true;
    };
  }, [courseId]));

  return {
    courseInfo,
    messages,
    setMessages,
    favorites,
    setFavorites,
  };
}

export default useCourse;
