// testCatFactory.ts

import { createCat } from "./catFactory.ts";

const cat = createCat(
    1,
    "Baby Beliaal",
    "Hexenkatze",
    {
        // reflex: 8,
        // mischief: 11,
        // magicResistance: 8,
    }
);

// Print cat details
console.log(`Cat ID: ${1}`);
console.log(`Name: ${cat.getComponent("Name")?.value}`);
console.log(`Variant: ${cat.getComponent("CatVariant")?.variant}`);

// console.log("Abilities:");
// const abilities = cat.getComponent("CatAbilities");
// if (abilities) {
//   console.log(`- Reflex: ${abilities.reflex}`);
//   console.log(`- Mischief: ${abilities.mischief}`);
//   console.log(`- Magic Resistance: ${abilities.magicResistance}`);
// }