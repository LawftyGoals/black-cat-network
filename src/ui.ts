import type { Entity } from "./Entity";
import type { Happening, TK } from "./Happening";
import { gameInitialState, type TScreens } from "./state/game-state";
import { cE, clearChildren, clearSelecteds, getRandomInt } from "./utils";
import type { HappeningCard } from "./components/happening-card";
import { closeDialogElement, dialogElement, gEiD } from "./get-elements";
import type { CreatureCard } from "./components/creature-card";
import { acceptbonding } from "./systems/bonding-system";

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
      updateElementWithList("screen");
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
  const comp = cE("creature-card") as CreatureCard;
  const { name, age, knowns, coreKnowns, knownTraits } = { ...entity };
  coreKnowns.forEach((value) => {
    comp.setAttribute(value, { ...entity }[value] as string);
  });

  const allKnowns = [
    ...knowns.map((k) => ({ ...entity, age: `${age} years` }[k])),
    ...knownTraits,
  ].filter((tk) => tk);
  comp.setAttribute(
    "description",
    `What you know about ${name}: ${allKnowns.join(", ")}`
  );

  const isCat = entity.type === "cat";
  comp.setAttribute("image", `./src/img/${isCat ? "cat" : "witch"}.jpg`);

  comp.setDivClick(onClick);

  return comp;
}

function createHappeningComponent(happening: Happening) {
  const { Knowns, Request_Variant, Cat, Requirements } = { ...happening };
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
          updateElementWithList("screen");
        });
        comp.setSendBonding(() => {
          acceptbonding(happening);
          updateElementWithList("screen");
        });
      }
    } else {
      Variant = "active-bonding";

      Cat && comp.setAttribute("cat", Cat.name);
    }
    comp.setAttribute("content", `Needs to be: ${Requirements!.join(", ")}. `);
  }

  const end = {
    ...happening,
    Variant,
    Request_Variant,
    Knowns,
    Cat,
    Requirements,
    From: happening.From?.name,
  };
  Knowns.forEach((val) => {
    comp.setAttribute(val.toLocaleLowerCase(), end[val as TK] as string);
  });

  return comp;
}

export function updateElementWithList(
  name: "screen" | "dialog" | "notifications",
  map?: Map<string, Entity | Happening>
) {
  const element = gEiD(name);
  const target = map ?? gameState[gameState.currentScreen];
  clearChildren(element);
  switch (name) {
    case "screen":
      target.forEach((entityOrHappening, _id) => {
        switch (gameState.currentScreen) {
          case "catInventory":
          case "knownWitches":
            element.appendChild(
              createCreatureComponent(entityOrHappening as Entity)
            );
            break;
          default:
            element.appendChild(
              createHappeningComponent(entityOrHappening as Happening)
            );
            updateElementWithList("dialog", gameState.catInventory);
        }
      });
      break;

    case "notifications":
      target.forEach((notification) => {
        element.appendChild(
          createHappeningComponent(notification as Happening)
        );
      });
      break;
    default:
      target.forEach((entity) => {
        !(entity as Entity).inBonding &&
          element.appendChild(
            createCreatureComponent(entity as Entity, () => {
              const selectedBonding = gameState.selectedBonding!;
              dialogElement.close();
              const catField = selectedBonding.Cat;
              catField && (catField.inBonding = false);
              selectedBonding.Cat = entity as Entity;
              (entity as Entity).inBonding = true;
              updateElementWithList("screen");
            })
          );
      });
      break;
  }
}

export function updateGp(amount: number) {
  gameState.gp += amount;
  gEiD("gp").textContent = gameState.gp.toString();
}
