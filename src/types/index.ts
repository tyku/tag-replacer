export type TUserResult = {
  mention: string;
  userName: string;
  lastName: string;
  email: string;
  userValue?: string;
};

export type TTagResult = {
  mention: string;
  tag: string;
};

export type TResultMentionsData = {
  user?: TUserResult[];
  tag?: TTagResult[];
};

export type TMention = {
  id: number;
  mention: string;
  userValue?: string;
};
