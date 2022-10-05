import Thread from '../model/thread';

export const postLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const tread = await Thread.findById(id);
    const userIdIndex = tread.likes.indexOf(userId);

    if (userIdIndex === -1) {
      tread.likes.push(userId);
    } else {
      tread.likes.splice(userIdIndex, 1);
    }

    await tread.save();
    res.json({ result: tread });
  } catch (error) {
    next(error);
  }
};

export const postComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, userId } = req.body;
    const tread = await Thread.findById(id);
    const comment = { author: userId, text };

    tread.comments.push(comment);
    await tread.save();
    res.json({ result: tread });
  } catch (err) {
    next(err);
  }
};
