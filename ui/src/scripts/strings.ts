export const spaceDashes = (str: string) => str.replace('-', ' ');
export const formatName = (id: string) => {
    return id.charAt(0).toUpperCase() + spaceDashes(id.slice(1));
}