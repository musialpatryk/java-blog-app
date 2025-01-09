export interface IAuthor {
  id: number;
  login: string;
}

export interface IRawPostComment {
  id: number;
  author: IAuthor;
  content: string;
  active: boolean;
}

export interface IPostComment extends IRawPostComment {
  isEditable: boolean;
}
