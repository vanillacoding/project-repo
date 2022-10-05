import axios from "../api/axiosInstance";

const useMock = false;

const numbers = 16;

const mockUser = {
  profileUrl: "https://lh3.googleusercontent.com/a/AATXAJyVWL-UkAOLeLY75qUbVwQWvUt1RDWk60KkzICi=s96-c0",
  name: "user mock",
  scores: {
    activity: 0,
    meal: 4.25,
    sleep: 0,
    사진첩: 1.8333333333333333,
    grid: 3,
  },
  lastAccessDate: "2021-09-12",
};

const mockUsers = [...Array(numbers)].map((_, i) => {
  return { ...mockUser, _id: `id${i}`, stroke: i };
});

function joinUrl(...args) {
  return args.join("/");
}

async function getFriends(creatorId) {
  if (useMock) {
    return {
      friends: mockUsers,
      receivedRequests: mockUsers,
      sentRequests: mockUsers,
    };
  }

  const res = await axios.get(joinUrl(creatorId, "friend"));

  if (res) {
    return res.data;
  }
}

async function updateFriendRequest(creatorId, friendId, isAccepted) {
  if (useMock) {
    return { result: "ok" };
  }

  const res = await axios.patch(joinUrl(creatorId, "friend"), { friendId, isAccepted });

  if (res) {
    return res;
  }
}

async function getById(creatorId, friendId) {
  const res = await axios.get(joinUrl(creatorId, "friend", friendId));

  if (res) {
    return res;
  }
}

async function deleteById(creatorId, friendId) {
  const res = await axios.delete(joinUrl(creatorId, "friend", friendId));

  if (res) {
    return res;
  }
}

async function sendById(creatorId, friendId) {
  const res = await axios.post(joinUrl(creatorId, "friend/new"), { friendId });

  if (res) {
    return res;
  }
}

export {
  getFriends, updateFriendRequest, getById, sendById, deleteById,
};
