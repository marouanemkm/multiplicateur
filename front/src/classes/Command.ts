import { url } from "../constant";
import { Config } from "../interfaces/Config";
import { objectKeys, querySelector, sleep } from "../misc";

export class Command {
  callback: (config: Config) => void = () => {};
  _isPlaying = false;

  get isPlaying() {
    return this._isPlaying;
  }

  set isPlaying(value: boolean) {
    this._isPlaying = value;
    this.render();
    if (this.isPlaying) this.playAsync();
  }

  constructor(public config: Config) {
    this.render();
    this.setUpActions();
  }

  onUpdate(callback: (config: Config) => void) {
    this.callback = callback;
  }

  increaseMF() {
    this.config.multiplicationFactor += 0.008;
    this.config.multiplicationFactor %= 100;
    this.config.multiplicationFactor =
      +this.config.multiplicationFactor.toFixed(2);

    this.config.samples += 0.01;
    this.config.samples %= 100;
    this.config.samples = +this.config.samples.toFixed(2);
  }

  async playAsync() {
    while (this.isPlaying) {
      await sleep(16);
      this.increaseMF();
      this.render();
      this.callback(this.config);
    }
  }

  render() {
    const props = objectKeys(this.config);
    for (const prop of props) {
      const elm = querySelector(`div.command label.${prop} span span`);
      elm.innerHTML = this.config[prop].toString();
      const sliderElm = querySelector(
        `div.command label.${prop} input`,
        HTMLInputElement
      );
      sliderElm.value = this.config[prop].toString();
    }
    const btn = querySelector("div.command button.play");
    btn.innerHTML = this.isPlaying ? "Stop" : "Play";
  }

  setUpActions() {
    const props = objectKeys(this.config);
    for (const prop of props) {
      const sliderElm = querySelector(
        `div.command label.${prop} input`,
        HTMLInputElement
      );
      sliderElm.addEventListener("input", () => {
        this.config[prop] = +sliderElm.value;
        this.render();
        this.callback(this.config);
      });
    }
    const btn = querySelector("div.command button.play");
    btn.addEventListener("click", () => {
      this.isPlaying = !this.isPlaying;
      this.render();
      if (this.isPlaying) this.playAsync();
    });

    const configBtn = querySelector("div.command button.getConfig");
    configBtn.addEventListener("click", () => {
      (async () => {
        try {
          const response = await fetch(url);
          this.config = await response.json();
          this.render();
          this.callback(this.config);
        } catch (err) {
          window.alert("Technical error 🦺");
          console.error("error", err);
        }
      })();
    });
  }
}
