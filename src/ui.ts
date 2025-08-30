import type { Entity } from "./Entity";
import type { Happening } from "./Happening";
import { gameInitialState, type TScreens } from "./state/game-state";
import { cE, clearChildren, clearSelecteds } from "./utils";
import type { HappeningCard } from "./components/happening-card";
import {
  closeDialogElement,
  dialogContentElement,
  dialogElement,
  gEiD,
} from "./get-elements";
import type { CreatureCard } from "./components/creature-card";

const gameState = gameInitialState;

const menu = gEiD("menu")!;

closeDialogElement.onclick = () => {
  dialogElement.close();
};

const menuChildren = menu.children;
//const [cats, orders, witches, spells, news] = menuChildren;

export function initMenu() {
  (Array.from(menuChildren) as HTMLButtonElement[]).forEach((element) => {
    element.onclick = () => {
      const screenName = element.id.replace("m-", "") as TScreens;
      gameState.currentScreen = screenName;
      updateElementWithList(gEiD("screen"));
      clearSelecteds();
    };
  });
}

const time = gEiD("time")!;

export function updateTimeUI() {
  clearChildren(time);
  for (let i = 0; i < gameState.maxTime; i++) {
    const timePip = cE("div");
    timePip.className = `time ${
      i < gameState.remainingTime ? "remain" : "used"
    }`;
    time?.appendChild(timePip);
  }
}

function createCreatureComponent(entity: Entity, onClick?: () => void) {
  const isCat = entity.type === "cat";
  const comp = cE("creature-card") as CreatureCard;
  const { name, age, knowns, coreKnowns, knownTraits } = { ...entity };
  coreKnowns.forEach((value) => {
    comp.setAttribute(value, { ...entity }[value] as string);
  });
  comp.setAttribute(
    "description",
    `What you know about ${name}: ${knowns
      .map((k) => ({ ...entity, age: `${age} years` }[k]))
      .join(", ")}, ${knownTraits.join(", ")}`
  );

  comp.setAttribute("image", `./src/img/${isCat ? "cat" : "witch"}.jpg`);

  comp.setDivClick(onClick);

  return comp;
}

function createHappeningComponent(happening: Happening) {
  const { Knowns, Request_Variant, Cat } = { ...happening };
  let Variant = happening.Variant;
  const comp = cE("happening-card") as HappeningCard;

  if (happening.Variant === "bonding") {
    if (!happening.Active) {
      comp.setDivClick(() => {
        dialogElement.showModal();
        gameState.selectedBonding = happening;
      });

      if (Cat) {
        comp.setAttribute("cat", Cat.name);
        comp.setAttribute("clear", "block");
        comp.setClearCat(() => {
          happening.Cat &&
            gameState.catInventory.set(happening.Cat.id, happening.Cat);
          happening.Cat = null;
          updateElementWithList(gEiD("screen"));
        });
        comp.setSendBonding(() => {
          happening.Active = true;
          updateElementWithList(gEiD("screen"));
        });
      }
    } else {
      Variant = "active-bonding";

      Cat && comp.setAttribute("cat", Cat.name);
    }
  }

  const end = {
    ...happening,
    Variant,
    Request_Variant,
    Knowns,
    Cat,
    From: happening.From?.name,
  };
  Knowns.forEach((val) => {
    console.log(val, end[val]);
    comp.setAttribute(val.toLocaleLowerCase(), end[val] as string);
  });

  return comp;
}

export function updateElementWithList(
  element: HTMLElement,
  map?: Map<string, Entity | Happening>
) {
  const target = map ?? gameState[gameState.currentScreen];
  clearChildren(element);
  if (target.size > 0) {
    if (element.id === "screen") {
      target.forEach((entity, _id) => {
        switch (gameState.currentScreen) {
          case "catInventory":
          case "knownWitches":
            element.appendChild(createCreatureComponent(entity as Entity));
            break;
          default:
            element.appendChild(createHappeningComponent(entity as Happening));
            updateElementWithList(dialogContentElement, gameState.catInventory);
        }
      });
    } else {
      target.forEach((entity) => {
        element.appendChild(
          createCreatureComponent(entity as Entity, () => {
            dialogElement.close();
            const catField = gameState.selectedBonding!.Cat;
            catField && gameState.catInventory.set(catField.id, catField);
            gameState.selectedBonding!.Cat = entity as Entity;
            gameState.catInventory.delete(entity.id);
            updateElementWithList(gEiD("screen"));
          })
        );
      });
    }
  }
}
