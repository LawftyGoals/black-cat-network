import type { Entity } from "../Entity";
import { Happening } from "../Happening";
import { gameInitialState } from "../state/game-state";
import { updateNotifications } from "../ui";
import { getRandomizedId } from "../utils";
import type { TSpells } from "./spell-system";
const gameState = gameInitialState;

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
    );

    gameState.happenings.set(id, notification);
    gameState.notifications.set(id, notification);

    updateNotifications();
}
