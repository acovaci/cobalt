import { Curve, Scale } from "./types";

import { Color } from "./types";

export const getContrast = (background: Color, foreground: Color): number => {
    return background.contrastAPCA(foreground);
};

export const guard = (min: number, max: number, value: number) =>
    Math.max(min, Math.min(max, value));

export const mix = (left: Color, right: Color, weight: number) => {
    return left.mix(right, weight);
};

export function getColorDimension(
    color: Color,
    dimension: "hue" | "saturation" | "lightness",
) {
    color = new Color(color);
    color = color.to("hsluv");

    switch (dimension) {
        case "hue":
            return color.hsluv.h;
        case "saturation":
            return color.hsluv.s;
        case "lightness":
            return color.hsluv.l;
    }
}

export function hexToColor(hex: string): Color {
    return new Color(hex);
}

export function colorToHex(color: Color): string {
    return `${color.to("srgb").toString({ format: "hex" })}`;
}

export const readableColor = (color: string): Color => {
    const contrastUnderWhite = new Color(color).contrastAPCA(
        new Color("white"),
    );
    const contrastUnderBlack = new Color(color).contrastAPCA(
        new Color("black"),
    );
    return contrastUnderWhite > contrastUnderBlack
        ? new Color("white")
        : new Color("black");
};

export function randomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getColor(
    curves: Record<string, Curve>,
    scale: Scale,
    index: number,
) {
    const color = scale.colors[index];

    const hueCurve = curves[scale.curves.hue ?? ""]?.values ?? [];
    const saturationCurve = curves[scale.curves.saturation ?? ""]?.values ?? [];
    const lightnessCurve = curves[scale.curves.lightness ?? ""]?.values ?? [];

    const hue = getColorDimension(color, "hue") + (hueCurve[index] ?? 0);
    const saturation =
        getColorDimension(color, "saturation") + (saturationCurve[index] ?? 0);
    const lightness =
        getColorDimension(color, "lightness") + (lightnessCurve[index] ?? 0);

    return new Color("hsluv", [hue, saturation, lightness], 1);
}

export function getRange(type: Curve["type"]) {
    const ranges = {
        hue: { min: 0, max: 360 },
        saturation: { min: 0, max: 100 },
        lightness: { min: 0, max: 100 },
    };
    return ranges[type];
}

export function getContrastScore(contrast: number) {
    return contrast < 3
        ? "Fail"
        : contrast < 4.5
          ? "AA+"
          : contrast < 7
            ? "AA"
            : "AAA";
}

export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}
