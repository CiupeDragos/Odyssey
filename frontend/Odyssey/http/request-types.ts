export type RegisterRequest = {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};
