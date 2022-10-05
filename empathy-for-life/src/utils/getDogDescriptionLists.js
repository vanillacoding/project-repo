import { DOG_PROFILE_TITLES } from "../constants/constants";

const getDogDescriptions = (dogData) => {
  if (!dogData) {
    return [];
  }

  return DOG_PROFILE_TITLES.map((title) => {
    let description = dogData[title.en];
    if (title.en === "gender") {
      description = description === "male" ? "수컷" : "암컷";
    } else if (title.en === "age") {
      description = `${dogData[title.en]}살`;
    } else if (title.en === "weight") {
      description = `${dogData[title.en]}Kg`;
    } else if (title.en === "heart_worm") {
      description = dogData[title.en] ? "양성" : "음성";
    } else if (title.en === "neutering") {
      description = dogData[title.en] ? "완료" : "예정";
    } else if (title.en === "adoption_status") {
      switch(dogData[title.en]) {
        case "wait":
          description = "기다리는 중";
          break;
        case "completed":
          description = "완료";
          break;
        default:
          description = "준비 중";
      }
    }

    return {
      title: title.ko,
      description,
    };
  });
};

export default getDogDescriptions;
