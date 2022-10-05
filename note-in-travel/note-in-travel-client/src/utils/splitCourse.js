/**
 * function to split course to courseInfo, messages, favorites, sites
 * @param {object} course - passed from DB
 * @returns object - splited course
 */
function splitCourse(course) {
  const { schedules, messages, favorites } = course;
  const sites = schedules.map((schedule) => schedule.site.region);
  const courseInfo = {};

  for (const key in course) {
    if (key !== "messages" && key !== "favorites") {
      courseInfo[key] = course[key];
    }
  }

  return {
    courseInfo,
    messages,
    favorites,
    sites,
  };
}

export default splitCourse;
