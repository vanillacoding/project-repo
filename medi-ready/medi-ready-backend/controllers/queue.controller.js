const createError = require("http-errors");
const { MESSAGE } = require("../constants");

const queueService = require("../services/queue.service");
const userService = require("../services/user.service");

exports.registerQueue = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { userId } = req.body;

    if (!userId) {
      throw createError(401, MESSAGE.INVALID_ACCESS);
    }

    const pharmacistId = await userService.findPharmacistId(userId);

    const [queue] = await queueService.createQueue(pharmacistId);
    const queueId = queue.queue_id;

    const patientId = await userService.findPatientId(userInfo.user_id);

    await queueService.updateQueue(patientId, queueId);

    res.status(200).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getQueue = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;

    const queue = await queueService.findQueue(user_id);
    const queueId = queue["queue.queue_id"];

    const people = await queueService.getQueueList(queueId);

    res.status(200).json({ result: "success", people });
  } catch (error) {
    next(error);
  }
};
