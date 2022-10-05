const Document = require("../model/Document");
const User = require("../model/User");

module.exports.saveDocument = async (req, res, next) => {
  const {
    body: {
      title,
      contents,
      user
    }
  } = req;

  try {
    const currentUser = await User.findOne({ email: user });
    const newDocument = await Document.create({
      title,
      contents,
      owner: currentUser._id
    });

    currentUser.documents.push(newDocument._id);
    await currentUser.save();

    return res.status(200).json({
      message: "저장에 성공했습니다"
    });
  } catch (err) {
    return res.status(500).json({
      message: "저장에 실패했습니다"
    });
  }
};

module.exports.getDocuments = async (req, res, next) => {
  const { userId } = req.params;

  try {
    User.findOne({ email: userId })
      .populate("documents")
      .exec((err, user) => {
        if (err) {
          console.error(err.message);

          return res.status(500).json({
            documents: null,
            message: "불러오기에 실패했습니다."
          });
        }

        res.status(200).json({
          documents: user.documents,
          message: "불러오기에 성공했습니다."
        });
      });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "불러오기에 실패했습니다."
    });
  }
};

module.exports.deleteDocument = async (req, res, next) => {
  const { documentId } = req.params;

  try {
    Document.findById({ _id: documentId })
      .populate("owner")
      .exec(async (err, document) => {
        if (err) {
          return res.status(500).json({
            message: "삭제에 실패했습니다."
          });
        }
        
        const { documents, _id } = document.owner;
        const filteredDocuments = documents.filter((document) =>
          String(document) !== documentId
        );

        await User.findByIdAndUpdate(_id, { $set: { documents: filteredDocuments }});
      });

      await Document.deleteOne({ _id: documentId });

      res.status(200).json({
        message: "삭제에 성공했습니다."
      });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "삭제에 실패했습니다."
    });
  }
};
