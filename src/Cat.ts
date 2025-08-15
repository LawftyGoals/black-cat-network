export class Cat {

    mName: string
    mType: typeof eCatType[TCatTypes]
    constructor(name: string, type: TeCatTypes) {
        this.mName = name;
        this.mType = type;
    }
}


const eCatType = Object.freeze({
    BLACK: 1,
    TABBY: 2,
    PERSIAN: 3,
    SIAMESE: 4,
    NAKED: 5
})

type TCatTypes = keyof typeof eCatType;
type TeCatTypes = typeof eCatType[TCatTypes];