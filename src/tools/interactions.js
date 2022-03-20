import {Modify, Draw, Snap, Select} from 'ol/interaction';

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

export const createSelect = (withStyles = true) => {
    return new Select({
        style: withStyles ? undefined : null,
        hitTolerance: 5
    });
}