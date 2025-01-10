export interface IAuthor {
  id: number;
  login: string;
}

export interface IRawPost {
  id: number;
  author: IAuthor;
  title: string;
  content: string;
  active: boolean;
  rate: number;
}

export interface IPost extends IRawPost {
  isEditable: boolean;
}

export type IEditPost = Partial<Pick<IPost, 'id' | 'title' | 'content' | 'active'>>;

