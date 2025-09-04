import { getNewKnown, type Entity } from "./Entity";
import type { Happening, TK } from "./Happening";
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
import { acceptbonding } from "./systems/bonding-system";
import type { NotificationCard } from "./components/notification-card";
import { changeRemainingTime } from "./systems/time-system";
import { createNotification } from "./systems/notifications-system";

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
  const { name, age, knowns, knownTraits } = { ...entity };
  knowns.forEach((value) => {
    comp.setAttribute(value, { ...entity }[value] as string);
  });

  const allKnowns = [
    ...knowns.map(
      (k) => ({ ...entity, name: undefined, age: `${age} years` }[k])
    ),
    ...knownTraits,
  ].filter((tk) => tk);
  comp.setAttribute(
    "description",
    `What you know about ${name}: ${allKnowns.join(", ")}`
  );

  const isCat = entity.type === "cat";
  if (isCat && !onClick) {
    comp.setAttribute("showcatslot", "true");
    comp.setInteractClick(() => {
      changeRemainingTime();

      const newKnown = getNewKnown(entity);

      newKnown
        ? createNotification(
            "You learnt something new!",
            `You managed to learn that ${entity.name} is ${newKnown}`,
            [],
            entity,
            0
          )
        : createNotification(
            "You learnt nothing new...",
            `There doesn't seem to be anything left to learn about ${entity.name}.`,
            [],
            entity,
            0
          );

      updateElementWithList("screen");
    });
  }
  comp.setAttribute("image", `./src/img/${isCat ? "cat" : "witch"}.jpg`);

  comp.setDivClick(onClick);

  return comp;
}

function createNotificationComponent(notification: Happening) {
  const comp = cE("notification-card") as NotificationCard;
  comp.setAttribute("title", notification.Title);
  comp.setAttribute("active", notification.Active.toString());
  comp.setAttribute("from", `From: ${notification.From!.name}`);
  comp.setClickable(() => {
    const hapCom = cE("happening-card");
    const restKnowns = notification.Knowns.filter(
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

    hapCom.setAttribute("from", notification.From!.name);

    clearChildren(dialogContentElement);
    dialogContentElement.appendChild(hapCom);
    dialogElement.showModal();
    notification.Active = false;
    updateElementWithList("notifications", gameState.notifications);
  });

  return comp;
}

function createHappeningComponent(happening: Happening) {
  const { Knowns, Request_Variant, Cat, Requirements } = { ...happening };
  let Variant = happening.Variant;
  const comp = cE("happening-card") as HappeningCard;

  if (happening.Variant === "bonding") {
    if (!happening.Active) {
      comp.setDivClick(() => {
        updateElementWithList("dialog-content", gameState.catInventory);
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
  name: "screen" | "dialog-content" | "notifications",
  map?: Map<string, Entity | Happening>
) {
  const element = gEiD(name);
  const target = map ?? gameState[gameState.currentScreen];
  clearChildren(element);
  switch (name) {
    case "screen":
      changeScreens(element, target);
      break;
    case "notifications":
      const active = (Array.from(target.values()) as Happening[]).filter(
        (noti) => noti.Active
      );
      const inActive = (Array.from(target.values()) as Happening[]).filter(
        (noti) => !noti.Active
      );
      active.reverse().forEach((notification) => {
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
  gEiD("gp").textContent = `Gold: ${gameState.gp}`;
}

function changeScreens(
  element: HTMLElement,
  target: Map<string, Entity | Happening>
) {
  target.forEach((entityOrHappening, _id) => {
    switch (gameState.currentScreen) {
      case "catInventory":
      case "knownWitches":
        element.appendChild(
          createCreatureComponent(entityOrHappening as Entity)
        );
        break;
      case "news":
      case "bondings":
        element.appendChild(
          createHappeningComponent(entityOrHappening as Happening)
        );
        break;
      case "catAcquisition":
        break;
    }
  });
}
