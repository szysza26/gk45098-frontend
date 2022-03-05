import {Style, Circle, Stroke, Fill } from 'ol/style';

export const createStyles = (
    pointColor = 'rgba(0, 0, 255, 1.0)', 
    strokeColor = 'rgba(0, 0, 255, 1.0)', 
    fillColor = 'rgba(255, 255, 255, 0.2)', 
    pointSize = 5, 
    strokeWidth = 2
) => {
    return new Style({
        image: new Circle({
            radius: pointSize,
            fill: new Fill({
                color: pointColor,
            }),
            stroke: new Stroke({
                color: pointColor,
            }),
        }),
        stroke: new Stroke({
            width: strokeWidth,
            color: strokeColor,
        }),
        fill: new Fill({
            color: fillColor,
        }),
    });
}