
export const cE = (type: keyof HTMLElementTagNameMap) => document.createElement(type);
export const gEiD = (id: string) => document.getElementById(id);

export function clearChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.lastChild && element.removeChild(element.lastChild)
    }
}

export function appendChildren(element: HTMLElement, children: HTMLElement[]) {
    children.forEach(child => element.appendChild(child))
}


export function setupDialog() {
    const dialog = gEiD("dialog") as HTMLDialogElement;
    dialog?.showModal();
    const closeButton = gEiD("close-dialog");
    // closeButton!.onclick = () => dialog.close();
    closeButton!.onclick = () => {
        const dialog = document.getElementById('dialog') as HTMLDialogElement;
        catCard.style.display = 'none';
    }
}


export const getRandomInt = (max: number, min: number = 0) => {
    return Math.floor(Math.random() * (max - min)) + min;
}