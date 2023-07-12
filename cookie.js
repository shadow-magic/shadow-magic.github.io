// Save the drawn layer and additional values in a cookie
function saveCookie(countdown, layer, map) {
    const geoJSON = layer.toGeoJSON();
    const futureTime = dateIn(countdown);
    const data = {
        layer: geoJSON,
        map: map
    };
    Cookies.set(futureTime, JSON.stringify(data));
}
// Load the drawn layer and additional values from a cookie
function getCookie(cookieData) {
    let layerData;
    let geojsonLayer;
    let arrayOfArrays = [];
    for (let key in cookieData) {
        layerData = JSON.parse(Cookies.get(key));
        geojsonLayer = L.geoJson(layerData.layer);
        const currentMap = layerData.map;
        let array = [geojsonLayer, currentMap, key];
        arrayOfArrays.push(array);
    }
    return arrayOfArrays;
}
//get and retrieve countdown
function dateIn(hours) {
    let time = new Date();
    //const futureTime = new Date(currentTime + hours * 60 * 60 * 1000);
    time.setHours(time.getHours() + hours);
    const dateString = time.toISOString();
    return dateString;
}
