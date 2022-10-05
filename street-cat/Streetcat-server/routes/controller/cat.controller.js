const AWS = require('aws-sdk');
const createError = require('http-errors');
const Cat = require('../../models/Cat');
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const { savePhoto } = require('../../lib/savePhoto');

const s3 = new AWS.S3({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

exports.registerCat = async (req, res, next) => {
  const { 
    accessibility, 
    description,
    friendliness, 
    id, 
    latitude, 
    longitude, 
    name, 
    time 
  } = req.body;
  const type ='jpg';
  const buffer = req.files.image.data;
  
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `photos/${name}-${time}`,
    Body: buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  const cat = {
    accessibility,
    description,
    founder: id,
    friendliness,
    name,
    time,
    location : [latitude, longitude]
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      next(createError(500));
    }
    
    const image = data.Location;
    cat.image = image;
    const catAndUser = await savePhoto(cat);
    const [newCat, user] = catAndUser;
    
    res.json({ 
      result: 'ok', 
      user: {
        facebookId: user.facebookId,
        name: user.name,
        cats: user.cats,
        mongoId: user.id,
      },
      cat: newCat,
    });
  });
};

exports.getHandler = async (req, res, next) => {
  const cats = await Cat.find({});
  res.json({ result: 'ok', cats });
};

exports.increaseLike = async (req, res, next) => {
  try {
    const { id, catId } = req.body;
    const cat = await Cat.findById({ _id: catId });
    const didUserLike = cat.likes.some((objId) => objId.toString() === id);
    if (didUserLike) return res.json({ result: 'already done' });
    cat.likes.push(id);
    await cat.save();
    res.json({ result: 'ok', cat });
  } catch (error) {
    next(createError(500));
  }
};

exports.updateCatdata = async (req, res, next) => {
  try {
    const { cat_id } = req.params;
    const cat = await Cat.findByIdAndUpdate(
      { _id:cat_id }, 
      req.body, 
      { new: true },
    );

    res.json({ 
      result: 'ok', 
      cat,
    });
  } catch (error) {
    next(createError(500));
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const { _id, founder } = req.body;
    const cat = await Cat.findByIdAndDelete({ _id });

    s3.deleteObject(
      {
        Bucket: process.env.BUCKET_NAME,
        Key: `photos/${cat.name}-${cat.time}`,
      }, 
      (err, data) => {
        if (err) console.log(err);
        else console.log(data);
    });
  
    const user = await User.findById({ _id: founder });
    const newCat = user.cats.filter((cat) => cat.toString() !== _id);
    await User.findByIdAndUpdate(
      { _id: founder }, 
      { cats: newCat }, 
      { new: true }
    );
    res.json({ result: 'ok', cats: newCat, cat });
  } catch (error) {
    next(createError(500));
  }
};

exports.findComments = async (req, res, next) => {
  try {
    const { cat_id } = req.params;
    const { comments } = await Cat.findById({ _id: cat_id }).populate('comments');
    res.json({ result: 'ok', comments });
  } catch (error) {
    next(createError(500));
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { content, writerId, writerName, id } = req.body;
    const comment = await new Comment({ content, writerId, writerName }).save();
    const cat = await Cat.findById(id);
    cat.comments.push(comment._id);
    await cat.save();
    res.json({ result: 'ok', comment });
  } catch (error) {
    next(createError(500));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { catId, commentId } = req.body;
    const cat = await Cat.findById({ _id: catId});
    const newComments = cat.comments.filter(
      (objId) => objId.toString() !== commentId
    );

    const kitty = await Cat.findByIdAndUpdate(
      { _id: catId}, 
      { comments: newComments}, 
      { new: true},
    );
  
    await Comment.findByIdAndDelete({ _id: commentId});
    res.json({ result: 'ok', kitty, comment: commentId });
  } catch (error) {
    next(createError(500));
  }
};
