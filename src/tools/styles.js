import {Style, Circle, Stroke, Fill } from 'ol/style';

export const createDefaultStyles = () => {
    return new Style({
        image: new Circle({
            radius: 5,
            fill: new Fill({
                color: 'rgba(0, 0, 255, 1.0)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
            }),
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
    });
}