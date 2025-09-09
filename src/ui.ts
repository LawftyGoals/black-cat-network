import {
  coreCatcherGivens,
  coreEntityGivens,
  coreTrapGivens,
  getNewKnown,
  type Entity,
} from "./Entity";
import { happeningKnowns, type Happening, type TK } from "./Happening";
import { gameInitialState } from "./state/game-state";
import { arrayFromMap, cE, clearChildren, replaceChildren } from "./utils";
import type { HappeningCard } from "./components/happening-card";
import {
  closeDialogElement,
  dialogContentElement,
  dialogElement,
  gEiD,
  screen,
} from "./get-elements";
import type { CreatureCard } from "./components/creature-card";
import { acceptbonding } from "./systems/bonding-system";
import type { NotificationCard } from "./components/notification-card";
import { changeRemainingTime } from "./systems/time-system";
import { createNotification } from "./systems/notifications-system";
import type { CatAcquisition } from "./components/cat-acquisition";
import { generateTraps, getCatFromTrap } from "./systems/acquisition-system";
import { itemValues } from "./Values";
import { textResource } from "./text/textResource";

const gameState = gameInitialState;

const menu = gEiD("menu")!;

closeDialogElement.onclick = () => {
  dialogElement.close();
};

const menuChildren = menu.children;

