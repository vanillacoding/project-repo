const DIFF_TYPES = require("../config/diffTypes");

const getMatchingIds = (originIdSet, compareIdSet) => {
  const { matchedIds, deletedIds } = Array.from(originIdSet).reduce(
    (acc, originId) => {
      if (compareIdSet.has(originId)) {
        compareIdSet.delete(originId);
        return Object.assign(acc, {
          matchedIds: acc.matchedIds.concat(originId),
        });
      }

      return Object.assign(acc, {
        deletedIds: acc.deletedIds.concat(originId),
      });
    },
    {
      matchedIds: [],
      deletedIds: [],
    },
  );

  return {
    matchedIds,
    deletedIds,
    addedIds: Array.from(compareIdSet),
  };
};

const checkItemModified = (originItem, compareItem) => {
  const checkAttributes = ["x", "y", "width", "height"];
  const isSameWith = (attribute) =>
    originItem[attribute] === compareItem[attribute];

  for (const attribute of checkAttributes) {
    if (!isSameWith(attribute)) {
      return true;
    }
  }

  if (originItem.type === "text") {
    const isContentSameWith = (attribute) =>
      originItem.content[attribute] === compareItem.content[attribute];
    const checkTextAttributes = [
      "value",
      "isBold",
      "isItalic",
      "isUnderlined",
      "fontColor",
      "size",
      "backgroundColor",
    ];

    for (const attribute of checkTextAttributes) {
      if (!isContentSameWith(attribute)) {
        return true;
      }
    }
  }

  return false;
};

const getSlideDiff = (originSlideItems, compareSlideItems) => {
  const originItemsMap = new Map(
    originSlideItems.map((item) => [item.itemId, item]),
  );
  const compareItemsMap = new Map(
    compareSlideItems.map((item) => [item.itemId, item]),
  );
  const {
    matchedIds: matchedItems,
    deletedIds: deletedItems,
    addedIds: addedItems,
  } = getMatchingIds(
    new Set(originItemsMap.keys()),
    new Set(compareItemsMap.keys()),
  );
  const slideDiffData = {
    items: {},
  };
  let diff =
    addedItems.length || deletedItems.length
      ? DIFF_TYPES.MODIFIED
      : DIFF_TYPES.NONE;

  addedItems.forEach((item) => {
    Object.defineProperty(slideDiffData.items, item, {
      enumerable: true,
      value: {
        diff: DIFF_TYPES.ADDED,
        isChecked: false,
      },
    });
  });
  deletedItems.forEach((item) => {
    Object.defineProperty(slideDiffData.items, item, {
      enumerable: true,
      value: {
        diff: DIFF_TYPES.DELETED,
        isChecked: false,
      },
    });
  });
  matchedItems.forEach((item) => {
    const originItem = originItemsMap.get(item);
    const compareItem = compareItemsMap.get(item);
    const isModified = checkItemModified(originItem, compareItem);

    if (isModified && diff === DIFF_TYPES.NONE) {
      diff = DIFF_TYPES.MODIFIED;
    }

    Object.defineProperty(slideDiffData.items, item, {
      enumerable: true,
      value: {
        diff: isModified ? DIFF_TYPES.MODIFIED : DIFF_TYPES.NONE,
        ...(isModified ? { isChecked: false } : {}),
      },
    });
  });

  Object.defineProperty(slideDiffData, "diff", {
    enumerable: true,
    value: diff,
  });

  return slideDiffData;
};

const pptDataDiffer = (originPpt, comparePpt) => {
  const originPptMap = new Map(
    originPpt.slides.map(({ data: { slideId, items } }) => [slideId, items]),
  );
  const comparePptMap = new Map(
    comparePpt.slides.map(({ data: { slideId, items } }) => [slideId, items]),
  );
  const {
    matchedIds: matchedSlides,
    deletedIds: deletedSlides,
    addedIds: addedSlides,
  } = getMatchingIds(
    new Set(originPptMap.keys()),
    new Set(comparePptMap.keys()),
  );
  const diffData = {};

  deletedSlides.forEach((slide) => {
    Object.defineProperty(diffData, slide, {
      enumerable: true,
      value: {
        diff: DIFF_TYPES.DELETED,
        isChecked: false,
      },
    });
  });
  addedSlides.forEach((slide) => {
    Object.defineProperty(diffData, slide, {
      enumerable: true,
      value: {
        diff: DIFF_TYPES.ADDED,
        isChecked: false,
      },
    });
  });
  matchedSlides.forEach((slide) => {
    const originSlideItems = originPptMap.get(slide);
    const compareSlideItems = comparePptMap.get(slide);
    const value = getSlideDiff(originSlideItems, compareSlideItems);
    Object.defineProperty(diffData, slide, { enumerable: true, value });
  });

  return diffData;
};

module.exports = pptDataDiffer;
