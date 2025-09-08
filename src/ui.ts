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
import { getCatFromTrap } from "./systems/acquisition-system";

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
  comp.setAttribute("active", notification.active.toString());
  comp.setAttribute("from", `From: ${notification.from!.name}`);
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

    hapCom.setAttribute("from", notification.from!.name);

    clearChildren(dialogContentElement);
    dialogContentElement.appendChild(hapCom);
    dialogElement.showModal();
    notification.active = false;
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
    if (notification.active) {
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
}

function createCatAcquisitionScreen() {
  const comp = cE("cat-acquisition") as CatAcquisition;
  console.log(arrayFromMap("catCatcher"));
  comp.setCCBtn(
    createCreatureCards(arrayFromMap("catCatcher"), coreCatcherGivens)
  );
  comp.setCGBtn(createTrapCards(gameState.traps));

  return [comp];
}

function createHappeningCards(happenings: Happening[]) {
  const cards = happenings.map((happening) => {
    return createHappeningCardTest(happening);
  });

  return cards;
}

function createHappeningCardTest(happening: Happening) {
  const comp = cE("happening-card") as HappeningCard;

  const { knowns, from, variant } = { ...happening };

  [...happeningKnowns, ...knowns].forEach((known) => {
    happening[known as TK] &&
      comp.setAttribute(known, happening[known as TK] as string);
  });

  from && comp.setAttribute("from", `${from.name}`);

  variant === "bonding" && addBondingElements(happening, comp);

  return comp;
}

function addBondingElements(happening: Happening, comp: HappeningCard) {
  const { content, requirements, cat } = { ...happening };

  content &&
    comp.setAttribute("content", ` Needs to be: ${requirements!.join(", ")}`);

  if (cat) comp.setAttribute("cat", cat.name);
  if (!happening.active) {
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
      selectCard,
      release
    );
  });
  return cards;
}

function createTrapCards(traps: Map<string, Entity | null>) {
  const cards: CreatureCard[] = [];
  traps.forEach((cat, key) => {
    if (cat) {
      cards.push(
        createCreatureCard(cat.name, cat.type, coreTrapGivens, cat, (_cat) => {
          getCatFromTrap(key);
          updateScreenElement();
        })
      );
    }
  });
  return cards;
}

function createCreatureCard(
  name: string,
  type: string,
  givens: string[],
  entity: Entity,
  interactClick?: (entity: Entity) => void,
  selectCard?: (entity: Entity) => void,
  release?: (entity: Entity) => void
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
    comp.setInteractClick(() => interactClick(entity));
  }
  if (selectCard) {
    comp.setDivClick(() => selectCard(entity));
  }

  if (release) comp.setReleaseButton(() => release(entity));

  return comp;
}

function catInteract(entity: Entity) {
  changeRemainingTime();

  const newKnown = getNewKnown(entity);

  newKnown
    ? createNotification(
        "You learnt something new!",
        `You managed to learn that ${entity.name} is ${newKnown}`,
        [],
        entity,
        null
      )
    : createNotification(
        "You learnt nothing new...",
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
