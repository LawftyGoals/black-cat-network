import { Act } from "./Act";
import { createRandomizedWitch } from "./Entity";
import { gameInitialState } from "./state/game-state";
import { getRandomizedId } from "./utils";

const gameState = gameInitialState;

export function createRandomizedNews() {
  const id = getRandomizedId();

  const news = new Act(
    id,
    "news",
    createRandomizedWitch(),
    "Witch hunt!",
    "Crazy things are happening in the news as the witchhunt begins.",
    null,
    null,
    null
  );

  gameState.acts.set(id, news);
  gameState.news.set(id, news);

  return news;
}
