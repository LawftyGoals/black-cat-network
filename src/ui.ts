import type { Entity } from "./Entity";
import type { Happening, TK } from "./Happening";
import { gameInitialState, type TScreens } from "./state/game-state";
import { cE, clearChildren, clearSelecteds, getRandomInt } from "./utils";
import type { HappeningCard } from "./components/happening-card";
import {
  closeDialogElement,
  dialogContentElement,
  dialogElement,
  gEiD,
} from "./get-elements";
import type { CreatureCard } from "./components/creature-card";
import { acceptbonding } from "./systems/bonding-system";
import type { NotificationCard } from "./components/notification-card";

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

function createNotificationComponent(notification: Happening) {
  const comp = cE("notification-card") as NotificationCard;
  comp.setAttribute("title", notification.title);
  comp.setAttribute("ongoing", notification.ongoing.toString());
  comp.setAttribute("agent", `From: ${notification.agent!.name}`);
  comp.setClickable(() => {
    const hapCom = cE("happening-card");
    const restKnowns = notification.knowns.filter(
      (known) =>
        typeof notification[known as TK] === "string" ||
        typeof notification[known as TK] === "number"
    );

    restKnowns.forEach((known) => {
      hapCom.setAttribute(
        known.toLowerCase(),
        notification[known as TK] as string
      );
    });

    hapCom.setAttribute("from", notification.agent!.name);

    clearChildren(dialogContentElement);
    dialogContentElement.appendChild(hapCom);
    dialogElement.showModal();
    notification.ongoing = false;
    updateElementWithList("notifications", gameState.notifications);
  });

  return comp;
}

function createHappeningComponent(happening: Happening) {
  const { knowns, requestVariant, bondCat, bondRequirements } = {
    ...happening,
  };
  let Variant = happening.variant;
  const comp = cE("happening-card") as HappeningCard;

  if (happening.variant === "bonding") {
    if (!happening.ongoing) {
      comp.setDivClick(() => {
        updateElementWithList("dialog-content", gameState.catInventory);
        dialogElement.showModal();

        gameState.selectedBonding = happening;
      });

      if (bondCat) {
        comp.setAttribute("cat", bondCat.name);
        comp.setAttribute("clear", "block");
        comp.setClearCat(() => {
          happening.bondCat &&
            gameState.catInventory.set(happening.bondCat.id, happening.bondCat);
          happening.bondCat = null;
          updateElementWithList("screen");
        });
        comp.setSendBonding(() => {
          acceptbonding(happening);
          updateElementWithList("screen");
        });
      }
    } else {
      Variant = "active-bonding";

      bondCat && comp.setAttribute("cat", bondCat.name);
    }
    comp.setAttribute(
      "content",
      `Needs to be: ${bondRequirements!.join(", ")}. `
    );
  }

  const end = {
    ...happening,
    Variant,
    requestVariant,
    knowns,
    bondCat,
    bondRequirements,
    From: happening.agent?.name,
  };
  knowns.forEach((val) => {
    comp.setAttribute(val.toLocaleLowerCase(), end[val as TK] as string);
  });

  return comp;
}

export function updateElementWithList(
  name: "screen" | "dialog-content" | "notifications",
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
            break;
        }
      });
      break;
    case "notifications":
      const active = (Array.from(target.values()) as Happening[]).filter(
        (noti) => noti.ongoing
      );
      const inActive = (Array.from(target.values()) as Happening[]).filter(
        (noti) => !noti.ongoing
      );
      active.forEach((notification) => {
        element.appendChild(
          createNotificationComponent(notification as Happening)
        );
      });
      inActive.reverse().forEach((notification) => {
        element.appendChild(
          createNotificationComponent(notification as Happening)
        );
      });
      break;
    case "dialog-content":
      target.forEach((entity) => {
        !(entity as Entity).inBonding &&
          element.appendChild(
            createCreatureComponent(entity as Entity, () => {
              const selectedBonding = gameState.selectedBonding!;
              dialogElement.close();
              const catField = selectedBonding.bondCat;
              catField && (catField.inBonding = false);
              selectedBonding.bondCat = entity as Entity;
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
