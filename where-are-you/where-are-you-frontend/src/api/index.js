const API_URL = process.env.REACT_APP_API_URL;

export const fetchPuzzles = async () => {
  const response = await fetch(`${API_URL}/game/puzzles`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
};

export const fetchPasswords = async () => {
  const response = await fetch(`${API_URL}/game/passwords`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
};

export const fetchReviews = async (pageNumber) => {
  const response = await fetch(`${API_URL}/review?page=${pageNumber}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
};

export const postReview = async (review) => {
  const response = await fetch(`${API_URL}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...review
    })
  });

  return response;
};
