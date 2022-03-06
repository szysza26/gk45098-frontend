const rgba = require('color-rgba')

export const colors = {
    white: '#ffffff',
    black: '#000000',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#ff9800',
    error: '#f44336',
}

export const colorToRgba = colorObject => {
    if(!colorObject) return 'rgba(0, 0, 0, 0)';
    console.log(`rgba(${colorObject.r}, ${colorObject.g}, ${colorObject.b}, ${colorObject.a})`)
    return `rgba(${colorObject.r}, ${colorObject.g}, ${colorObject.b}, ${colorObject.a})`;
}

export const rgbaToColor = rgbaText => {
    if(!rgbaText) return {r: 0, g: 0, b: 0, a: 0};
    const arrayColor = rgba(rgbaText);
    console.log({r: arrayColor[0], g: arrayColor[1], b: arrayColor[2], a: arrayColor[3]})
    return {r: arrayColor[0], g: arrayColor[1], b: arrayColor[2], a: arrayColor[3]};
}