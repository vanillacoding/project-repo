import {
  INITIALIZE_TEAM,
  WORK_ON_SUCCESS,
  WORK_OFF_SUCCESS,
  UPDATE_ACTIVE_USERS,
  UPDATE_THREADS,
  UPDATE_RECORDS,
  UPDATE_THREAD_LIKES,
  UPDATE_THREAD_COMMENT,
} from "../constants";
import moment from "moment";

export const initialState = {
  id: "",
  displayName: "",
  location: {},
  partById: {},
  allpartIds: [],
  allThreadIds: [],
  threadById: {},
  recordById: {},
  allRecordIds: [],
  onWorkingUser: [],
  offWorkingUser: [],
  connectedUser: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_TEAM:
      const {
        _id: id,
        threads,
        location,
        participants,
        records,
        display_name: displayName,
        thumbnail,
        admins,
      } = action.payload;
      const allpartIds = participants.map((part) => part._id);
      const partById = participants.reduce((acc, part) => {
        const { _id: id, username, email, profile } = part;
        const isAdmin = !!admins.filter((adminId) => adminId === id).length;
        acc[id] = { id, username, email, isAdmin, profile };
        return acc;
      }, {});
      const allThreadIds = threads.map((thread) => thread._id);
      const threadById = threads.reduce((acc, thread) => {
        const {
          _id: id,
          likes,
          created_by: createdBy,
          text,
          comments,
          created_at: createdAt,
        } = thread;
        acc[id] = { id, likes, createdBy, text, comments, createdAt };

        return acc;
      }, {});
      const recordById = records.reduce((acc, record) => {
        acc[record._id] = record;
        return acc;
      }, {});
      const allRecordIds = records.map((record) => record._id);
      const onWorkingUser = [];
      const offWorkingUser = [];

      records
        .filter((record) => {
          const today = moment().format("YYYY-MM-DD");
          return moment(record.work_on).isAfter(today);
        })
        .forEach((record) => {
          if (record.work_off) {
            offWorkingUser.push(record.recorded_by);
          } else {
            onWorkingUser.push(record.recorded_by);
          }
        });

      return {
        ...state,
        id,
        displayName,
        location,
        allpartIds,
        partById,
        allThreadIds,
        threadById,
        recordById,
        allRecordIds,
        onWorkingUser,
        offWorkingUser,
        thumbnail,
      };

    case WORK_ON_SUCCESS: {
      return {
        ...state,
        onWorkingUser: [...state.onWorkingUser, action.payload],
      };
    }

    case WORK_OFF_SUCCESS: {
      const userId = action.payload;
      const onWorkingUser = state.onWorkingUser.slice();
      const userIdIndex = onWorkingUser.indexOf(userId);

      onWorkingUser.splice(userIdIndex, 1);
      return {
        ...state,
        onWorkingUser,
        offWorkingUser: [...state.offWorkingUser, userId],
      };
    }

    case UPDATE_ACTIVE_USERS:
      return {
        ...state,
        connectedUser: [...new Set(action.payload)],
      };

    case UPDATE_THREADS: {
      const threads = action.payload;
      const allThreadIds = threads.map((thread) => thread._id);
      const threadById = threads.reduce((acc, thread) => {
        const {
          _id: id,
          likes,
          created_by: createdBy,
          text,
          comments,
          created_at: createdAt,
        } = thread;
        acc[id] = { id, likes, createdBy, text, comments, createdAt };

        return acc;
      }, {});

      return {
        ...state,
        allThreadIds,
        threadById,
      };
    }

    case UPDATE_RECORDS: {
      const records = action.payload;
      const recordById = records.reduce((acc, record) => {
        acc[record._id] = record;
        return acc;
      }, {});
      const allRecordIds = records.map((record) => record._id);

      return {
        ...state,
        recordById,
        allRecordIds,
      };
    }

    case UPDATE_THREAD_LIKES: {
      const { id, likes } = action.payload;
      return {
        ...state,
        threadById: {
          ...state.threadById,
          [id]: {
            ...state.threadById[id],
            likes,
          },
        },
      };
    }

    case UPDATE_THREAD_COMMENT: {
      const { id, comments } = action.payload;
      return {
        ...state,
        threadById: {
          ...state.threadById,
          [id]: {
            ...state.threadById[id],
            comments,
          },
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
}
