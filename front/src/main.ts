import { Board } from "./classes/Board";
import { Command } from "./classes/Command";
import { Config } from "./interfaces/Config";
import "./style.scss";

const config: Config = {
  multiplicationFactor: 5,
  samples: 250,
};

const board = new Board();
board.setConfig(config);
board.draw();

const command = new Command(config);
command.onUpdate((config) => {
  board.setConfig(config);
  board.draw();
});
