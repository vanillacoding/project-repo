export const validatePostInfo = (postInfo) => {
  const  {
    postType,
    category,
    postTitle,
    anonymousType,
    worryContents
  } = postInfo;

  if (
    !postType ||
    !category ||
    !postTitle ||
    !anonymousType ||
    !worryContents
  ) {
    return "누락된 정보가 있습니다";
  }
};
