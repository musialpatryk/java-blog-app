export interface IUser {
  id: number;
  login: string;
  name: string;
  surname: string;
  bio: string;
  token: string;
}

export interface INewUser {
  login: string;
  password: string;
}
