export const cE = (
  type: keyof HTMLElementTagNameMap | "act-card" | "creature-card"
) => document.createElement(type);
export const gEiD = (id: string) => document.getElementById(id);

export function clearChildren(element: HTMLElement) {
  while (element.firstChild) {
    element.lastChild && element.removeChild(element.lastChild);
  }
}

export function appendChildren(element: HTMLElement, children: HTMLElement[]) {
  children.forEach((child) => element.appendChild(child));
}

export function setupDialog() {
  const dialog = gEiD("dialog") as HTMLDialogElement;
  dialog?.showModal();
  const closeButton = gEiD("close-dialog");
  closeButton!.onclick = () => dialog.close();
}

export const getRandomInt = (max: number, min: number = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomizedId = () =>
  (
    Math.floor(Math.random() * 10000) *
    performance.now() *
    performance.now()
  ).toString();

export function sgeid(sr: ShadowRoot, name: string) {
  return sr.getElementById(name);
}
