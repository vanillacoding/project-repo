export function loginAPI({ email, imageURL, name }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        "email": "asdf@asdf.com",
        "avatar": "asdfsdfsfsf.png",
        "username": "hama",
        "myProjects": [],
        "joinedProjects": [],
        "token": "aekjralek12345",
      });
    }, 1000);
  });
}

export function getMyProjectsAPI(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          "id": "sfsdfdsfafewf",
          "title": "Frontend 주니어 채용",
          "candidateNum": 30,
          "createAt": "2021-04-10",
        },
        {
          "id": "fdfsdfdsfsdf",
          "title": "Backend 주니어 채용",
          "candidateNum": 14,
          "createAt": "2021-04-10",
        }
      ]);
    }, 1000);
  });
};

export function getJoinedProjectsAPI(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          "id": "123412341234",
          "title": "Frontend 주니어 채용99",
          "candidateNum": 999,
          "createAt": "2021-04-13",
        },
        {
          "id": "5456547657657567",
          "title": "Backend 주니어 채용99",
          "candidateNum": 99,
          "createAt": "2021-04-13",
        }
      ]);
    }, 1000);
  });
};

export function addProjectAPI({ userId, newProject }) {
  return new Promise(resolve => {
    setTimeout(() => {
      const createdProject = {
        id: "projectId",
        title: "프론트엔드 주니어 채용",
        filters: ["컬쳐핏", "커뮤니케이션"],
        creator: "dfsdslfawef34",
        participants: ["sdfsdfsdf334", "fewifjeio23r35"],
        candidateNum: 0,
        createAt: "2021-04-10",
      };

      // 객체 1개짜리는 [] 배열로 감싸주어야 한다.
      resolve([createdProject]);
    });
  });
}

export function addNewIntervieweeAPI({ userId, interviwerInfo }) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newInterviewee = {
        email: "chewchewchew3@gmail.com",
        name: "jieun mine",
        interviewData: new Date(),
        resumePath: "/somewhare",
        isInterviewed: false,
      };

      // 객체 1개짜리는 [] 배열로 감싸주어야 한다.
      resolve([newInterviewee]);
    });
  });
}
