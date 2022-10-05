const Chat = require('../models/Chat');
const geolib = require('geolib');
const aws = require('aws-sdk');

exports.getChatList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);

    res.send({ result: 'ok', data: chat.chat_list });
  } catch (err) {
    next();
  }
};

exports.getNearByChats = async (req, res, next) => {
  try {
    const { location } = req.body;
    const chats = await Chat.find();
    const nearByChats = chats.filter((chat) => {
      const myLocation = location;
      const chatLocation = {
        latitude: chat.latitude,
        longitude: chat.longitude
      };
      const distance = geolib.getDistance(myLocation, chatLocation);

      if (distance < 100) return chat;
    });

    res.send({ result: 'ok', data: nearByChats });
  } catch (err) {
    next();
  }
};

exports.addChat = async (req, res, next) => {
  try {
    const { title, location } = req.body;
    const chat = await new Chat({
      title,
      latitude: location.latitude,
      longitude: location.longitude
    }).save();

    res.send({ result: 'ok', data: chat });
  } catch (err) {
    next();
  }
};

exports.saveText = async (req, res, next) => {
  try {
    const { nickname, message } = req.body;
    const { chatId } = req.params;
    const date = new Date();

    await Chat.findOneAndUpdate(
      { _id: chatId },
      {
        $push: {
          chat_list: {
            nickname,
            message,
            image: '',
            create_at: date
          }
        }
      }
    );

    res.send({ result: 'ok', data: { nickname, message, date } });
  } catch (err) {
    next();
  }
};

exports.saveImage = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    const { chatId } = req.params;
    const { buffer } = req.files.photo[0];
    const time = new Date().getTime();
    const s3 = new aws.S3({
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: 'loca-chat',
      Key: `photos/${nickname}_${time}`,
      Body: buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: 'image/jpg'
    };

    const savePhoto = async (chatId, photoUrl) => {
      await Chat.findOneAndUpdate(
        { _id: chatId },
        {
          $push: {
            chat_list: {
              nickname: nickname,
              message: '',
              imageUrl: photoUrl,
              create_at: new Date()
            }
          }
        }
      );
    };

    s3.upload(params, (err, data) => {
      if (err) {
        throw new Error('s3 upload failed');
      } else {
        const photoUrl = data.Location;

        savePhoto(chatId, photoUrl);
        res.send({
          result: 'ok',
          data: { nickname, imageUrl: photoUrl, date: new Date() }
        });
      }
    });
  } catch (err) {
    next();
  }
};
