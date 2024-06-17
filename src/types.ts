import Color from "colorjs.io";
import { ColorSpace } from "colorjs.io/fn";

type Curve = {
    id: string;
    name: string;
    type: "hue" | "saturation" | "lightness";
    values: number[];
};

type Scale = {
    id: string;
    name: string;
    colors: Color[];
    curves: Partial<Record<Curve["type"], string>>;
};

type Palette = {
    id: string;
    name: string;
    backgroundColor: string;
    scales: Record<string, Scale>;
    curves: Record<string, Curve>;
};

export { Color, ColorSpace };
export type { Curve, Scale, Palette };
