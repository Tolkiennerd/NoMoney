export const getElement = (id: string): HTMLElement => {
    return document.getElementById(id);
}

export const getInputElement = (id: string): HTMLInputElement => {
    return getElement(id) as HTMLInputElement;
}

export const setElementStyle = (id: string, attribute: string, value: string): void => {
    const element = getElement(id);
    element.style[attribute] = value;
}

export const getChild = (id: string, child: number): HTMLElement => {
    const element = getElement(id);
    return element.childNodes[child] as HTMLElement;
}

export const getChildInput = (id: string, child: number): HTMLInputElement => {
    return getChild(id, child) as HTMLInputElement;
}

export const focusChildInput = (id: string, child: number): void => {
    const inputElement = getChildInput(id, child);
    inputElement.focus();
}
