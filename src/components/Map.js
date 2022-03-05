import React, { useEffect, useRef } from "react"
import { makeStyles } from '@material-ui/core/styles';
import olMap from 'ol/Map';
import olView from 'ol/View';
import * as proj from 'ol/proj';
import 'ol/ol.css';
import { createTileLayer, createVectorLayer } from '../tools/layers';
import { createOSM, createVectorSourceFromData, createVectorSourceFromUrl } from '../tools/sources';
import { createStyles } from '../tools/styles';
import { createModify, createDraw, createSnap } from "../tools/interactions";
import { Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';

const useStyles = makeStyles({
    map: {
        width: '100%',
        height: '100%',
    },
});

const Map = React.memo(({layer, requestSynchronizeLayer, synchronizeLayer, project, auth}) => {
    const classes = useStyles();
    const mapRef = useRef(null);

    useEffect(() => {
        mapRef.current = new olMap({
            target: "map",
            layers: [createTileLayer(createOSM())],
            view: new olView({
                center: proj.fromLonLat([0, 0]),
                zoom: 0
            })
        })
    }, [])

    useEffect(() => {
        if(!mapRef?.current || !layer) return;

        const style = createStyles();
        const vectorSource = createVectorSourceFromData(layer.data);
        const vectorLayer = createVectorLayer(vectorSource, style);
        mapRef.current.addLayer(vectorLayer);
        
        const modify = createModify(vectorSource);
        mapRef.current.addInteraction(modify);

        const draw = createDraw(vectorSource, layer.type);
        mapRef.current.addInteraction(draw);

        const snap = createSnap(vectorSource);
        mapRef.current.addInteraction(snap);

        return(() => {
            mapRef.current.removeLayer(vectorLayer);
            mapRef.current.removeInteraction(modify);
            mapRef.current.removeInteraction(draw);
            mapRef.current.removeInteraction(snap);
        })

    }, [layer])

    useEffect(() => {
        if(!mapRef?.current || !requestSynchronizeLayer) return;

        const vectorLayer = mapRef.current.getLayers().array_.filter(l => l instanceof VectorLayer)[0];
        if(!vectorLayer){
            synchronizeLayer(null);
        }else{
            const features = vectorLayer.getSource().getFeatures();
            synchronizeLayer(new GeoJSON().writeFeatures(features, {dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857"}));
        }

    }, [requestSynchronizeLayer, synchronizeLayer])

    useEffect(() => {
        if(!auth?.token || !mapRef?.current || !project) return;

        const prevLayers = mapRef.current.getLayers().array_.filter(layer => layer instanceof VectorLayer);
        const prevLayersId = prevLayers.map(layer => layer.get('idProjectLayer'));
        const currentLayersId = project.layers.map(projectLayer => projectLayer.id);

        prevLayers.forEach(layer => {
            if(currentLayersId.includes(layer.get('idProjectLayer'))){
                const projectLayer = project.layers.filter(projectLayer => projectLayer.id === layer.get('idProjectLayer'))[0];
                const style = createStyles(
                    projectLayer.style.pointColor,
                    projectLayer.style.strokeColor,
                    projectLayer.style.fillColor,
                    projectLayer.style.pointSize,
                    projectLayer.style.strokeWidth
                );
                layer.setStyle(style);
            }else {
                mapRef.current.removeLayer(layer);
            }
        })

        project.layers.forEach(projectLayer => {
            if(prevLayersId.includes(projectLayer.id)) return;
            const style = createStyles(
                projectLayer.style.pointColor,
                projectLayer.style.strokeColor,
                projectLayer.style.fillColor,
                projectLayer.style.pointSize,
                projectLayer.style.strokeWidth
            );
            const vectorSource = createVectorSourceFromUrl(`http://localhost:8080/api/layers/${projectLayer.layerId}`, auth.token);
            const vectorLayer = createVectorLayer(vectorSource, style);
            vectorLayer.set('idProjectLayer', projectLayer.id);
            mapRef.current.addLayer(vectorLayer);
        })

    }, [auth, project])

    return (
        <div id="map" className={classes.map}></div>
    );
})

export default Map;