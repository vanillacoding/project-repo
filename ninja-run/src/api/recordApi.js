export async function getTop10Records() {
  const top10Records = await fetch(`${process.env.SERVER_URL}/record`, {
    method: "GET",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
  });

  return await top10Records.json();
}

export async function postRecord(name, score) {
  const record = {
    name,
    score,
  };

  await fetch(`${process.env.SERVER_URL}/record`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(record),
  });
}
