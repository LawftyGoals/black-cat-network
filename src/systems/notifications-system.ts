import type { Entity } from "../Entity";
import { Happening, type TK } from "../Happening";
import { gameInitialState } from "../state/game-state";
import { updateElementWithList } from "../ui";
import { getRandomExistingWitch, getRandomizedId } from "../utils";
const gameState = gameInitialState;

export function generateRandomNotificaiton() {
  const id = getRandomizedId();

  const notification = new Happening(
    id,
    true,
    null,
    null,
    undefined,
    "notification",
    getRandomExistingWitch(),
    "look here!",
    "while you were on the loo something happened!",
    null,
    null,
    null
  );

  gameState.happenings.set(id, notification);
  gameState.notifications.set(id, notification);

  return notification;
}

export function createNotification(
  title: string,
  content: string,
  knowns: string[],
  from: Entity,
  reward: number
) {
  const id = getRandomizedId();
  const notification = new Happening(
    id,
    true,
    null,
    null,
    knowns,
    "notification",
    from,
    title,
    content,
    reward,
    null,
    null
  );

  gameState.happenings.set(id, notification);
  gameState.notifications.set(id, notification);

  updateElementWithList("notifications", gameState.notifications);
}
