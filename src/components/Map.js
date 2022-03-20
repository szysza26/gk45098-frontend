import React, { useState, useEffect, useRef } from "react"
import { makeStyles } from '@material-ui/core/styles';
import olMap from 'ol/Map';
import olView from 'ol/View';
import * as proj from 'ol/proj';
import 'ol/ol.css';
import { createTileLayer, createVectorLayer } from '../tools/layers';
import { createOSM, createVectorSourceFromData, createVectorSourceFromUrl } from '../tools/sources';
import { createStyles } from '../tools/styles';
import { createModify, createDraw, createSnap, createSelect } from "../tools/interactions";
import { Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';

const useStyles = makeStyles({
    map: {
        width: '100%',
        height: '100%',
    },
});

const Map = React.memo(({action, setFeatureInfo, layer, requestSynchronizeLayer, synchronizeLayer, project, auth, setInfo}) => {
    const classes = useStyles();
    const mapRef = useRef(null);

    const [olLayer, setOlLayer] = useState(null);

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
        setOlLayer(vectorLayer);

        return(() => {
            setOlLayer(null);
            mapRef.current.removeLayer(vectorLayer);
        })

    }, [layer])

    useEffect(() => {
        if(!mapRef?.current || !olLayer || !layer) return;

        switch(action){
            case 'info':
                const infoSelect = createSelect();
                infoSelect.on('select', e => {
                    const feature = e.selected[0];
                    if(feature){
                        setFeatureInfo({
                            properties: feature.getProperties(),
                            setProperties: properties => feature.setProperties(properties),
                            deselect: () => infoSelect.getFeatures().clear()
                        });
                    }else{
                        setFeatureInfo(null);
                    }
                })
                mapRef.current.addInteraction(infoSelect);
                return () => {
                    setFeatureInfo(null);
                    mapRef.current.removeInteraction(infoSelect);
                }
            case 'draw':
                const draw = createDraw(olLayer.getSource(), layer.type);
                const drawSnap = createSnap(olLayer.getSource());
                mapRef.current.addInteraction(draw);
                mapRef.current.addInteraction(drawSnap);
                return () => {
                    mapRef.current.removeInteraction(draw);
                    mapRef.current.removeInteraction(drawSnap);
                };
            case 'edit':
                const modify = createModify(olLayer.getSource());
                const modifySnap = createSnap(olLayer.getSource());
                mapRef.current.addInteraction(modify);
                mapRef.current.addInteraction(modifySnap);
                return () => {
                    mapRef.current.removeInteraction(modify);
                    mapRef.current.removeInteraction(modifySnap);
                };
            case 'delete':
                const deleteSelect = createSelect(false);
                deleteSelect.on('select', e => {
                    const feature = e.selected[0];
                    if(feature) olLayer.getSource().removeFeature(feature);
                })
                mapRef.current.addInteraction(deleteSelect);
                return () => {
                    mapRef.current.removeInteraction(deleteSelect);
                }
            default:
                return;
        }
        
    }, [action, olLayer, setFeatureInfo, layer])

    useEffect(() => {
        if(!mapRef?.current || !requestSynchronizeLayer) return;

        const vectorLayer = mapRef.current.getLayers().array_.filter(l => l instanceof VectorLayer)[0];
        if(!vectorLayer){
            synchronizeLayer(null);
        }else{
            const features = vectorLayer.getSource().getFeatures();
            synchronizeLayer(new GeoJSON().writeFeatures(features, {dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857"}));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestSynchronizeLayer])

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
                layer.setZIndex(projectLayer.zIndex);
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
            const vectorLayer = createVectorLayer(vectorSource, style, projectLayer.zIndex);
            vectorLayer.set('idProjectLayer', projectLayer.id);
            mapRef.current.addLayer(vectorLayer);
        })

    }, [auth, project])

    useEffect(() => {
        if(!mapRef?.current || !setInfo) return;

        const select = createSelect();
        select.on('select', e => {
            const feature = e.selected[0];
            if(feature){
                setInfo({
                    properties: feature.getProperties(),
                    deselect: () => select.getFeatures().clear()
                });
            }else{
                setInfo(null);
            }
        })
        mapRef.current.addInteraction(select);

        return () => {
            setInfo(null);
            mapRef.current.removeInteraction(select);
        }

    }, [setInfo])

    return (
        <div id="map" className={classes.map}></div>
    );
})

export default Map;