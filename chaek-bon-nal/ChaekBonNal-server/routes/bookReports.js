const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const BookReport = require('../models/bookReport');
const { authorization } = require('../middlewares/authorization');

router.get('/:report_id', async (req, res) => {
    const { report_id } = req.params;

    try {
        const bookReport = await BookReport.findById(report_id);
        const author = await User.findById(bookReport.author);
        const comments = await Comment.find({ '_id': { $in: bookReport.comments } }).populate('author');

        res.status(200).json({
            bookReport,
            comments,
            author
        });
    } catch (error) {
        res.status(400).json({ success: false })
    }
});

router.put('/:report_id/users/:user_id/bookmark', authorization, async (req, res) => {
    const { email } = res.locals;
    const { report_id } = req.params;
    const { isBookmarked } = req.body;

    try {
        if (isBookmarked) {
            await User.findOneAndUpdate(
                { email },
                { $addToSet: { bookmarks: report_id } }
            );

            res.status(200).json({ isBookmarked: true });
        } else {
            await User.findOneAndUpdate(
                { email },
                { $pull: { bookmarks: report_id } },
            )

            res.status(200).json({ isBookmarked: false });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }

})

router.post('/:report_id/users/:user_id/comment', authorization, async (req, res) => {
    const { report_id } = req.params;
    const { email } = res.locals;
    const { comment } = req.body.data;

    const author = await User.findOne({ email }, '_id');

    const comments = await Comment.create({
        text: comment,
        author: author._id,
        date: Date()
    });

    const bookReport = await BookReport.findByIdAndUpdate(
        report_id,
        { $push: { comments } },
        { new: true }
    );

    const bookReportComments = await Comment.find(
        { '_id': { $in: bookReport.comments } }
    ).populate('author');

   res.status(200).json({ comments: bookReportComments });
});

router.delete('/:report_id/users/:user_id/comment', authorization, async (req, res) => {
    const { report_id } = req.params;
    const { commentId } = req.body;

    await Comment.findByIdAndDelete(commentId);

    const bookReport = await BookReport.findByIdAndUpdate(
        report_id,
        { $pull: { comments: commentId } },
        { new: true }
    );

    const comments = await Comment.find(
        { '_id': { $in: bookReport.comments } }
    ).populate('author');


    res.status(200).json({ comments })
});

module.exports = router;