export function initMenu() {
  const [catInventory, bondings, knownWitches, _spells, news, catAcquisition] =
    Array.from(menuChildren) as HTMLButtonElement[];

  catInventory.onclick = () => {
    gameState.currentScreen = "catInventory";
    updateScreenElement();
  };

  knownWitches.onclick = () => {
    gameState.currentScreen = "knownWitches";
    updateScreenElement();
  };

  bondings.onclick = () => {
    gameState.currentScreen = "bondings";
    updateScreenElement();
  };

  news.onclick = () => {
    gameState.currentScreen = "news";
    updateScreenElement();
  };

  catAcquisition.onclick = () => {
    gameState.currentScreen = "catAcquisition";
    updateScreenElement();
  };
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

function createNotificationComponent(notification: Happening) {
  const comp = cE("notification-card") as NotificationCard;
  comp.setAttribute("title", notification.title);
  comp.setAttribute("ongoing", notification.ongoing.toString());
  comp.setAttribute("agent", `From: ${notification.agent!.name}`);
  comp.setAttribute("title", notification.title);
  comp.setAttribute("active", notification.ongoing.toString());
  comp.setAttribute("agent", `From: ${notification.agent!.name}`);
  comp.setClickable(() => {
    const hapCom = cE("happening-card");
    const restKnowns = happeningKnowns.filter((known) => {
      return (
        typeof notification[known as TK] === "string" ||
        typeof notification[known as TK] === "number"
      );
    });

    restKnowns.forEach((known) => {
      hapCom.setAttribute(
        known.toLowerCase(),
        notification[known as TK] as string
      );
    });

    hapCom.setAttribute("agent", notification.agent!.name);

    clearChildren(dialogContentElement);
    dialogContentElement.appendChild(hapCom);
    dialogElement.showModal();
    notification.ongoing = false;
    updateNotifications();
  });

  return comp;
}

export function updateGp(amount: number) {
  gameState.gp += amount;
  gEiD("gp").textContent = `Gold: ${gameState.gp}`;
}

export function updateNotifications() {
  const notificationsElement = gEiD("notifications");
  const notifications = Array.from(gameState.notifications.values());

  const act: Happening[] = [];
  const inact: Happening[] = [];

  notifications.reverse().forEach((notification) => {
    if (notification.ongoing) {
      act.push(notification);
    } else {
      inact.push(notification);
    }
  });

  const cards = [...act, ...inact].map((notification) => {
    return createNotificationComponent(notification);
  });

  replaceChildren(notificationsElement, cards);
}

export function updateScreenElement() {
  const cS = gameState.currentScreen;

  switch (cS) {
    case "catInventory":
      replaceChildren(
        screen,
        createCreatureCards(
          arrayFromMap(cS),
          coreEntityGivens,
          catInteract,
          undefined,
          undefined,
          catRelease
        )
      );
      break;
    case "knownWitches":
      replaceChildren(
        screen,
        createCreatureCards(arrayFromMap(cS), coreEntityGivens)
      );
      break;
    case "bondings":
      replaceChildren(screen, createHappeningCards(arrayFromMap(cS)));
      break;
    case "news":
      replaceChildren(screen, createHappeningCards(arrayFromMap(cS)));
      break;
    case "catAcquisition":
      replaceChildren(screen, createCatAcquisitionScreen());
      break;
  }

  //UPDATES
  updateCatSpace();
  updateGp(0);
}

function createCatAcquisitionScreen() {
  const comp = cE("cat-acquisition") as CatAcquisition;
  comp.setCatcherBtn(() => {
    gameState.selectedAcqusition = "catCatcher";
    updateScreenElement();
  });
  comp.setTrapsBtn(() => {
    gameState.selectedAcqusition = "traps";
    updateScreenElement();
  });

  switch (gameState.selectedAcqusition) {
    case "traps":
      comp.setAcquisitionType(createTrapCards(gameState.traps));
      break;
    case "catCatcher":
      comp.setAcquisitionType(
        createCreatureCards(
          arrayFromMap("catCatcher"),
          coreCatcherGivens,
          (cat: Entity) => {
            //PURCHASE
            if (cat.value && gameState.gp < cat.value) {
              displayModalMessage(textResource.purchase.noGp);
            } else if (
              gameState.catInventory.size >= gameState.maxCatInventorySize
            ) {
              displayModalMessage(textResource.purchase.noSpace);
            } else {
              gameState.catCatcher.delete(cat.id);
              gameState.catInventory.set(cat.id, cat);
              cat.value && updateGp(-cat.value);
              updateScreenElement();
            }
          },
          "Purchase"
        )
      );
      break;
  }

  return [comp];
}

function createHappeningCards(happenings: Happening[]) {
  const cards = happenings.map((happening) => {
    return createHappeningCard(happening);
  });

  return cards;
}

function createHappeningCard(happening: Happening) {
  const comp = cE("happening-card") as HappeningCard;

  const { knowns, agent, variant } = { ...happening };

  [...happeningKnowns, ...knowns].forEach((known) => {
    happening[known as TK] &&
      comp.setAttribute(known, happening[known as TK] as string);
  });

  agent && comp.setAttribute("agent", `${agent.name}`);

  variant === "bonding" && addBondingElements(happening, comp);

  return comp;
}

function addBondingElements(happening: Happening, comp: HappeningCard) {
  const { content, bondrequirements, cat } = { ...happening };

  content &&
    comp.setAttribute(
      "content",
      ` Needs to be: ${bondrequirements!.join(", ")}`
    );

  if (cat) comp.setAttribute("cat", cat.name);
  if (!happening.ongoing) {
    comp.setAttribute("variant", "bonding");
    comp.setDivClick(() => {
      gameState.selectedBonding = happening;
      replaceChildren(
        gEiD("dialog-content"),
        createCreatureCards(
          (arrayFromMap("catInventory") as Entity[]).filter(
            (cat) => !cat.inbonding
          ),
          coreEntityGivens,
          undefined,
          undefined,
          (entity: Entity) => {
            const selectedBonding = gameState.selectedBonding!;
            const catField = selectedBonding.cat;
            catField && (catField.inbonding = false);
            selectedBonding.cat = entity;
            entity.inbonding = true;
            dialogElement.close();
            updateScreenElement();
          }
        )
      );
      dialogElement.showModal();
    });

    if (cat) {
      comp.setAttribute("clear", "block");
      comp.setClearCat(() => {
        happening.cat &&
          gameState.catInventory.set(happening.cat.id, happening.cat);
        happening.cat = null;
        updateScreenElement();
      });
      comp.setSendBonding(() => {
        acceptbonding(happening);
        updateScreenElement();
      });
    }
  }
}

function createCreatureCards(
  entities: Entity[],
  givens: string[],
  interaction?: (entity: Entity) => void,
  interactionLabel?: string,
  selectCard?: (entity: Entity) => void,
  release?: (entity: Entity) => void
) {
  const cards = entities.map((entity) => {
    const { name, type } = { ...entity };

    return createCreatureCard(
      name,
      type,
      givens,
      entity,
      interaction,
      interactionLabel,
      selectCard,
      release
    );
  });
  return cards;
}

function createTrapCards(traps: Map<string, Entity | null>) {
  const cards: HTMLElement[] = [];
  traps.forEach((cat, key) => {
    if (cat) {
      cards.push(
        createCreatureCard(
          cat.name,
          cat.type,
          coreTrapGivens,
          cat,
          (_cat) => {
            if (gameState.catInventory.size >= gameState.maxCatInventorySize) {
              displayModalMessage(textResource.purchase.noSpace);
            } else {
              getCatFromTrap(key);
              updateScreenElement();
            }
          },
          "Acquire",
          undefined,
          () => {
            traps.delete(key);
            updateScreenElement();
          }
        )
      );
    } else {
      const emptyTrap = cE("pre");
      emptyTrap.textContent = textResource.traps.empty;
      emptyTrap.style =
        "border:2px solid grey;background:AliceBlue;padding:8px;margin:0;";
      cards.push(emptyTrap);
    }
  });
  const purchaseTrap = cE("button");
  purchaseTrap.innerText = textResource.traps.purchaseTrap;
  purchaseTrap.onclick = () => {
    if (gameState.gp < itemValues.trap.value) {
      displayModalMessage(textResource.purchase.noGp);
    } else {
      generateTraps();
      updateGp(-itemValues.trap.value);
      updateScreenElement();
    }
  };
  return [...cards, purchaseTrap];
}

function createCreatureCard(
  name: string,
  type: string,
  givens: string[],
  entity: Entity,
  interactClick?: (entity: Entity) => void,
  interactLabel?: string,
  selectCard?: (entity: Entity) => void,
  release?: (entity: Entity) => void | (() => void)
) {
  const comp = cE("creature-card") as CreatureCard;

  const e = { ...entity };

  givens.forEach((given) =>
    comp.setAttribute(given, e[given as keyof typeof e] as string)
  );

  const knowns = [
    ...entity.knownTraits,
    ...entity.knowns.map((known) => e[known as keyof typeof e]),
  ];

  comp.setAttribute(
    "description",
    `What you know about ${name}: ${knowns.join(", ")}`
  );

  comp.setAttribute("image", `src/img/${type}.jpg`);
  if (type === "cat" && interactClick) {
    comp.setAttribute("showcatslot", "true");
    comp.setInteractClick(() => interactClick(entity), interactLabel);
  }
  if (selectCard) {
    comp.setDivClick(() => selectCard(entity));
  }

  if (release) comp.setReleaseButton(() => release(entity));
  if (entity.relationship) comp.setRelationship(entity);

  return comp;
}

function catInteract(entity: Entity) {
  changeRemainingTime();

  const newKnown = getNewKnown(entity);

  newKnown
    ? createNotification(
        textResource.catInteraction.learn,
        `You managed to learn that ${entity.name} is ${newKnown}`,
        [],
        entity,
        null
      )
    : createNotification(
        textResource.catInteraction.noLearn,
        `There doesn't seem to be anything left to learn about ${entity.name}.`,
        [],
        entity,
        null
      );

  updateScreenElement();
}

function catRelease(entity: Entity) {
  gameState.catInventory.delete(entity.id);
  updateScreenElement();
}

function displayModalMessage(message: string) {
  dialogElement.showModal();
  const messageP = cE("p");
  messageP.textContent = message;
  replaceChildren(dialogContentElement, [messageP]);
}

function updateCatSpace() {
  const space = gEiD("cat-space");
  space.textContent = `${gameState.catInventory.size}/${gameState.maxCatInventorySize}`;
}
