import {OSM, Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

export const createOSM = () => {
    return new OSM();
}

export const createVectorSource = (data) => {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857"}),
    });
}