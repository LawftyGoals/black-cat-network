// catFactory.ts
import * as EntityModule from './Entity.ts';
// import { Entity, Name, CatVariant, CatAbilities } from './Entity.ts';


// Default values for CatAbilities
const defaultCatAbilities: EntityModule.CatAbilities = {
    type: "CatAbilities",
    reflex: 5,
    balance: 5,
    speed: 5,
    vision: 5,
    hearing: 5,
    smell: 5,
    taste: 5,
    memory: 5,
    intuition: 5,
    magicInsight: 5,
    patience: 5,
    boldness: 5,
    mischief: 5,
    sneaking: 5,
    hiding: 5,
    strength: 5,
    grip: 5,
    endurance: 5,
    magicResistance: 5,
    luck: 5,
  };

  export function createCat(
    id: number,
    name: string,
    variant: string,
    abilities?: Partial<EntityModule.CatAbilities>
  ): EntityModule.Entity {
    const cat = new EntityModule.Entity(id);

    cat.addComponent({ type: "Name", name: name });

    cat.addComponent({ type: "CatVariant", variant });

    const catAbilities: EntityModule.CatAbilities = { ...CatAbilities, ...abilities};
    cat.addComponent(catAbilities);

    // cat.addComponent({});
    return cat;
  }