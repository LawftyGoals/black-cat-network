import { Happening } from "../Happening";
import { gameInitialState } from "../state/game-state";
import { getKnownWitches, getRandomInt, getRandomizedId } from "../utils";
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
    [...getKnownWitches().values()][getRandomInt(getKnownWitches().size)],
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
