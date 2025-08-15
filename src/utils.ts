
export const cE = (type: keyof HTMLElementTagNameMap) => document.createElement(type);

export function clearChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.lastChild && element.removeChild(element.lastChild)
    }
}

export function appendChildren(element: HTMLElement, children: HTMLElement[]) {
    children.forEach(child => element.appendChild(child))
}
