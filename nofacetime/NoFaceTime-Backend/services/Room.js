module.exports = class RoomService {
  constructor(userModel, roomModel) {
    this.userModel = userModel;
    this.roomModel = roomModel;
  }

  async findAll(userObjectId) {
    try {
      const userData = await this.userModel.findById(userObjectId).exec();
      const { rooms } = userData;

      return rooms;
    } catch (err) {
      console.error(err);
    }
  }

  async getRoom(roomLink) {
    try {
      const roomData = await this.roomModel.find({ link: roomLink }).exec();

      return roomData;
    } catch (err) {
      console.error(err);
    }
  }

  async createRoom(newRoomData) {
    try {
      return await this.roomModel.create(newRoomData);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteRoom(roomObjectId) {
    try {
      const result = await this.roomModel.deleteOne({ '_id': roomObjectId });

      return result;
    } catch (err) {
      console.error(err);
    }
  }
};
