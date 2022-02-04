import {Modify, Draw, Snap} from 'ol/interaction';

export const createModify = (source) => {
    return new Modify({
        source: source
    });
}

export const createDraw = (source, type) => {
    return new Draw({
        source: source,
        type: type
    });
}

export const createSnap = (source) => {
    return new Snap({
        source: source
    });
}