import { cx0, cy0, r0, svgns } from "./constant";
import { Point } from "./interfaces/Point";

export const getAnglesFormIndex = (
  index: number,
  sampleNbr: number
): number => {
  return (index * 2 * Math.PI) / sampleNbr;
};

export const getPointsFormAngles = (angle: number) => {
  return {
    x: cx0 + r0 * Math.cos(angle),
    y: cy0 + r0 * Math.sin(angle),
  };
};

const container = document.querySelector("g.lines");

export const drawLine = (p1: Point, p2: Point) => {
  const line = document.createElementNS(svgns, "line");
  line.setAttributeNS(null, "x1", p1.x + "");
  line.setAttributeNS(null, "y1", p1.y + "");
  line.setAttributeNS(null, "x2", p2.x + "");
  line.setAttributeNS(null, "y2", p2.y + "");
  container && container.appendChild(line);
};

export const querySelector = <T extends HTMLElement>(
  cssSelector: string,
  type?: new () => T
) => {
  const elm = document.querySelector(cssSelector);
  if (elm === null) throw new Error("Cannot find element with selector");
  if (type && !(elm instanceof type))
    throw new Error(`Element found is not with the type : ${type}`);
  return elm as T;
};

export const objectKeys = <T extends object>(object: T): (keyof T)[] => {
  return Object.keys(object) as (keyof T)[];
};

export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
