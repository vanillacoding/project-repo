export interface IUserData {
  data: {
    accessToken: string;
    user: {
      email: string;
      displayName: string;
      lastStage: number;
    };
  };
}

export interface IUserStatus {
  _id: string;
  email: string;
  lastStage: string;
}
