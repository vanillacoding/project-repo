import jwt from 'jsonwebtoken';
import moment from 'moment';
import Team from '../model/team';
import User from '../model/user';
import Record from '../model/record';
import Thread from '../model/thread';
import { sendMail, checkIsExist } from '../lib/utils';
import { CustomError } from '../lib/error';

export const postNewTeam = async (req, res, next) => {
  try {
    const {
      teamName,
      createdBy,
      latitude,
      longitude,
      workOnTime,
      workOffTime
    } = req.body;
    const name = teamName.split(' ').join('-');
    const user = await User.findById(createdBy);
    const thumbnail = req.file ? req.file.location : '';
    const newTeam = await Team.create({
      name,
      display_name: teamName,
      created_by: user.id,
      location: { latitude, longitude },
      work_on_time: workOnTime,
      work_off_time: workOffTime,
      admins: [user.id],
      participants: [user.id],
      thumbnail
    });

    user.teams.push(newTeam.id);
    await user.save();
    res.json({ result: newTeam });
  } catch (error) {
    next(error);
  }
};

export const postJoinTeam = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { userId } = req.body;
    const team = await Team.findOne({ name })
      .populate('participants')
      .populate('records')
      .populate({
        path: 'threads',
        populate: { path: 'created_by' }
      });

    const participants = team.participants.map(part => part.id);

    if (checkIsExist(participants, userId)) {
      if (checkIsExist(team.admins, userId)) {
        return res.json({ result: 'ok', isAdmin: true, team });
      }
      return res.json({ result: 'ok', isAdmin: false, team });
    }
    throw new CustomError(403, 'UnInvited User');
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    const teamUserIds = deletedTeam.participants;

    for (let i = 0; i < teamUserIds.length; i++) {
      const user = await User.findById(teamUserIds[i]);
      const targetTeamIndex = user.teams.indexOf(teamId);

      user.teams.splice(targetTeamIndex, 1);
      await user.save();
    }

    res.json({ result: deletedTeam });
  } catch (error) {
    next(error);
  }
};

export const postInviteMember = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { memberEmail } = req.body;
    const team = await Team.findById(teamId);
    const payload = { teamId, email: memberEmail };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const result = await sendMail(memberEmail, team.display_name, token);

    res.json({ result });
  } catch (error) {
    next(error);
  }
};

export const postVerifyMember = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { teamId, email } = jwt.decode(token);
    const team = await Team.findById(teamId);
    const user = await User.findOne({ email });
    const teams = user.teams.map(id => id.toString());
    const participants = team.participants.map(id => id.toString());
    const newTeams = [...new Set([...teams, teamId])];
    const newParticipants = [...new Set([...participants, user.id])];

    user.teams = newTeams;
    team.participants = newParticipants;

    await user.save();
    await team.save();

    res.json({ result: 'ok' });
  } catch (error) {
    next(error);
  }
};

export const postOnWork = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;
    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    const notDoneRecord = await Record.findOne({
      team: teamId,
      recorded_by: userId,
      work_off: { $exists: false }
    });

    if (notDoneRecord) {
      throw new CustomError(400, 'Working does not finished');
    }

    const workOnTime = `${moment().format('YYYY-MM-DD')}T${team.work_on_time}`;
    const isLate = moment().isAfter(workOnTime);
    const diffMin = moment().diff(moment(workOnTime), 'minute');
    const overTime = diffMin > 60 ? `${Math.floor(diffMin / 60)}시간` : `${diffMin}분`;
    const message = `${user.username}이(가) ${
      isLate ? `${overTime} 초과해서 ` : ''
    }출근했습니다.`;
    const record = await Record.create({
      team: teamId,
      recorded_by: userId,
      is_late: isLate
    });
    const thread = await Thread.create({
      text: message,
      created_by: userId
    });

    team.records.push(record.id);
    team.threads.push(thread.id);

    await team.save();

    res.json({ result: 'ok' });
  } catch (error) {
    next(error);
  }
};

export const postOffWork = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;
    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    const record = await Record.findOneAndUpdate(
      { recorded_by: userId, team: teamId, work_off: { $exists: false } },
      { work_off: moment() },
      { returnNewDocument: true }
    );

    if (!record) {
      throw new CustomError(400, 'Can\'t find on working record');
    }

    const workOffTime = `${moment().format('YYYY-MM-DD')}T${
      team.work_off_time
    }`;
    const isOver = moment().isAfter(workOffTime);

    const diffMin = Math.abs(moment().diff(moment(workOffTime), 'minute'));
    const overTime = diffMin > 60 ? `${Math.floor(diffMin / 60)}시간` : `${diffMin}분`;
    const message = `${user.username}이(가) ${overTime} ${
      isOver ? '초과해서' : '일찍'
    } 퇴근했습니다.`;

    const thread = await Thread.create({
      created_by: userId,
      text: message
    });

    team.threads.push(thread.id);
    await team.save();
    res.json({ result: 'ok' });
  } catch (error) {
    next(error);
  }
};

export const postVerifyAdmin = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;
    const team = await Team.findById(teamId);

    if (checkIsExist(team.admins, userId)) {
      res.json({ result: 'ok' });
    } else {
      throw new CustomError(403, 'Can\'t access it');
    }
  } catch (error) {
    next(error);
  }
};

export const putAdmins = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { admins } = req.body;
    const team = await Team.findByIdAndUpdate(
      teamId,
      { admins },
      { new: true }
    ).populate('participants');

    res.json({ result: team });
  } catch (error) {
    next(error);
  }
};
