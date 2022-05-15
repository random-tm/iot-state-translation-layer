import fs from "fs";

const loadedLayers = {};
let availableLayers = {};
let layersLoaded = false;

export default async (params) => {
    if(!layersLoaded){
        layersLoaded = true;
        availableLayers = getAvailableLayers('layers');
    }
    for(const layer in availableLayers){
        if(params[layer]){
            const paramVal = params[layer];
            if(!loadedLayers[layer]){
                loadedLayers[layer] = await loadCode('layers', availableLayers[layer]);
            }
            const layerData = loadedLayers[layer].default(paramVal);
            params = {...params, ...layerData};
        }
    }
    return params;
}

const loadCode = async (codePath, name) => {
    const sourceRelativeFilePath = `../${codePath}/${name}`;
    return await import(sourceRelativeFilePath);
}

const getAvailableLayers = (codePath) => {
    const layerMap = {};
    const fileNames = fs.readdirSync(codePath);
    for (const fileName of fileNames) {
        const keyName = fileName.split('.js')[0];
        layerMap[keyName] = fileName;
    }
    return layerMap;
}