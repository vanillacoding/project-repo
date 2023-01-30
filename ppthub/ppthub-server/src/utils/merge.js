const DIFF_TYPES = require("../config/diffTypes");

/*
getSlideItems 함수는 slide에서 merge할 아이템들만 선별해서 반환하는 함수입니다
original ppt이고 아이템의 diff Type이 modified이면서 isChecked가 false인 경우 혹은
diff Type이 deleted이면서 isChecked 가 true인 경우,
comparable ppt이고 아이템의 diff Type이 modified이면서 isChecked가 true인 경우 혹은
diff Type이 added이면서 isChecked 가 true인 경우의 아이템을 선별해 반환합니다.
*/

const getSlideItems = (slides, mergedData, pptType) => {
  const mergedItemsData = mergedData.items;
  const mergedItems = slides.items.filter((item) => {
    if (
      (pptType === "original" &&
        mergedItemsData[item.itemId].diff === DIFF_TYPES.MODIFIED &&
        !mergedItemsData[item.itemId].isChecked) ||
      (pptType === "original" &&
        mergedItemsData[item.itemId].diff === DIFF_TYPES.DELETED &&
        mergedItemsData[item.itemId].isChecked) ||
      (pptType === "original" &&
        mergedItemsData[item.itemId].diff === DIFF_TYPES.NONE) ||
      (pptType === "original" && !mergedItemsData[item.itemId])
    ) {
      return true;
    }

    if (
      (pptType === "comparison" &&
        mergedItemsData[item.itemId].diff === DIFF_TYPES.MODIFIED &&
        mergedItemsData[item.itemId].isChecked) ||
      (pptType === "comparison" &&
        mergedItemsData[item.itemId].diff === DIFF_TYPES.ADDED &&
        mergedItemsData[item.itemId].isChecked)
    ) {
      return true;
    }

    return false;
  });

  return mergedItems;
};

/*
getMergedModifiedSlides 함수는 diff type이 modified인 slide들을 병합해주는 함수입니다.
modifiedOriginalSlides와 modifiedComparableSlides에서 공통된 slide를 찾아 slide 아이템을 합치고
반환을 해줍니다.
*/

const getMergedModifiedSlides = (
  modifiedOriginalSlides,
  modifiedComparableSlides,
) => {
  return modifiedOriginalSlides.map((slide) => {
    const tempSlide = slide;
    const matchedSlide = modifiedComparableSlides.find(
      (comparableSlide) => slide.slideId === comparableSlide.slideId,
    );
    if (matchedSlide) {
      tempSlide.items = [...slide.items, ...matchedSlide.items];
      return tempSlide;
    }

    return slide;
  });
};

/*
getModifiedSlides 함수는 diff type이 modified인 slide들을 찾아서 반환을 해주는 함수입니다.
또한 DB에서 조회한 ppt의 형식이 변환되었기때문에 map을 이용하여 처음 parse된 형식으로 변환해줍니다.
*/

const getModifiedSlides = (slides, mergeData) => {
  return slides
    .filter(
      (slide) => mergeData[slide.data.slideId].diff === DIFF_TYPES.MODIFIED,
    )
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });
};

/*
getMergedPpt 함수는 두개의 ppt데이터와 merge요청 데이터를 통해 merge를 해 하나의 새로운 ppt로 만들어 반환해줍니다.
getModifiedSlides 함수를 이용해 슬라이드 내부 아이템이 변경이된  modifiedSlide들을 찾고
original ppt와 comparable ppt에서 merge를 해줄 슬라이드들을 addedSlides를 통해 얻습니다.
getSlideItems함수를 통해 modifiedSlide들 내부에서 merge해줄 아이템들을 찾습니다.
getMergedModifiedSlides함수를 통해 병합할 original과 comparable modifiedSlide들을 병합해줍니다.
이 후 추출된 slides들을 모아 새로운 ppt파일을 만들어 반환해줍니다.
*/

const getSortedSlides = (slides, slideOrderList) => {
  const slideListMap = new Map(
    slides.map(({ slideId, items }) => [slideId, items]),
  );
  return slideOrderList
    .filter((slideId) => slideListMap.has(slideId))
    .map((slideId) => ({ slideId, items: slideListMap.get(slideId) }));
};

const getMergedPpt = (
  originalPpt,
  comparablePpt,
  mergeData,
  slideOrderList,
) => {
  const modifiedOriginalSlides = getModifiedSlides(
    originalPpt.slides,
    mergeData,
  );
  const modifiedComparableSlides = getModifiedSlides(
    comparablePpt.slides,
    mergeData,
  );
  const addedSlides = [...originalPpt.slides, ...comparablePpt.slides]
    .filter(
      (slide) =>
        !mergeData[slide.data.slideId] ||
        mergeData[slide.data.slideId].diff === DIFF_TYPES.NONE ||
        mergeData[slide.data.slideId].isChecked,
    )
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });

  modifiedOriginalSlides.map((slide) => {
    const pptType = "original";
    const items = getSlideItems(slide, mergeData[slide.slideId], pptType);
    return Object.assign(slide, { items });
  });
  modifiedComparableSlides.map((slide) => {
    const pptType = "comparison";
    const items = getSlideItems(slide, mergeData[slide.slideId], pptType);
    return Object.assign(slide, { items });
  });

  const mergedModifiedSlides = getMergedModifiedSlides(
    modifiedOriginalSlides,
    modifiedComparableSlides,
  );

  const slides = getSortedSlides(
    [...mergedModifiedSlides, ...addedSlides],
    slideOrderList,
  );

  const createDate = new Intl.DateTimeFormat("en", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
  })
    .format(new Date())
    .replace(/,\s/gi, "");

  const mergedPpt = {
    fileName: `${originalPpt.fileName}${createDate}`,
    slideWidth: originalPpt.slideWidth,
    slideHeight: originalPpt.slideHeight,
    slides,
  };

  return mergedPpt;
};

module.exports = { getMergedPpt, getSortedSlides };
