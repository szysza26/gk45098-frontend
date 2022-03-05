import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

export const createTileLayer = (source) => {
    return new TileLayer({
        source: source
    })
}

export const createVectorLayer = (source, style, zIndex) => {
    return new VectorLayer({
        source: source,
        style: style,
        zIndex: zIndex,
    });
}