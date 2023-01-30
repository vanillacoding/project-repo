const makeSearched = (nodeData, searchKeyword) => {
  if (searchKeyword === '') {
    return new Set();
  }

  return new Set(
    Object.keys(nodeData).filter(nodeKey => {
      if (nodeData[nodeKey].title?.includes(searchKeyword)) {
        return true;
      }

      if (nodeData[nodeKey].content?.includes(searchKeyword)) {
        return true;
      }

      if (
        nodeData[nodeKey].comments.some(comment => {
          return (
            comment.author?.includes(searchKeyword) ||
            comment.content?.includes(searchKeyword)
          );
        })
      ) {
        return true;
      }

      if (
        nodeData[nodeKey].images.some(image =>
          image.originalName?.includes(searchKeyword),
        )
      ) {
        return true;
      }

      return false;
    }),
  );
};

export default makeSearched;
