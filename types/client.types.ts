export enum OWNER {
  ME = "ME",
  BOT = "BOT",
}

export type TMessage = {
  text: string;
  owner: OWNER;
};

export type TResponseAPI = {
  message: string;
};
