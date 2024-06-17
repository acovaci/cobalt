import {
    HueDimension,
    LightnessDimension,
    SaturationDimension,
    ColorDimension,
} from "./dimension";

interface ColorModel {
    name: string;
    dimensions: ColorDimension[];
}

class AbstractColorModel implements ColorModel {
    name: string;
    dimensions: ColorDimension[];

    constructor(name: string, dimensions: ColorDimension[]) {
        this.name = name;
        this.dimensions = dimensions;
    }
}

const HSLModel = new AbstractColorModel("HSL", [
    HueDimension,
    SaturationDimension,
    LightnessDimension,
]);

const HSLuvModel = new AbstractColorModel("HSLuv", [
    HueDimension,
    SaturationDimension,
    LightnessDimension,
]);

export type { ColorModel };
export { HSLModel, HSLuvModel };
