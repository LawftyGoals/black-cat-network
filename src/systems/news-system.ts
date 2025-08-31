import { Happening } from "../Happening";
import { createRandomizedWitch } from "../Entity";
import { gameInitialState } from "../state/game-state";
import { getRandomizedId } from "../utils";

const gameState = gameInitialState;

export function createRandomizedNews() {
  const id = getRandomizedId();

  const news = new Happening(
    id,
    false,
    0,
    0,
    undefined,
    "news",
    createRandomizedWitch(),
    "Witch hunt!",
    "Crazy things are happening in the news as the witchhunt begins.",
    null,
    null,
    null
  );

  gameState.happenings.set(id, news);
  gameState.news.set(id, news);

  return news;
}
