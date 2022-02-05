import {OSM, Vector as VectorSource} from 'ol/source';
import axios from 'axios';
import GeoJSON from 'ol/format/GeoJSON';

export const createOSM = () => {
    return new OSM();
}

export const createVectorSourceFromData = (data) => {
    return new VectorSource({
        features: new GeoJSON().readFeatures(data, {dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857"}),
    });
}

export const createVectorSourceFromUrl = (url, token) => {
    const vectorSource =  new VectorSource({
        loader: (extent, resolution, projection, success, failure) => {
            axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    const data = res.data.data;
                    const features = new GeoJSON().readFeatures(data, {dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857"});
                    vectorSource.addFeatures(features);
                    success();
                }).catch(err => {
                    failure();
                })
        }
    });
    return vectorSource;
}