export const createGameClearUserRecord = async ({ id, username, score }) => {
  const response = await fetch(
    `${process.env.SERVER_PORT}/api/result/${id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, score }),
    }
  );

  return await response.json(); 
};

export const readGameRecords = async () => {
  const response = await fetch(
    `${process.env.SERVER_PORT}/api/result`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json(); 
};
