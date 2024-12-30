export interface IUser {
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
