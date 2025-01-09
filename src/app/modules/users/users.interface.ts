export interface IUser {
  id: number;
  login: string;
  name: string;
  surname: string;
  bio: string;
  accessToken: string;
  refreshToken: string;
}

export interface INewUser {
  login: string;
  password: string;
}

export type IEditUser = Pick<IUser, 'name' | 'surname' | 'bio'>;
