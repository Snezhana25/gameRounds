import { IGameStatus, ISettings } from "../models/game.model";

export const SETTINGS: ISettings = {
  speed: 1000,
  size: 10,
  score: 10,
  gameRounds: 20,
};

export const INITIAL_GAME_STATUS = (): IGameStatus => ({
  gameField: [],
  humanScore: 0,
  computerScore: 0,
  activeFieldIndex: null,
  running: false,
  winner: null,
});