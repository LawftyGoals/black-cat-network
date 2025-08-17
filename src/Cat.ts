export class Cat {
    mName: string
    mType: typeof enumCatVariant[TCatVariantNames]
    constructor(name: string, type: TenumCatVariants) {
        this.mName = name;
        this.mType = type;
    }
}


export const enumCatVariant = Object.freeze({
    BLACK: 0,
    TABBY: 1,
    PERSIAN: 2,
    SIAMESE: 3,
    NAKED: 4
})

export type TCatVariantNames = keyof typeof enumCatVariant;
export type TenumCatVariants = typeof enumCatVariant[TCatVariantNames];

export const variantMapping = {
    "0": "Black",
    "1": "Tabby",
    "2": "Persian",
    "3": "Siamese",
    "4": "Naked"
}
