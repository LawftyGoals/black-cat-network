import type { Entity } from "../Entity";
import { Happening } from "../Happening";
import { gameInitialState } from "../state/game-state";
import { updateNotifications } from "../ui";
import { getRandomExistingWitch, getRandomizedId } from "../utils";
import type { TSpells } from "./spell-system";
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
    reward: number | null,
    spell: TSpells | null
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
        spell,
        null,
        null
    );

    gameState.happenings.set(id, notification);
    gameState.notifications.set(id, notification);

    updateNotifications();
}
