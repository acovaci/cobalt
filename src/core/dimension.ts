type ColorDimensionType = "hue" | "saturation" | "lightness" | "alpha";

interface ColorDimension {
    name: ColorDimensionType;
    limits: [number | null, number | null];
    clamp: (value: number) => number;
}

class AbstractColorDimension implements ColorDimension {
    name: ColorDimensionType;
    limits: [number | null, number | null];

    constructor(
        name: ColorDimensionType,
        limits: [number | null, number | null],
    ) {
        this.name = name;
        this.limits = limits;
    }

    clamp(value: number): number {
        return Math.max(
            this.limits[0] ?? value,
            Math.min(this.limits[1] ?? value, value),
        );
    }
}

const HueDimension = new AbstractColorDimension("hue", [0, 360]);
const SaturationDimension = new AbstractColorDimension("saturation", [0, 1]);
const LightnessDimension = new AbstractColorDimension("lightness", [0, 1]);
const AlphaDimension = new AbstractColorDimension("alpha", [0, 1]);

const colorDimensionByName = (type: ColorDimensionType): ColorDimension => {
    switch (type) {
        case "hue":
            return HueDimension;
        case "saturation":
            return SaturationDimension;
        case "lightness":
            return LightnessDimension;
        case "alpha":
            return AlphaDimension;
    }
};

export type { ColorDimensionType, ColorDimension };

export {
    HueDimension,
    SaturationDimension,
    LightnessDimension,
    AlphaDimension,
    colorDimensionByName,
};
