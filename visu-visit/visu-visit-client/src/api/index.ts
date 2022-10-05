import { nanoid } from "nanoid";
import { IBrowserHistory } from "../types/history.d";
import { IHistoryApiResponse } from "../types/history";

export const postHistoryFile = async (file: File): Promise<IHistoryApiResponse> => {
  const formData = new FormData();

  formData.append("historyFile", file, file.name);

  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/browser-history/${nanoid()}`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const fetchHistory = async ({ id }: { id: string }): Promise<IHistoryApiResponse> => {
  const url = new URL(`${process.env.REACT_APP_SERVER_URL}/browser-history/${id}`);

  const response = await fetch(url.toString());

  return response.json();
};

export const deleteHistory = async ({ id }: { id: string }): Promise<IHistoryApiResponse> => {
  const url = new URL(`${process.env.REACT_APP_SERVER_URL}/browser-history/${id}`);

  const response = await fetch(url.toString(), { method: "DELETE" });

  return response.json();
};

export const saveHistory = async ({
  id,
  history,
}: {
  id: string;
  history: IBrowserHistory;
}): Promise<IHistoryApiResponse> => {
  const url = new URL(`${process.env.REACT_APP_SERVER_URL}/browser-history/${id}`);

  const response = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(history),
  });

  return response.json();
};
