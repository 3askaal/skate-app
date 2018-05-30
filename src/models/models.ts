export interface User {
  _id?: string;
  username?: string;
  email?: string;
}

export interface Player {
  player?: User;
  _id?: string;
  username?: string;
  letters?: number;
  defense?: boolean;
  lost?: boolean;
  current?: boolean;
  me?: boolean;
  active?: boolean;
}

export interface Turn {
  trick: any;
  player: string;
  fail?: Array<string>;
  good?: Array<string>;
}

export interface Game {
  players?: Array<Player>;
  word: string;
  turns?: Array<Turn>;
  status?: string;
  current?: string;
  ref?: string;
  gamemode?: string;
  difficulty?: number;
}

export interface Current {
  player: Player;
  trick: any;
}

interface Message {
  player?: Player;
  message?: string;
}
