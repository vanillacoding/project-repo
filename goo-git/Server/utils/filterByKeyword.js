function filterByKeyword(branchesWithNote, keyword) {
  const textContentsByBranchId = {};

  branchesWithNote.map(branch => {
    textContentsByBranchId[branch.branch._id] = [];

    branch.latestNote.blocks.forEach(block => {
      if (!block.children[0].text) return;

      textContentsByBranchId[branch.branch._id]
        .push(block.children[0].text);
    });
  });

  const searchedBrancheId = {};
  const regex = new RegExp(`${keyword}`, 'i');

  for (const key in textContentsByBranchId) {
    textContentsByBranchId[key].forEach(cur => {
      if (!regex.exec(cur)) return;

      searchedBrancheId[key] = true;
    });
  }

  const searchedBranches
    = branchesWithNote.filter(branch => (
      searchedBrancheId[branch.branch._id]
    ));

  return searchedBranches;
}

module.exports = filterByKeyword;
