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
  const { Knowns, Request_Variant, Cat } = happening;
  const comp = cE("happening-card") as HappeningCard;
  const end = {
    ...happening,
    Request_Variant,
    Knowns,
    Cat,
    From: happening.From?.name,
  };
  comp.setAttribute("title", happening.Title);

  Knowns.forEach((val) => {
    comp.setAttribute(val.toLocaleLowerCase(), end[val] as string);
  });

  if (happening.Variant === "bonding") {
    comp.setDivClick(() => {
      dialogElement.showModal();
      gameState.selectedBonding = happening;
    });
  }
  console.log(Cat);

  if (Cat) {
    comp.setAttribute("cat", Cat.name);
  }

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
            gameState.selectedBonding!.Cat = entity as Entity;

            updateElementWithList(gEiD("screen"));
          })
        );
      });
    }
  }
}
