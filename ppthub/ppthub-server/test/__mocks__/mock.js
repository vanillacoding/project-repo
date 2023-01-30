const savedMockData = {
  fileName: "MockPpt",
  pptData: {
    slideWidth: 1280,
    slideHeight: 720,
    slides: [
      {
        slide1: "Slide 1",
        items: [
          {
            type: "text",
            order: 1,
            itemId: "Text 0",
            width: 306.5244094488189,
            height: 38.77501312335958,
            x: 784.5517060367455,
            y: 332.13795275590553,
            content: {
              value: "변경이 하는 text item 2",
              isBold: true,
              isItalic: true,
              isUnderlined: false,
              fontColor: "#000000",
              backgroundColor: null,
              align: "right",
              size: 24,
            },
          },
          {
            type: "text",
            order: 3,
            itemId: "Text 1",
            width: 477.8479790026247,
            height: 38.77501312335958,
            x: 328.82761154855643,
            y: 195.3103412073491,
            content: {
              value: "변경이 일어나는 text item 1 (변경되는 버전)",
              isBold: true,
              isItalic: true,
              isUnderlined: false,
              fontColor: "#000000",
              backgroundColor: null,
              align: "left",
              size: 18,
            },
          },
        ],
      },
    ],
  },
};

const savedMockData2 = {
  fileName: "MockPpt2",
  pptData: {
    slideWidth: 1280,
    slideHeight: 720,
    slides: [
      {
        slide1: "Slide 2",
        items: [
          {
            type: "text",
            order: 1,
            itemId: "Text 0",
            width: 11.5244094488189,
            height: 31.77501312335958,
            x: 82.5517060367455,
            y: 12.13795275590553,
            content: {
              value: "변경이 일어나는 text item 3",
              isBold: true,
              isItalic: false,
              isUnderlined: true,
              fontColor: "#2b2b2b",
              backgroundColor: null,
              align: "left",
              size: 18,
            },
          },
          {
            type: "text",
            order: 3,
            itemId: "Text 5",
            width: 477.8479790026247,
            height: 38.77501312335958,
            x: 328.82761154855643,
            y: 195.3103412073491,
            content: {
              value: "변경이 일어나는 text item 1 (변경되는 버전)",
              isBold: true,
              isItalic: true,
              isUnderlined: false,
              fontColor: "#000000",
              backgroundColor: null,
              align: "left",
              size: 18,
            },
          },
        ],
      },
    ],
  },
};

const originalPptId = "635a7e23c2f144aa083a3f91";

const comparablePptId = "635a7e23c2f144aa083a3f97";

const slideOrderList = ["Slide 1", "Slide 2"];

const mergeData = {
  undefined: {
    items: {
      "Text 5": { diff: "added", isChecked: false },
      "Text 1": { diff: "deleted", isChecked: false },
      "Text 0": { diff: "modified", isChecked: false },
    },
    diff: "modified",
  },
};

const mergedPptId = "635a817dd1fb0f7943cba6a6";

const mergedPpt = {
  _id: "635a817dd1fb0f7943cba6a6",
  fileName: "MockPpt10/27/2222:02",
  slideWidth: 1280,
  slideHeight: 720,
  downloadUrl:
    "https://pptx-project-1.s3.ap-northeast-2.amazonaws.com/MockPpt10/27/2222%3A02.pptx",
  slideOrderList: ["Slide 1", "Slide 2"],
  slides: [],
  createdAt: "2022-10-27T13:02:53.057Z",
  __v: 0,
};

const failureId = "1234567891011";

const failureData = {
  undefined: {
    items: {
      "text 3": { diff: "deleted", isChecked: false },
    },
    diff: "modified",
  },
};

module.exports = {
  savedMockData,
  savedMockData2,
  slideOrderList,
  originalPptId,
  comparablePptId,
  mergeData,
  mergedPptId,
  mergedPpt,
  failureId,
  failureData,
};
