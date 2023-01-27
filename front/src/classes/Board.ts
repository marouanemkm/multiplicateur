import { r, svgns } from "../constant";
import {
  drawLine,
  getAnglesFormIndex,
  getPointsFormAngles,
  querySelector,
} from "../misc";
import { Config } from "../interfaces/Config";
import { Point } from "../interfaces/Point";

export class Board {
  config: Config = { multiplicationFactor: 3, samples: 100 };

  clean() {
    querySelector("g.samples").innerHTML = "";
    querySelector("g.lines").innerHTML = "";
  }

  draw() {
    this.clean();
    const container = document.querySelector("g.samples");

    if (container === null) {
      throw new Error("Cannot find.");
    }

    for (let i = 0; i < this.config.samples; i++) {
      const angle = getAnglesFormIndex(i, this.config.samples);
      const { x: cx, y: cy } = getPointsFormAngles(angle);
      const circle = document.createElementNS(svgns, "circle");
      circle.setAttributeNS(null, "cx", cx + "");
      circle.setAttributeNS(null, "cy", cy + "");
      circle.setAttributeNS(null, "r", r + "");
      container && container.appendChild(circle);
    }

    for (let i = 0; i < this.config.samples; i++) {
      const j = i * this.config.multiplicationFactor;
      const p1: Point = getPointsFormAngles(
        getAnglesFormIndex(i, this.config.samples)
      );
      const p2: Point = getPointsFormAngles(
        getAnglesFormIndex(j, this.config.samples)
      );
      drawLine(p1, p2);
    }
  }

  setConfig(config: Config) {
    this.config = config;
  }
}
