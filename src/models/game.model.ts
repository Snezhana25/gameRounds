export type TypeState = 'default' | 'active' | 'hit' | 'miss';

export interface IgameField {
  index: number;
  state: TypeState;
}

export type TypeWinner = 'human' | 'computer' | null;

export interface ISettings {
  speed: number;
  size: number;
  score: number;
  gameRounds: number;
}

export interface IGameStatus{
  gameField: IgameField[];
  humanScore: number;
  computerScore: number;
  activeFieldIndex: number | null;
  running: boolean;
  winner: TypeWinner;
}

export const initialGameStatus = (): IGameStatus => ({
  gameField: [],
  humanScore: 0,
  computerScore: 0,
  activeFieldIndex: null,
  running: false,
  winner: null,
});